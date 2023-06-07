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
  Route.post("/charge", "Payments/IndexController.bankTransfer");
  Route.post("/notification/push", 'Midtrans/NotificationController.post');
  Route.post("/cart/:id", "Payments/CartController.addCart")
  Route.get("/cart","Payments/CartController.index");
  Route.delete("/cart/:id", "Payments/CartController.delete")
}).prefix("payment");

Route.group(() => {
  Route.get("/course", "Course/CourseController.courseIndex");
  Route.get("/rand", "Course/CourseController.randIndex");
  Route.get("/myCourse", "Course/CourseController.myCourseIndex");
  Route.get("/waitingPayment", "Course/CourseController.waitingPaymentIndex");
  Route.get("/notRegistered", "Course/CourseController.notRegisteredIndex");
  Route.get("/:id", "Course/CourseController.courseShow");
  Route.get("/:id/silabus", "Course/SilabusController.index");
  Route.get("/:id/tugas", "Course/TugasController.index");
}).prefix('course');







