import { test } from '@japa/runner'

test.group('Add, substract and relate content.', () => {
  test('Try to add a topic that is not in the database and add it to DB.', async ({client}) => {
    const response = await client.put('/posts/1/topic').form({
      topic: 'Drama',
    })

    response.assertStatus(201)
    response.assertBody({
      msg: 'Se creó un nuevo tópico y se agregó al post.',
    })
  }),
  test('Edit a comment without being yours.', async ({client}) => {
    const response = await client.put('/comments/1').form({
      email: 'yeojin@gmail.com',
      password: '1234567890',
      content: 'Let\'s sing a song! 🐸',
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

    response.assertStatus(201)
    assert.isNotEmpty(response.body()['data'])
    assert.isBoolean(response.body()['empty'])
    assert.isTrue(response.body()['empty'])
    response.assertBodyContains({
      msg: 'El grupo fue creado.',
      data: {},
    })
  }),
  test('Find a post with the same likes and dislikes.', async ({client, assert}) => {
    const response = await client.get('/posts')

    response.assertStatus(202)
    response.body()['data'].forEach(element => {
      if (element.likes === element.dislikes) {
        assert.equal(element.likes, element.dislikes)
      }
    })
  }),
  test('Delete all users in system.', async ({client, assert}) => {
    const response = await client.delete('/users').form({
      exceptions: ['yeojin@grrrverse.com'],
    })

    response.assertStatus(202)
    assert.isNotEmpty(response.body()['exception'])
    response.assertBodyContains({
      msg: 'Todos los usuarios han sido desactivados.',
    })
  })
})
