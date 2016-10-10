/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-*/
/*@flow*/

 /*@ngInject;*/
 const AppEnvironmentConfig = ($rootScope: Object): void => {
   $rootScope.transitionClass = 'transition-forward';
   $rootScope.$on(
     '$stateChangeStart',
     (event: Object, toState: Object, toParams: Object, fromState: Object): void => {
       //should probably use $state.includes() with $stateProviderHelper here, once the routing is restructured.
       //$stateProviderHelper can only find immediate sibling though...
       //const parentPage = ((fromState || {}).data || {}).parentPage;
       //const prevSiblingPages = (((fromState || {}).data || {}).prevSiblingPages) || [];
       //const nextSiblingPages = (((fromState || {}).data || {}).nextSiblingPages) || [];

       //assigning rootClass for page background
       $rootScope.rootClass = ((toState || {}).data || {}).rootClass || 'page-generic';
     });
 }

module.exports = AppEnvironmentConfig;
