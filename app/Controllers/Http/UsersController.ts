// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index ({ request, response }) {
    let user
    if (request.param('id', null) !== null) {
      user = await User.all()
      if (user.length > 0) {
        response.accepted(
          {
            msg: 'Estas son todos los usuarios.',
            data: user,
          })
      } else {
        response.notFound(
          {
            msg: 'Aún no hay ningún usuario.',
          })
      }
    } else {
      user = await User.all()
      if (user.length > 0) {
        response.accepted(
          {
            msg: 'Estos son todos los usarios.',
            data: user,
          }
        )
      } else {
        response.notFound(
          {
            msg: 'un no hay ningún usuario.',
          }
        )
      }
    }
  }

  public async store ({ request, response }) {
    let user
    if (request.param('id', null) !== null) {
      user = await User.all()
      if (user.length > 0) {
        response.accepted(
          {
            msg: 'Estas son todos los usuarios.',
            data: user,
          })
      } else {
        response.notFound(
          {
            msg: 'Aún no hay ningún usuario.',
          })
      }
    } else {
      user = await User.all()
      if (user.length > 0) {
        response.accepted(
          {
            msg: 'Estos son todos los usarios.',
            data: user,
          }
        )
      } else {
        response.notFound(
          {
            msg: 'un no hay ningún usuario.',
          }
        )
      }
    }
  }
}
