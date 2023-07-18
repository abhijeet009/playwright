import { test, expect, type Page } from '@playwright/test';
import { TodoList } from '../page-objects/todoList';
import testData from '../testdata/testData.json'
let todoPage : TodoList

test.describe('New Todo', () => {
  test.beforeEach(async ({ page }) => {
    todoPage = new TodoList(page)
    await todoPage.connect(testData.url)
  });
  test('should allow me to add todo items', async ({ page }) => {
    //adding data from testdata json file
    await todoPage.addtodoitem(testData.tododata1)
    await todoPage.addtodoitem(testData.tododata2)
    await todoPage.addtodoitem(testData.rododata3)
    //checking if all items are added
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should clear text input field when an item is added', async ({ page }) => {
   // adding one item
    await todoPage.addtodoitem(testData.tododata1)
    // Check that input is empty.
    await todoPage.checkNumberOfTodosInLocalStorage(1);
  });

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ page }) => {
    await todoPage.addtodoitem(testData.tododata1)
    await todoPage.addtodoitem(testData.tododata2)
    await todoPage.addtodoitem(testData.rododata3)
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test.afterEach(async ({ page }) => {
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should allow me to clear the complete state of all items', async ({ page }) => {
    
    // Check and then immediately uncheck.
    await todoPage.checkAndUncheck()
    
  });
});
})