import { test, expect } from './fixtures';

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
] as const;

test.describe('Visual regression', () => {
  test('empty state', async ({ todoPage }) => {
    await expect(todoPage.page).toHaveScreenshot('empty-state.png');
  });

  test('with todos added', async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await expect(todoPage.page).toHaveScreenshot('todos-added.png');
  });

  test('with a completed todo', async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await todoPage.completeTodo(0);
    await expect(todoPage.page).toHaveScreenshot('todo-completed.png');
  });

  test('all todos completed', async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await todoPage.markAllComplete();
    await expect(todoPage.page).toHaveScreenshot('all-completed.png');
  });

  test('active filter', async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await todoPage.completeTodo(1);
    await todoPage.filterActive();
    await expect(todoPage.page).toHaveScreenshot('filter-active.png');
  });

  test('completed filter', async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await todoPage.completeTodo(1);
    await todoPage.filterCompleted();
    await expect(todoPage.page).toHaveScreenshot('filter-completed.png');
  });
});
