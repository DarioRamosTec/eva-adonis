/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.any('/users/:id?', 'UsersController.decideAction').namespace('App/Controllers/Http')
  Route.get('/comments/:id?', 'CommentsController.index').namespace('App/Controllers/Http')
  Route.get('/posts/:id?', 'PostsController.index').namespace('App/Controllers/Http')
}).prefix('v1')

Route.group(() => {
  Route.any('/eva', async ({ request }) => {
    return { msg: request.intended() + ' ME!' }
  })
})
