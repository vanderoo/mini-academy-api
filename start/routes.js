'use strict'

const auth = require('../config/auth');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');


Route.post('/login', 'Auth/LoginController.login');

Route.group(() => {
  Route.post("/charge", "Payments/IndexController.bankTransfer").middleware(['auth']);
}).prefix("va");

Route.post("/notification/push", 'Midtrans/NotificationController.post')


Route.post('/logout', 'Auth/LoginController.logout');



