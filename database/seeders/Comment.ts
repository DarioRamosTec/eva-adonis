import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'

export default class extends BaseSeeder {
  public async run () {
    await Comment.create(
      {
        content: 'Ooh pa ooh pa, ooh pa ooh pa.',
        likes: 4,
        dislikes: 0,
        post_id: 1,
        user_id: 1,
      }
    )

    //await Comment.createMany(await CommentFactory.createMany(2))
  }
}
