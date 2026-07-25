import test from "node:test";
import assert from "node:assert/strict";
import { mockProjects, mockStudents } from "../lib/data/mock-data";

test("Mock Data - Unique IDs for students and projects", () => {
  const studentIds = mockStudents.map((s) => s.id);
  const projectIds = mockProjects.map((p) => p.id);

  assert.equal(new Set(studentIds).size, studentIds.length, "Student IDs must be unique");
  assert.equal(new Set(projectIds).size, projectIds.length, "Project IDs must be unique");
});

test("Mock Data - Projects must have team members referencing valid student IDs", () => {
  const validStudentIds = new Set(mockStudents.map((s) => s.id));

  for (const project of mockProjects) {
    assert.ok(project.team.length > 0, `Project ${project.id} must have at least 1 team member`);
    for (const member of project.team) {
      assert.ok(
        validStudentIds.has(member.studentId),
        `Project ${project.id} references invalid student ID ${member.studentId}`
      );
      assert.ok(member.role.length > 0, `Team member in ${project.id} must have a non-empty role`);
    }
  }
});

test("Mock Data - Projects must have non-empty tech stack array and valid category", () => {
  const validCategories = [
    "Web Application",
    "Mobile Application",
    "UI/UX Design",
    "Digital Products & Templates",
  ];

  for (const project of mockProjects) {
    assert.ok(validCategories.includes(project.category), `Project ${project.id} has invalid category`);
    assert.ok(project.techStack.length > 0, `Project ${project.id} must have tech stack tags`);
  }
});
