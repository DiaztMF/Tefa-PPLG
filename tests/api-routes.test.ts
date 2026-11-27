import assert from "node:assert/strict"
import { mock, test } from "node:test"
import { NextRequest } from "next/server"

let databaseConfigured = true
let session: { user: { id: string; role: string; email: string } } | null = null
const insertedValues: Record<string, unknown>[] = []

const getSession = mock.fn(async () => session)

const insertResult = {
  onConflictDoNothing: async () => {},
  returning: async () => [{ id: "std-created" }],
}

mock.module("@/lib/auth", {
  namedExports: {
    auth: { api: { getSession } },
  },
})

mock.module("@/lib/db", {
  namedExports: {
    db: {
      insert: () => ({
        values: (value: Record<string, unknown>) => {
          insertedValues.push(value)
          return insertResult
        },
      }),
    },
    isDatabaseConfigured: () => databaseConfigured,
  },
})

let studentProfile: { id: string } | null = { id: "std-01" }
mock.module("@/lib/db/queries", {
  namedExports: {
    getProjects: async () => [],
    getStudents: async () => [],
    getStudentByUser: async () => studentProfile,
  },
})
const rateLimitCounts = new Map<string, number>()
mock.module("@/lib/rate-limit", {
  namedExports: {
    isRateLimited: async (key: string) => {
      const count = (rateLimitCounts.get(key) ?? 0) + 1
      rateLimitCounts.set(key, count)
      return count > 5
    },
  },
})

const { POST: postProject } = await import("../app/api/projects/route")
const { POST: postStudent } = await import("../app/api/students/route")

function projectRequest(ip: string, body: unknown = {}) {
  return new NextRequest("http://localhost/api/projects", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  })
}

function studentRequest(body: unknown) {
  return new NextRequest("http://localhost/api/students", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "198.51.100.9",
    },
    body: JSON.stringify(body),
  })
}

function setSession(role: string | null) {
  session = role
    ? { user: { id: `${role}-1`, role, email: `${role}@example.test` } }
    : null
}

test("projects POST returns 503 before touching auth when DB is unconfigured", async () => {
  databaseConfigured = false
  setSession(null)
  getSession.mock.resetCalls()

  const response = await postProject(
    projectRequest("192.0.2.1", { title: "x", description: "y", category: "z" })
  )

  assert.equal(response.status, 503)
  assert.equal(getSession.mock.calls.length, 0)
})

test("projects POST rejects unauthenticated calls before validation and rate limiting", async () => {
  databaseConfigured = true
  setSession(null)
  getSession.mock.resetCalls()
  insertedValues.length = 0

  for (let attempt = 0; attempt < 6; attempt++) {
    const response = await postProject(
      projectRequest(`192.0.2.2-${attempt}`, {})
    )
    assert.equal(response.status, 401)
  }

  assert.equal(insertedValues.length, 0)
})

test("projects POST rate limits sixth authenticated attempt per IP", async () => {
  databaseConfigured = true
  setSession("siswa")
  getSession.mock.resetCalls()
  insertedValues.length = 0
  rateLimitCounts.clear()

  const statuses: number[] = []
  for (let attempt = 0; attempt < 6; attempt++) {
    const response = await postProject(
      projectRequest("192.0.2.3", {
        title: "Project",
        description: "Description",
        category: "Web Application",
      })
    )
    statuses.push(response.status)
  }

  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429])
  assert.equal(insertedValues.length, 5)
  assert.equal(insertedValues[0]?.submittedBy, "std-01")
})

test("projects POST links a new student profile when none exists", async () => {
  databaseConfigured = true
  setSession("siswa")
  studentProfile = null
  insertedValues.length = 0
  rateLimitCounts.clear()

  const response = await postProject(
    projectRequest("192.0.2.4", {
      title: "Project",
      description: "Description",
      category: "Web Application",
    })
  )

  assert.equal(response.status, 200)
  const studentInsert = insertedValues.find((value) => "entryYear" in value)
  const projectInsert = insertedValues.find((value) => "submittedBy" in value)
  assert.equal(studentInsert?.userId, "siswa-1")
  assert.equal(projectInsert?.submittedBy, "std-created")
  studentProfile = { id: "std-01" }
})

test("students POST returns 503 when DB is unconfigured", async () => {
  databaseConfigured = false
  setSession("admin")
  insertedValues.length = 0

  const response = await postStudent(
    studentRequest({ name: "Siswa", entryYear: 2026 })
  )

  assert.equal(response.status, 503)
  assert.equal(insertedValues.length, 0)
})

test("students POST stores an empty string when email is omitted", async () => {
  databaseConfigured = true
  setSession("admin")
  insertedValues.length = 0

  const response = await postStudent(
    studentRequest({ name: "Siswa", entryYear: 2026 })
  )

  assert.equal(response.status, 200)
  assert.equal(insertedValues[0]?.email, "")
})

test("students POST rejects missing name", async () => {
  databaseConfigured = true
  setSession("admin")
  insertedValues.length = 0

  const response = await postStudent(studentRequest({ entryYear: 2026 }))

  assert.equal(response.status, 400)
  assert.equal(insertedValues.length, 0)
})
