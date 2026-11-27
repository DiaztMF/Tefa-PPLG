import assert from "node:assert/strict"
import { mock, test } from "node:test"
import { NextRequest } from "next/server"

let databaseConfigured = false
const session: { user: { id: string; role: string } } | null = {
  user: { id: "admin-1", role: "admin" },
}
const getSession = mock.fn(async () => session)
const updateCalls: { status: string }[] = []
let updateResult: { id: string }[] = [{ id: "p-1" }]

mock.module("@/lib/auth", {
  namedExports: {
    auth: { api: { getSession } },
  },
})

mock.module("@/lib/db", {
  namedExports: {
    db: {
      update: () => ({
        set: (value: { status: string }) => {
          updateCalls.push({ status: value.status })
          return {
            where: () => ({
              returning: async () => updateResult,
            }),
          }
        },
      }),
    },
    isDatabaseConfigured: () => databaseConfigured,
  },
})

function mockProject(id: string, status?: string) {
  return {
    id,
    title: `Project ${id}`,
    category: "Web Application",
    description: "Description",
    longDescription: "Long description",
    techStack: [],
    team: [],
    createdAt: "2026-01-01",
    ...(status ? { status } : {}),
  }
}

mock.module("@/lib/data/mock-data", {
  namedExports: {
    mockStudents: [],
    mockProjects: [mockProject("p-1"), mockProject("p-2", "pending")],
  },
})

// mock.module must be registered before the modules under test load.
const { getProjects } = await import("../lib/db/queries")
const { PATCH } = await import("../app/api/projects/[id]/route")

function patchRequest(status: string) {
  return new NextRequest("http://localhost/api/projects/p-1", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status }),
  })
}

const context = { params: Promise.resolve({ id: "p-1" }) }

test("getProjects('approved') filters pending mock rows", async () => {
  databaseConfigured = false

  const projects = await getProjects("approved")

  assert.deepEqual(
    projects.map((project) => project.id),
    ["p-1"]
  )
})

test("PATCH rejects invalid status with 400", async () => {
  databaseConfigured = true
  updateCalls.length = 0

  const response = await PATCH(patchRequest("draft"), context)

  assert.equal(response.status, 400)
  assert.equal(updateCalls.length, 0)
})

test("PATCH returns 503 when DB is unconfigured", async () => {
  databaseConfigured = false
  updateCalls.length = 0

  const response = await PATCH(patchRequest("approved"), context)

  assert.equal(response.status, 503)
  assert.equal(updateCalls.length, 0)
})

test("PATCH updates status and returns 200", async () => {
  databaseConfigured = true
  updateCalls.length = 0
  updateResult = [{ id: "p-1" }]

  const response = await PATCH(patchRequest("approved"), context)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.deepEqual(body, { success: true, id: "p-1", status: "approved" })
  assert.deepEqual(updateCalls, [{ status: "approved" }])
})

test("PATCH returns 404 when no project was updated", async () => {
  databaseConfigured = true
  updateCalls.length = 0
  updateResult = []

  const response = await PATCH(patchRequest("rejected"), context)

  assert.equal(response.status, 404)
  assert.deepEqual(updateCalls, [{ status: "rejected" }])
  updateResult = [{ id: "p-1" }]
})
