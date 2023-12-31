import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('title', 256)
      table.string('content', 256)
      table.integer('likes')
      table.integer('dislikes')
      table.integer('rating')
      table.boolean('active').defaultTo(true)
      //table.timestamp('created_at', { useTz: true })
      ///table.foreign('user_id').references('users.id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      //table.timestamp('updated_at', { useTz: true })
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
