import Comment from 'App/Models/Comment'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Comment, ({ faker }) => {
  return {
    content: faker.lorem.paragraphs(5),
    likes: faker.number.int({ min: 0 }),
    dislikes: faker.number.int({ min: 0 }),
  }
}).build()
