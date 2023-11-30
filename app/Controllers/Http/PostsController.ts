// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import PostsTopics from 'App/Models/PostsTopic'
import Topic from 'App/Models/Topic'
import User from 'App/Models/User'
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
      post = await Post.query().where('active', true).preload('comments')
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
    let id = request.param('id', null)
    if (id !== null) {
      let user = await User.query().where('id', request.param('id'))
      if (user === null) {
        response.created(
          {
            msg: 'No se encontró al usuario.',
          }
        )
      } else {
        await request.validate(PostValidator)
        const post = await Post.create({
          title: request.input('title'),
          content: request.input('content', null),
          likes: request.input('likes'),
          dislikes: request.input('dislikes', null),
          user_id: user[0].id,
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
    } else {
      response.notFound(
        {
          msg: 'No se ha indicado ningún usuario para crear una publicación.',
        }
      )
    }
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

  public async rate ({ request, response }) {
    const rate : number = parseInt(request.input('rate', null))
    if (rate !== null) {
      const post = await Post.find(request.param('id'))
      if (post !== null) {
        if (rate < 0) {
          response.status(406)
          response.send({
            msg: 'No se pueden insertar calificaciones negativas.',
            rating: rate,
          })
        } else {
          post.rating = rate
          post.save()
          response.accepted({
            msg: 'Se ha cambiado la calificación',
            rating: rate,
          })
        }
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
          msg: 'Debes de incluir una calificación adecuada.',
        }
      )
    }
  }

  public async topic ({ request, response }) {
    let topic = request.input('topic', null)
    let found
    if (topic !== null) {
      const post = await Post.query().where('id', request.param('id'))
      if (post !== null) {
        found = await Topic.query().where('title', topic)
        if (found.length === 0) {
          //
          const newTopic = await Topic.create({
            title: request.input('topic'),
          })
          newTopic.save()
          //
          const postsTopics = await PostsTopics.create({
            post_id: parseInt(request.param('id')),
            topic_id: newTopic.id,
          })
          postsTopics.save()
          response.created(
            {
              msg: 'Se creó un nuevo tópico y se agregó al post.',
            }
          )
        } else {
          //
          const postsTopics = await PostsTopics.create({
            post_id: request.param('id'),
            topic_id: found[0].id,
          })
          postsTopics.save()
          response.accepted(
            {
              msg: 'Se agregó el tópico al post.',
            }
          )
        }
      } else {
        response.notFound(
          {
            msg: 'La publicación no fue encontrada.',
          }
        )
      }
    } else {
      response.notFound(
        {
          msg: 'No se añadio ningún tópico.',
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
      case 'PUT':
        return this.update({request, response})
      case 'DELETE':
        return this.destroy({request, response})
      case 'POST':
        response.notAcceptable({
          msg: 'No utilize este método para crear posts.',
        })
        break
      default:
        response.notFound({
          msg: 'No se encontró ningún metodo para manejar su petición.',
        })
        break
    }
  }
}
