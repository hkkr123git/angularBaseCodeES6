/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-*/
/*@flow*/

 /*@ngInject;*/
const EventRouter = ($stateProvider: Object): void => {
  $stateProvider
    .state('root.event', {
      url: '/event',
      templateUrl: 'app/modules/events/event.html',
      controller: 'EventController',
      controllerAs : 'eventVM',
      resolve: {
        loadEventController: ($q, $ocLazyLoad) => {
          return $q((resolve) => {
            require.ensure([], () => {
              /* load Login module*/
              const eventModule = require('./event.module');
              const EventControllerModule = require('./event.controller');
              $ocLazyLoad.load({name: eventModule.name});
              $ocLazyLoad.load({name: EventControllerModule.name});
              resolve(EventControllerModule.controller);
            });
          });
        }
      }
    });
}
const EventRoutingModule =
  angular
    .module('snsCmsApp.event.routing', [])
    .config(EventRouter)
module.exports = EventRoutingModule;
