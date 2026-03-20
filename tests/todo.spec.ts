import { test, expect } from './fixtures';

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
] as const;

test.describe('Adding todos', () => {
  test('should add a single todo', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await expect(todoPage.todoItems).toHaveText([TODO_ITEMS[0]]);
    await expect(todoPage.todoCount).toContainText('1');
  });

  test('should add multiple todos to the bottom of the list', async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await expect(todoPage.todoItems).toHaveText(TODO_ITEMS);
    await expect(todoPage.todoCount).toContainText('3');
  });

  test('should clear input after adding a todo', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await expect(todoPage.newTodoInput).toBeEmpty();
  });
});

test.describe('Completing todos', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
  });

  test('should mark a single todo as complete', async ({ todoPage }) => {
    await todoPage.completeTodo(0);
    await expect(todoPage.todoItems.nth(0)).toHaveClass('completed');
    await expect(todoPage.todoItems.nth(1)).not.toHaveClass('completed');
  });

  test('should mark all todos as complete', async ({ todoPage }) => {
    await todoPage.markAllComplete();
    await expect(todoPage.todoItems).toHaveClass(['completed', 'completed', 'completed']);
  });

  test('should unmark a completed todo', async ({ todoPage }) => {
    await todoPage.completeTodo(0);
    await todoPage.uncompleteTodo(0);
    await expect(todoPage.todoItems.nth(0)).not.toHaveClass('completed');
  });
});

test.describe('Editing todos', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
  });

  test('should save an edited todo', async ({ todoPage }) => {
    await todoPage.editTodo(1, 'buy some sausages');
    await expect(todoPage.todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
  });
});

test.describe('Filtering todos', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await todoPage.completeTodo(1);
  });

  test('should show only active items', async ({ todoPage }) => {
    await todoPage.filterActive();
    await expect(todoPage.todoItems).toHaveCount(2);
    await expect(todoPage.todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should show only completed items', async ({ todoPage }) => {
    await todoPage.filterCompleted();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText([TODO_ITEMS[1]]);
  });

  test('should show all items', async ({ todoPage }) => {
    await todoPage.filterActive();
    await todoPage.filterAll();
    await expect(todoPage.todoItems).toHaveCount(3);
  });
});

test.describe('Clearing completed todos', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addTodos(...TODO_ITEMS);
    await todoPage.completeTodo(0);
  });

  test('should remove completed items when cleared', async ({ todoPage }) => {
    await todoPage.clearCompleted();
    await expect(todoPage.todoItems).toHaveCount(2);
    await expect(todoPage.todoItems).toHaveText([TODO_ITEMS[1], TODO_ITEMS[2]]);
  });

  test('should hide the clear button when no completed items remain', async ({ todoPage }) => {
    await todoPage.clearCompleted();
    await expect(todoPage.clearCompletedButton).toBeHidden();
  });
});
