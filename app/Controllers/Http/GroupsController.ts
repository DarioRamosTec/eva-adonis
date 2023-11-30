// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Group from 'App/Models/Group'
import GroupValidator from 'App/Validators/GroupValidator'

export default class GroupsController {
  public async store ({ request, response }) {
    await request.validate(GroupValidator)
    const group = await Group.create({
      title: request.input('title', null),
      description: request.input('description', null),
    })
    group.save()
    response.created({
      msg: 'El grupo fue creado.',
      data: group,
      empty: true,
    })
  }
}
