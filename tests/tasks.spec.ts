import { test, expect } from '@playwright/test'

test('deve poder cadastrar uma tarefa', async ({ page, request }) => {

    const taskName = 'Ler um livro de TypeScript'
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)

    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*=InputNewTask]') // é a definição de um objeto, e não um step, então não precisa de await
    await inputTaskName.fill(taskName)
    await page.click('css=button >> text=Create')

})