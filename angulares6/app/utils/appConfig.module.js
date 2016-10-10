/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-
*/
/*@flow*/
'use strict';

const AppURLService = require('./api-url.service');
const ToAStrConfig = require('../config/to-asStr.config');
const WebServiceURLConstant = require('./webservice-url.constant');

/*@ngInject;*/
const DisableGlobalAnimation = ($animate): void => {
  $animate.enabled(false);
}

const AppConfig =
  angular.module('appConfig.module', ['toastr'])
    .constant('webServiceURL', WebServiceURLConstant)
    .constant('jQuery', jQuery)
    .constant('moment', moment)
    .config(ToAStrConfig)  // toastr config
    .run(DisableGlobalAnimation)
    .service('apiURLService', AppURLService);

module.exports = AppConfig;
