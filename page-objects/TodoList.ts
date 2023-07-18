import { connectLib } from "../lib/connectLib";
import { Page, expect } from "@playwright/test";
import { Utils } from '../lib/Utill'
let utill: Utils
export class TodoList extends connectLib{
    readonly additemfiled= this.page.getByPlaceholder('What needs to be done?')
    readonly todolist = this.page.locator('new-todo')
    readonly toggleAll = this.page.getByText('Mark all as complete')


    constructor(page:Page){
        super(page)
        utill= new Utils(page)
    }
    async connect(url){
        await this.page.goto(url)
    }
    async addtodoitem(item:any){
        await utill.enterElementText(this.additemfiled,item)
        await utill.pressKeyBoardKey("Enter")
    }
    
    
async  checkNumberOfTodosInLocalStorage(expected: number) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).length === e;
    }, expected);
  }
  
  async  checkNumberOfCompletedTodosInLocalStorage( expected: number) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e;
    }, expected);
  }
  
  async  checkTodosInLocalStorage( title: string) {
    return await this.page.waitForFunction(t => {
      return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
    }, title);
  }
  async checkAndUncheck(){
   await  this.page.pause();
   await  this.toggleAll.click()
    await this.toggleAll.click()
    await expect(this.page.getByTestId('todo-item')).toHaveClass(['', '', '']);
  }
  
}