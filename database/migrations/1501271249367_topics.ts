import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'topics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps()
      table.string('name', 50)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
