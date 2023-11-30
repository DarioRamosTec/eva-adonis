// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'
import UserValidatorMail from 'App/Validators/UserValidatorMail'

export default class UsersController {
  public async index ({ request, response }) {
    let user
    if (request.param('id', null) !== null) {
      user = await User.query().where('id', request.param('id'))
        .where('active', true).preload('posts').preload('comments')
      if (user.length > 0) {
        response.accepted(
          {
            msg: 'Este es el usuario que buscas.',
            data: user,
          })
      } else {
        response.notFound(
          {
            msg: 'No se encontró el usuario.',
          }
        )
      }
    } else {
      user = await User.query().where('active', true).preload('posts').preload('comments')
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
      name: request.input('name'),
      middle_name: request.input('middle_name', null),
      last_name: request.input('last_name'),
      status: request.input('status', null),
      genre: request.input('genre', null),
      email: request.input('email'),
      active: true,
    })
    user.save()
    response.created(
      {
        msg: (user.genre === 'male' ?
          'El usuario ha sido creado.' :
          user.genre === 'female' ? 'La usuario ha sido creada.' : 'Se creó un usuario.'),
        data: user,
      }
    )
  }

  public async update ({ request, response }) {
    const validation = await request.validate(UserValidatorMail)

    if (request.param('id', null) !== null) {
      const user = await User.query().where('id', request.param('id'))
        .where('active', true)
      if (user !== null) {
        user[0].merge(validation).save()
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
    } else {
      response.forbidden(
        {
          msg: 'Para actualizar un usuario, se debe señalar un identificador.',
        }
      )
    }
  }

  public async destroy ({ request, response }) {
    if (request.param('id', null) !== null) {
      const user = await User.query().where('id', request.param('id'))
      if (user !== null) {
        user[0].active = false
        user[0].save()
        response.accepted(
          {
            msg: 'El usuario ha sido desactivado.',
          }
        )
      } else {
        response.notFound(
          {
            msg: 'El usuario no fue encontrado.',
          }
        )
      }
    } else {
      let exception = request.input('exceptions', null)
      let exceptions : User[] = []
      let users = await User.query().where('active', true)
      if (users.length > 0) {
        await users.forEach((user) => {
          if (exception.includes(user.email)) {
            exceptions.push(user)
          } else {
            user.active = !user.active
          }
        })
        response.accepted(
          {
            msg: 'Todos los usuarios han sido desactivados.',
            exception: exceptions,
          }
        )
      } else {
        response.notFound(
          {
            msg: 'No hay ningún usuario activo.',
          }
        )
      }
    }
  }

  public async decide ({ request, response }) {
    switch (request.intended()) {
      case 'GET':
        return this.index({request, response})
      case 'POST':
        return this.store({request, response})
      case 'PUT':
        return this.update({request, response})
      case 'DELETE':
        return this.destroy({request, response})
      default:
        response.notFound({
          msg: 'No se encontró ningún metodo para manejar su petición.',
        })
        break
    }
  }
}
