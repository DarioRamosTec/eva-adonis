import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'groups'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 30)
      table.string('description', 256)
      table.timestamps()
      table.integer('community_id').unsigned().references('id').inTable('communities')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
