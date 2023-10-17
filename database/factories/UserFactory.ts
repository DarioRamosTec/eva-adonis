import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    name: faker.person.firstName(),
    middle_name: faker.person.middleName(),
    last_name: faker.person.lastName(),
    status: faker.lorem.sentence(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    genre: faker.person.sexType(),
  }
}).build()
