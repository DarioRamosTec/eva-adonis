import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([{
      name: 'Yeojin',
      last_name: 'Im',
      status: 'Flip that, flip that that. So flip that, flip that now',
      genre: 'female',
      email: 'yeojin@grrrverse.com',
    }])

    await User.create(await UserFactory.create())
  }
}
