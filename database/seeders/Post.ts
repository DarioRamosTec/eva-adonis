import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'

export default class extends BaseSeeder {
  public async run () {
    await Post.create(
      {
        title: 'Kiss Later Song',
        content: 'Ooh pa ooh pa, ooh pa ooh pa.',
        likes: 10,
        dislikes: 4,
        user_id: 1,
      }
    )

    /*await Post.createMany(await PostFactory.createMany(4))*/
  }
}
