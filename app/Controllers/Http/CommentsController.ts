// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from 'App/Models/Comment'
import CommentValidator from 'App/Validators/CommentValidator'

export default class CommentsController {
  public async index ({ request, response }) {
    let comment
    if (request.param('id', null) !== null) {
      comment = await Comment.query().where('id', request.param('id'))
        .where('active', true).preload('post').preload('user')
      if (comment.length > 0) {
        response.accepted(
          {
            msg: 'Este es el comentario que buscas.',
            data: comment,
          })
      } else {
        response.notFound(
          {
            msg: 'No se encontró el comentario.',
          }
        )
      }
    } else {
      comment = await Comment.query().where('active', true).preload('post').preload('user')
      if (comment.length > 0) {
        response.accepted(
          {
            msg: 'Estos son todos los comentarios.',
            data: comment,
          }
        )
      } else {
        response.notFound(
          {
            msg: 'Aún no hay ningún comentario.',
          }
        )
      }
    }
  }

  public async store ({ request, response }) {
    await request.validate(CommentValidator)
    const comment = await Comment.create({
      name: request.input('name'),
      middle_name: request.input('middle_name', null),
      last_name: request.input('last_name'),
      status: request.input('status', null),
      genre: request.input('genre', null),
      email: request.input('email'),
      active: true,
    })
    comment.save()
    response.created(
      {
        msg: 'El comentario ha sido cread0.',
        data: comment,
      }
    )
  }

  public async update ({ request, response }) {
    const validation = await request.validate(CommentValidator)

    if (request.param('id', null) !== null) {
      const comment = await Comment.query().where('id', request.param('id'))
        .where('active', true)
      if (comment !== null) {
        comment[0].merge(validation).save()
        response.accepted({
          msg: 'El comentario se ha actualizado.',
        })
      } else {
        response.notFound(
          {
            msg: 'No existe ningún comentario con la clave especificada.',
          }
        )
      }
    } else {
      response.forbidden(
        {
          msg: 'Para actualizar un comentario, se debe señalar un identificador.',
        }
      )
    }
  }

  public async destroy ({ request, response }) {
    if (request.param('id', null) !== null) {
      const comment = await Comment.query().where('id', request.param('id'))
      if (comment !== null) {
        comment[0].active = false
        comment[0].save()
        response.accepted(
          {
            msg: 'El comentario ha sido desactivado.',
          }
        )
      } else {
        response.notFound(
          {
            msg: 'El comentario no fue encontrado.',
          }
        )
      }
    } else {
      let users = await Comment.query().where('active', true)
      if (users.length > 0) {
        await users.forEach((comment) => {
          comment.active = !comment.active
        })
        response.accepted(
          {
            msg: 'Todos los comentarios han sido desactivados.',
          }
        )
      } else {
        response.notFound(
          {
            msg: 'No hay ningún comentario activo.',
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
