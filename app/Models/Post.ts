import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Comment from 'App/Models/Comment'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public rating: number

  @column()
  public likes: number

  @column()
  public dislikes: number

  @column()
  public user_id: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment, {
    foreignKey: 'post_id',
  })
  public comments: HasMany<typeof Comment>
}
