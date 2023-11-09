import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor (protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string([
      rules.minLength(2),
      rules.maxLength(20),
    ]),
    middle_name: schema.string.nullableAndOptional([
      rules.minLength(2),
      rules.maxLength(20),
    ]),
    last_name: schema.string([
      rules.minLength(2),
      rules.maxLength(20),
    ]),
    genre: schema.enum.nullableAndOptional([
      'male', 'female',
    ]),
    status: schema.string.nullableAndOptional([
      rules.minLength(10),
      rules.maxLength(50),
    ]),
    email: schema.string([
      rules.email(),
      /*rules.unique({ table: 'users', column: 'email' }),*/
    ]),
    password: schema.string([
      rules.minLength(10),
      rules.maxLength(256),
    ]),
    active: schema.boolean.nullableAndOptional(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
