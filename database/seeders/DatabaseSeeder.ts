import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([{
      name: 'Yeojin',
      last_name: 'Im',
      status: 'Flip that, flip that that. So flip that, flip that now',
      genre: 'female',
      email: 'yeojin@grrrverse.com',
    }])

    await Post.create(
      {
        title: 'Kiss Later Song',
        content: 'Ooh pa ooh pa, ooh pa ooh pa.',
        likes: 10,
        dislikes: 4,
        user_id: 1,
      }
    )

    await Comment.create(
      {
        content: 'Ooh pa ooh pa, ooh pa ooh pa.',
        likes: 4,
        dislikes: 0,
        post_id: 1,
        user_id: 1,
      }
    )

    // Crear usuarios con sus posts.
    await User.createMany(await UserFactory
      .with('posts', 2, (post) => post.with('comments', 1))
      .createMany(5))

    // Darle comentarios a los posts.
    let users = await User.all()
    let comments = await Comment.all()
    /*await Comment.updateOrCreate({
      user_id: 3,
    }, {}) -> No sirve este metodo. */

    /*comments.forEach(async function (comment) {
      await comment.merge({ user_id: 4 }).save()
    }) -> No sirve este metodo. */

    for (let comment of comments) {
      await comment.merge({ user_id: users[Math.floor(Math.random()*users.length)].id }).save()
    }
  }
}
