import { test, expect } from '@playwright/test'

test('deve poder cadastrar uma tarefa', async ({ page, request }) => {

    //Dado que eu tenho uma nova tarefa
    const taskName = 'Ler um livro de TypeScript'
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)

    //E que estou na página de cadastro
    await page.goto('http://localhost:8080')

    //Quando faço um novo cadastro de uma tarefa
    const inputTaskName = page.locator('input[class*=InputNewTask]') // é a definição de um objeto, e não um step, então não precisa de await
    await inputTaskName.fill(taskName)
    
    await page.click('css=button >> text=Create')

    //Então a nova tarefa deverá ser apresentada na tela
    const target = page.locator(`css=.task-item p >> text=${taskName}`)
    await expect(target).toBeVisible()

})