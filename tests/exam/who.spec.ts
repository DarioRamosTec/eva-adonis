import { test } from '@japa/runner'

test.group('Create, post, comment and like.', () => {
  test('Create an user.', async ({client, assert}) => {
    const response = await client.post('/users').form({
      'name': 'Darío',
      'middle_name': 'Ramos',
      'last_name': 'Ramón',
      'status': 'Reading books! 📚',
      'genre': null,
    })

    response.assertStatus(201)
    assert.isArray(response.body()['data'])
  }),
  test('Cannot find the method given.', async ({client}) => {
    const response = await client.patch('/comments')

    response.assertStatus(404)
    response.assertBody({
      msg: 'No se encontró ningún metodo para manejar su petición.',
    })
  }),
  test('Make a post from the route: (posts).', async ({client}) => {
    const response = await client.post('/posts').form({
      'title': 'How to prepare spaghetti 🍝!',
      'content': '1.- Check the package directions of the spaghetti you plan to cook.\n'
               + '2.- Cook the spaghetti in salted water\n'
               + '3.- Check the package directions of the spaghetti you plan to cook.',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      msg: 'La publicación ha sido creada.',
    })
  }),
  test('Comment in a post.', async ({client, assert}) => {
    const response = await client.post('/comments/post/1')

    response.assertStatus(201)
    assert.isNotEmpty(response.body()['data'])
  }),
  test('Add a negative like in a post.', async ({client, assert}) => {
    const response = await client.post('/post/like')

    response.assertStatus(406)
    assert.isBelow(response.body()['like'], 0)
    response.assertBodyContains({
      msg: 'No se pueden insertar likes negativos, para eso, añade un dislike.',
    })
  })
})
