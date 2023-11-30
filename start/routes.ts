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
  Route.put('/users/:id/followers', 'UsersController.followers').namespace('App/Controllers/Http')
  Route.any('/users/:id?', 'UsersController.decide').namespace('App/Controllers/Http')
  Route.any('/comments/:id?', 'CommentsController.decide').namespace('App/Controllers/Http')
  Route.post('/comments/post/:id?', 'CommentsController.store').namespace('App/Controllers/Http')
  Route.any('/posts/:id?', 'PostsController.decide').namespace('App/Controllers/Http')
  Route.post('/posts/user/:id?', 'PostsController.store').namespace('App/Controllers/Http')
  Route.post('/posts/:id?/rating', 'PostsController.rate').namespace('App/Controllers/Http')
  Route.post('/group', 'PostsController.store').namespace('App/Controllers/Http')
}).prefix('v1')

Route.group(() => {
  Route.any('/eva', async ({ request }) => {
    return { msg: request.intended() + ' ME!' }
  })
})

Route.group(() => {
  Route.get('/test/me', 'MiscsController.checkAndTest').namespace('App/Controllers/Http')
  Route.get('/test/you', 'MiscsController.checkAndTest2').namespace('App/Controllers/Http')
})
