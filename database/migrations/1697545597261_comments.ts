import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('content', 256)
      table.integer('likes')
      table.integer('dislikes')
      table.integer('post_id').unsigned().references('id').inTable('posts')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
