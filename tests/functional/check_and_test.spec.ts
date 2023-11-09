import { test } from '@japa/runner'

test.group('Test the new tests', () => {
  test('The body is how i want?', async ({client, assert}) => {
    const response = await client.get('/test/me')

    response.assertBody({msg: 'TEST ME!', data: []})
    assert.isArray(response.body()['data'])
    assert.isEmpty(response.body()['data'])
  }),
  test('The booleans are like you wanted to?', async ({client, assert}) => {
    const response = await client.get('/test/you')

    assert.isBoolean(response.body()['data'])
    assert.isFalse(response.body()['data'])
    assert.isNotArray(response.body()['data'])
  }) 
})
