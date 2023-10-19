import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CommentFactory from './CommentFactory'

export default Factory.define(Post, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(5),
    likes: faker.number.int(100),
    dislikes: faker.number.int(50),
  }
}).relation('comments', () => CommentFactory).build()
