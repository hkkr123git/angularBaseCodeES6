/*
 Copyright 2016, Sweets N' Salt
 Author: ea@sweetsnsalt.com
*/
/*@flow*/
// Declare app level module which depends on views, and components
'use strict';

const AppEnvironmentConfig = require('./config/app-environment.config');
const DebugConfig = require('./config/debug.config');
const EventRoutingModule = require('./modules/events/event.routing');
const RouterConfig = require('./config/router.config');
const SideMenuController = require('./modules/layout/sidemenuArea/sidemenu.controller');
const ThemeConfig = require('./config/theme.config');

class AppController {
  rootClass: string;

   /*@ngInject;*/
  constructor($scope: Object, $rootScope: Object) {
    $rootScope.$watch('rootClass',(): void => this.updateAppClassValues($rootScope));
  }

  updateAppClassValues($rootScope: Object): void {
    this.rootClass = $rootScope.rootClass;
  }
}

angular
  .module('snsCmsApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngMaterial',
    EventRoutingModule.name,
    (() => { require('oclazyload'); return 'oc.lazyLoad' })()
  ])
   .config(RouterConfig)
   .config(DebugConfig)
   .config(ThemeConfig)
   .run(AppEnvironmentConfig)
   .controller('AppController', AppController)
   .controller('SideMenuController', SideMenuController);
