import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Post, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(5),
    likes: faker.number.int({ min: 0 }),
    dislikes: faker.number.int({ min: 0 }),
  }
}).build()
