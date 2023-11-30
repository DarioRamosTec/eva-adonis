import { test } from '@japa/runner'

test.group('Add, substract and relate content.', () => {
  test('Try to add a topic that is not in the database and add it to DB.', async ({client, assert}) => {
    const response = await client.put('/posts/1/topic')

    response.assertStatus(201)
    assert.isArray(response.body()['data'])
    response.assertBody({
      msg: 'Se creó un nuevo tópico y se agregó al post.',
    })
  }),
  test('Edit a comment without being yours.', async ({client}) => {
    const response = await client.put('/comments/1').form({
      email: 'yeojin@gmail.com',
      password: '1234567890',
    })

    response.assertStatus(200)
    response.assertBody({
      msg: 'El comentario se ha actualizado.',
    })
  }),
  test('Create a group for users.', async ({client, assert}) => {
    const response = await client.post('/groups').form({
      title: 'Group for Discord 🎮',
      description: 'To play games!',
    })

    response.assertStatus(200)
    assert.isNotEmpty(response.body()['data'])
    response.assertBody({
      msg: 'El comentario se ha actualizado.',
      data: [],
    })
  }),
  test('Find a post with the same likes and dislikes.', async ({client, assert}) => {
    const response = await client.get('/posts')

    response.assertStatus(200)
    response.body()['data'].forEach(element => {
      assert.equal(element.likes, element.dislikes)
    })
  }),
  test('Change the followers from a user that is not active', async ({client, assert}) => {
    const response = await client.put('/users/120').form({
      followers: 36,
    })

    response.assertStatus(200)
    assert.isBoolean(response.body()['data']['active'])
    assert.isAbove(response.body()['data']['followers'], 35)
  })
})
