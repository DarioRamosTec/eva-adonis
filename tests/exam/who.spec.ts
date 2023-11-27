import { test } from '@japa/runner'

test.group('Who', () => {
  test('are', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('you', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('doing', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('here', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  }),
  test('?', async ({client}) => {
    const response = await client.get('/')

    response.assertStatus(200)
  })
})
