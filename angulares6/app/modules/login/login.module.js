/*jshint browser: true*/
/*global angular: true*/
/*@flow*/

'use strict';

const LoginController = require('./login.controller');

const LoginModule = angular.module(
    'snsCmsApp.login',
    []
  )
  .controller('LoginController', LoginController);

module.exports = LoginModule;
