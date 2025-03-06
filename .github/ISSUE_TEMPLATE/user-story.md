---
name: User Story
about: Create a new feature request.
title: ''
labels: ''
assignees: dappysandhu

---

name: "User Story"
description: "Create a new feature request following Agile user story format."
labels: ["feature", "enhancement"]
body:
  - type: markdown
    attributes:
      value: "### 🏆 User Story"
  - type: textarea
    id: user-story
    attributes:
      label: "User Story"
      description: "As a [user role], I want to [desired action], so that [benefit]."
      placeholder: "As a..., I want to..., So that..."
    validations:
      required: true
  - type: markdown
    attributes:
      value: "### ✅ Acceptance Criteria"
  - type: textarea
    id: acceptance-criteria
    attributes:
      label: "Acceptance Criteria"
      description: "List the criteria that must be met for this story to be considered complete."
      placeholder: "- [ ] Criteria 1\n- [ ] Criteria 2\n- [ ] Criteria 3"
  - type: markdown
    attributes:
      value: "### 📌 Tasks"
  - type: textarea
    id: tasks
    attributes:
      label: "Tasks"
      description: "List specific development tasks to complete this story."
      placeholder: "- [ ] Task 1\n- [ ] Task 2"
  - type: markdown
    attributes:
      value: "### 📂 Related Issues / PRs"
  - type: input
    id: related-issues
    attributes:
      label: "Related Issues / Pull Requests"
      description: "Link any related issues or pull requests."
      placeholder: "#123"
  - type: markdown
    attributes:
      value: "### 🏷 Labels"
  - type: dropdown
    id: priority
    attributes:
      label: "Priority"
      options:
        - "High"
        - "Medium"
        - "Low"
    validations:
      required: true
