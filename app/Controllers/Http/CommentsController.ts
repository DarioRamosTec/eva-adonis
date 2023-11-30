// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
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
    let id = request.param('id', null)
    if (id !== null) {
      let post = await Post.query().where('id', request.param('id'))
      if (post !== null) {
        await request.validate(CommentValidator)
        const comment = await Comment.create({
          content: request.input('content'),
          likes: request.input('likes', null),
          dislikes: request.input('dislikes', null),
          active: true,
        })
        comment.save()
        response.created(
          {
            msg: 'El comentario ha sido creado.',
            data: comment,
          }
        )
      } else {
        response.created(
          {
            msg: 'No se encontró la publicación a comentar.',
          }
        )
      }
    } else {
      response.notFound(
        {
          msg: 'No se ha indicado ninguna publicación a la cual contestar.',
        }
      )
    }
  }

  public async update ({ request, response }) {
    const validation = await request.validate(CommentValidator)
    if (request.param('id', null) !== null) {
      const comment = await Comment.query().where('id', request.param('id'))
        .where('active', true)
      if (comment !== null) {
        comment[0].merge(validation).save()
        let email = request.input('email', null)
        const userComment = await User.find(comment[0].id)
        if (email !== null && userComment !== null) {
          const user = await User.query().where('email', email)
          if (user[0].id === userComment.id && user[0].password === userComment.password) {
            response.accepted({
              msg: 'El comentario se ha actualizado.',
            })
          } else {
            response.unauthorized({
              msg: 'No tienes el permiso para editar.',
            })
          }
        } else {
          response.notFound({
            msg: 'Debes iniciar sesión para editar.',
          })
        }
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
        return response.notFound({
          msg: 'No se encontró ningún metodo para manejar su petición.',
        })
    }
  }
}
