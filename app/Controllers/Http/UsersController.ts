// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index ({ request, response }) {
    const user = await User.all()
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
  }
}
