// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async index ({ request, response }) {
    let post
    if (request.param('id', null) !== null) {
      post = await Post.query().where('id', request.param('id'))
        .where('active', true).preload('comments').preload('user')
      if (post.length > 0) {
        response.accepted(
          {
            msg: 'Este es la publicación que buscas.',
            data: post,
          })
      } else {
        response.notFound(
          {
            msg: 'No se encontró la publicaión.',
          }
        )
      }
    } else {
      post = await Post.query().where('active', true).preload('user').preload('comments')
      if (post.length > 0) {
        response.accepted(
          {
            msg: 'Estos son todos las publicaciones.',
            data: post,
          }
        )
      } else {
        response.notFound(
          {
            msg: 'Aún no hay ninguna publicación.',
          }
        )
      }
    }
  }

  public async store ({ request, response }) {
    await request.validate(PostValidator)
    const post = await Post.create({
      title: request.input('title'),
      content: request.input('content', null),
      likes: request.input('likes'),
      dislikes: request.input('dislikes', null),
      active: true,
    })
    post.save()
    response.created(
      {
        msg: 'La publicación ha sido creada.',
        data: post,
      }
    )
  }

  public async update ({ request, response }) {
    const validation = await request.validate(PostValidator)

    if (request.param('id', null) !== null) {
      const post = await Post.query().where('id', request.param('id'))
        .where('active', true)
      if (post !== null) {
        post[0].merge(validation).save()
        response.accepted({
          msg: 'La publiacación se ha actualizado.',
        })
      } else {
        response.notFound(
          {
            msg: 'No existe ninguna publicación con la clave especificada.',
          }
        )
      }
    } else {
      response.forbidden(
        {
          msg: 'Para actualizar una publicación, se debe señalar un identificador.',
        }
      )
    }
  }

  public async destroy ({ request, response }) {
    if (request.param('id', null) !== null) {
      const post = await Post.query().where('id', request.param('id'))
      if (post !== null) {
        post[0].active = false
        post[0].save()
        response.accepted(
          {
            msg: 'La publicación ha sido desactivada.',
          }
        )
      } else {
        response.notFound(
          {
            msg: 'La publicación no fue encontrada.',
          }
        )
      }
    } else {
      let posts = await Post.query().where('active', true)
      if (posts.length > 0) {
        await posts.forEach((post) => {
          post.active = !post.active
        })
        response.accepted(
          {
            msg: 'Todos las publicaciones han sido desactivadas.',
          }
        )
      } else {
        response.notFound(
          {
            msg: 'No hay ninguna explicación activa.',
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
