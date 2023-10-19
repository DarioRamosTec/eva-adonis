// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index ({ request, response }) {
    let user
    if (request.param('id', null) !== null) {
      user = await User.query().where('id', request.param('id')).preload('posts').preload('comments')
      if (user.length > 0) {
        response.accepted(
          {
            msg: 'Este es el usuario que buscas.',
            data: user,
          })
      } else {
        response.notFound(
          {
            msg: 'No existe ningún ídolo con la clave especificada.',
          }
        )
      }
    } else {
      user = await User.query().preload('posts').preload('comments')
      if (user.length > 0) {
        response.accepted(
          {
            msg: 'Estos son todos los usuarios.',
            data: user,
          }
        )
      } else {
        response.notFound(
          {
            msg: 'Aún no hay ningún usuario.',
          }
        )
      }
    }
  }

  public async store ({ request, response }) {
    await request.validate(UserValidator)
    const user = await User.create({
      name: request.input('nombre'),
      middle_name: request.input('middle_name', null),
      last_name: request.input('last_name'),
      status: request.input('status', null),
      genre: request.input('genre', null),
      email: request.input('email'),
    })

    response.created(
      {
        msg: (user.genre === 'male' ?
          'El usuario ha sido creado.' : (user.genre === 'female' ? 'La usuario ha sido creada.' : 'Se creó un usuario.')),
        data: user,
      }
    )
  }

  public async update ({ request, response }) {
    const validation = await request.validate(UserValidator)

    const user = await User.find(request.param('id'))
    if (user !== null) {
      user.merge(validation).save()
      response.accepted({
        msg: 'El usuario se ha actualizado.',
      })
    } else {
      response.notFound(
        {
          msg: 'No existe ningún usuario con la clave especificada.',
        }
      )
    }
  }

  public async destroy ({ request, response }) {
    if (request.param('id', null) !== null) {
      const user = await User.find(request.param('id'))
      if (user !== null) {
        user.delete()
        response.accepted(
          {
            msg: 'El usuario ha sido eliminado.',
          }
        )
      } else {
        response.notFound(
          {
            msg: 'El usuario no existe.',
          }
        )
      }
    } else {
      if (User.length > 0) {
        await User.query().delete()
        response.accepted(
          {
            msg: 'Todos los usuarios han sido eliminados.',
          }
        )
      } else {
        response.notFound(
          {
            msg: 'No hay ningún usuario que eliminar aún.',
          }
        )
      }
    }
  }
}
