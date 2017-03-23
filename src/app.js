'use strict';

import './assets/css/app.style.css';
/*import './jquery_global';
 import 'bootstrap';
 import 'angular';
 import 'angular-ui-router';*/
import appRouter from './app.config.js';
import appController from './app.controller.js';

let myApp = angular.module("routerApp", ["ui.router"]);
appRouter(myApp);
appController(myApp);
