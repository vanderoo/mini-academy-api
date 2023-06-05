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

Route.group(() => {
  Route.post('/register', 'Auth/RegisterController.register');
  Route.post('/login', 'Auth/LoginController.login');
  Route.post('/logout', 'Auth/LoginController.logout');
  Route.post('/check', 'Auth/LoginController.check');
}).prefix("auth");

Route.group(() => {
  Route.post("/charge", "Payments/IndexController.bankTransfer").middleware(['auth']);
  Route.post("/notification/push", 'Midtrans/NotificationController.post');
}).prefix("payment");

Route.group(() => {
  Route.get("/course", "Course/CourseController.courseIndex");
  Route.get("/myCourse", "Course/CourseController.myCourseIndex");
  Route.get("/waitingPayment", "Course/CourseController.waitingPaymentIndex");
  Route.get("/notRegistered", "Course/CourseController.notRegisteredIndex");
}).prefix('course/');







