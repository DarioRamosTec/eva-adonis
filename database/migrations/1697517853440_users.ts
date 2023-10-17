import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('name', 20)
      table.string('middle_name', 20).nullable()
      table.string('last_name', 20)
      table.string('status', 40).nullable()
      table.enu('genre', ['male', 'female']).nullable()
      table.string('email', 100).unique()
      table.string('password', 256)
      table.timestamps()
      //table.timestamp('created_at', { precision: 6, useTz: true })
      //table.timestamp('updated_at', { precision: 6, useTz: true })
    })
  }

  public async down () {
    //this.schema.raw('DROP TYPE IF EXISTS "user_genre"')
    this.schema.dropTable(this.tableName)
  }
}
