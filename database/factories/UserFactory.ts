import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PostFactory from './PostFactory'
import CommentFactory from './CommentFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    name: faker.person.firstName(),
    middle_name: faker.person.middleName(),
    last_name: faker.person.lastName(),
    status: faker.lorem.sentence(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    genre: faker.person.sexType(),
    active: true,
  }
}).relation('comments', () => CommentFactory).relation('posts', () => PostFactory).build()
