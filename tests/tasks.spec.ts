import { test, expect } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'

test('deve poder cadastrar uma tarefa', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Ler um livro de TypeScript',
        is_done: false
    }
    //Dado que eu tenho uma nova tarefa
    await request.delete('http://localhost:3333/helper/tasks/' + task.name)

    //E que estou na página de cadastro
    await page.goto('http://localhost:8080')

    //Quando faço um novo cadastro de uma tarefa
    const inputTaskName = page.locator('input[class*=InputNewTask]') // é a definição de um objeto, e não um step, então não precisa de await
    await inputTaskName.fill(task.name)
    
    await page.click('css=button >> text=Create')

    //Então a nova tarefa deverá ser apresentada na tela
    const target = page.locator(`css=.task-item p >> text=${task.name}`)
    await expect(target).toBeVisible()

})

test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'Comprar Ketchup',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + task.name)

    const newTask = await request.post('http://localhost:3333/tasks/', {data: task})
    expect(newTask.ok()).toBeTruthy()

    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*=InputNewTask]') 
    await inputTaskName.fill(task.name) 

    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')


})