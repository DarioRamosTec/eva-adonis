import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50)
      table.string('description', 256)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
