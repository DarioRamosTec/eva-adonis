// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from 'App/Models/Comment'

export default class CommentsController {
  public async index ({ response }) {
    const comment = await Comment.all()
    if (comment.length > 0) {
      response.accepted(
        {
          msg: 'Estas son todos los comentarios.',
          data: comment,
        })
    } else {
      response.notFound(
        {
          msg: 'Aún no hay ningún comentario.',
        })
    }
  }
}
