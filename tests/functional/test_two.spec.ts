import { test } from '@japa/runner'

test.group('Test two', () => {
  test('Find if Yeojin exits.', async ({client}) => {
    const response = await client.get('v1/users')
    response.assertBodyContains({
      'msg': 'Estos son todos los usuarios.',
      'data': [
        {
          'name': 'Yeojin',
          'last_name': 'Im',
          'genre': 'female',
          'email': 'yeojin@grrrverse.com',
        },
      ],
    })
  }),
  test('Check if a user have posts and comments.', async ({client}) => {
    const response = await client.get('v1/users/1')
    response.assertBodyContains({
      'msg': 'Este es el usuario que buscas.',
      'data': [
        {
          'comments': [],
          'posts': [],
        },
      ],
    })
  }),
  test('Create a user without some details', async ({client}) => {
    const response = await client.post('v1/users').form({
      'name': 'Darío',
      'last_name': 'Ramos',
      'email': 'dario@grrrverse.com',
      'password': 'unabonitacontraseña',
    })
    response.assertBodyContains({
      'data': {
        'name': 'Darío',
        'middle_name': null,
        'last_name': 'Ramos',
        'status': null,
        'genre': null,
        'email': 'dario@grrrverse.com',
      },
    })
  }),
  test('Change values and check for errors', async ({client}) => {
    const response = await client.put('v1/users').form({
      'name': 'Guillermo',
      'last_name': 'Ramón',
    })
    response.assertBody({
      'errors': [
        {
          'rule': 'required',
          'field': 'password',
          'message': 'required validation failed',
        },
      ],
    })
  }),
  test('Delete a user and check if all is correct', async ({client}) => {
    const response = client.delete('v1/users/7')

    ;(await response).assertBody({
      'msg': 'El usuario ha sido desactivado.',
    })
  })
})
