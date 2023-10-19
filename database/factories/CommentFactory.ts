import Comment from 'App/Models/Comment'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Comment, ({ faker }) => {
  return {
    content: faker.lorem.paragraphs(5),
    likes: faker.number.int(75),
    dislikes: faker.number.int(25),
  }
}).build()
