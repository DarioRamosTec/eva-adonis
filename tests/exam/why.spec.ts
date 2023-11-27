import { test } from '@japa/runner'

test.group('', () => {
  test('are', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('you', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('sitting', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('right', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('there', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  })
})
