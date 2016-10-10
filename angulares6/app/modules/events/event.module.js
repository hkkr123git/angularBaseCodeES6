/* -@-
 Copyright 2016, RapidValue Solutions
 Author: eldho.alias@rapidvaluesolutions.com
 -@-*/
/*@flow*/
const AppConfigModule = require('../../utils/appConfig.module');
const EventService = require('./event.service');

const EventModule = angular
  .module('snsCmsApp.event.module', [ AppConfigModule.name])
  .service('eventService', EventService);

module.exports = EventModule;
