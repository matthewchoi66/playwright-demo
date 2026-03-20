# Playwright Automation Demo

A end-to-end test automation project built with [Playwright](https://playwright.dev/) and TypeScript, demonstrating real-world QA engineering patterns.

## Features

- **Page Object Model** — locators and actions encapsulated in reusable page classes
- **Custom Fixtures** — shared setup via Playwright's fixture system, keeping tests clean and DRY
- **Cross-browser testing** — Chromium and WebKit (Safari) out of the box
- **CI/CD integration** — GitHub Actions runs the full suite on every push and PR, with HTML reports published as artifacts

## Project Structure

```
tests/
├── pages/
│   └── TodoPage.ts       # Page Object — all locators and actions for the Todo app
├── fixtures.ts           # Custom Playwright fixture (auto-navigates before each test)
├── todo.spec.ts          # Main test suite using the Page Object Model
└── example.spec.ts       # Basic Playwright smoke tests

tests-examples/
└── demo-todo-app.spec.ts # Reference suite (flat style, no POM)

playwright.config.ts      # Browser projects, headless mode, CI config
.github/workflows/
└── playwright.yml        # CI pipeline with artifact upload
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps
```

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser UI visible
HEADED=1 npm test

# Open the interactive Playwright UI
npm run test:ui

# Debug a specific test
npm run test:debug

# View the last HTML report
npm run test:report
```

## Test Suite Overview

The main suite (`tests/todo.spec.ts`) covers the [TodoMVC](https://demo.playwright.dev/todomvc) app across 5 areas:

| Group | Tests |
|---|---|
| Adding todos | Add single/multiple items, clear input on submit |
| Completing todos | Complete, complete all, unmark complete |
| Editing todos | Save edits inline |
| Filtering todos | Active / Completed / All views |
| Clearing completed | Remove completed items, hide button when empty |

## Key Patterns

### Page Object Model

All selectors and interactions are defined once in `TodoPage.ts`:

```ts
await todoPage.addTodos(...TODO_ITEMS);
await todoPage.completeTodo(0);
await todoPage.filterActive();
```

### Custom Fixtures

The `todoPage` fixture handles navigation automatically — no `beforeEach` boilerplate in tests:

```ts
export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});
```

## CI/CD

Tests run automatically on every push and pull request via GitHub Actions. The full HTML report (including traces for failed tests) is uploaded as a workflow artifact and retained for 30 days.
