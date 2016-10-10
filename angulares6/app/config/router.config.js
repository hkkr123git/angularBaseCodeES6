/*
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
*/
/*@flow*/

 /*@ngInject;*/
const RouterConfig = ($stateProvider: Object, $urlRouterProvider: Object): void => {
  $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/modules/login/loginTemplate.html',
        controller: 'LoginController',
        controllerAs: 'loginVM',
        resolve: {
          loadLoginController: ($q, $ocLazyLoad) => {
            return $q((resolve) => {
              require.ensure([], () => {
                /* load Login module*/
                const loginModule = require('../modules/login/login.module');
                $ocLazyLoad.load({name: loginModule.name});
                resolve(loginModule.controller);
              });
            });
          }
        }
      })
      .state('root', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'app/modules/layout/contentArea/ContentAreaTemplate.html'
          },
          'sidemenu@root': {
            templateUrl: 'app/modules/layout/sidemenuArea/sidemenuTemplate.html',
            controller: 'SideMenuController',
            controllerAs: 'sidemenuVM'
          }
        }
      });
}

module.exports = RouterConfig;
