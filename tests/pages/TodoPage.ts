import { type Page, type Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly toggleAll: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(...items: string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async completeTodo(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async uncompleteTodo(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').uncheck();
  }

  async editTodo(index: number, newText: string) {
    await this.todoItems.nth(index).dblclick();
    const editBox = this.todoItems.nth(index).getByRole('textbox', { name: 'Edit' });
    await editBox.fill(newText);
    await editBox.press('Enter');
  }

  async markAllComplete() {
    await this.toggleAll.check();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  async filterActive() {
    await this.page.getByRole('link', { name: 'Active' }).click();
  }

  async filterCompleted() {
    await this.page.getByRole('link', { name: 'Completed' }).click();
  }

  async filterAll() {
    await this.page.getByRole('link', { name: 'All' }).click();
  }
}
