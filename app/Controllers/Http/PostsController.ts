// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({ request, response }) {
    const post = await Post.all()
    if (post.length > 0) {
      response.accepted(
        {
          msg: 'Estas son todos los posts.',
          data: post,
        })
    } else {
      response.notFound(
        {
          msg: 'Aún no hay ningún post.',
        })
    }
  }
}
