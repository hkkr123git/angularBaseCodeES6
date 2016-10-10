/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-
*/
/*@flow*/
'use strict';

class WebServiceURLConstant {
  BASE_URL: string = 'test/mockData/';
  BASE_URL_DEV: string = 'http://test/';
  common: Object = {};
  login: Object = {
      loginUrl : 'login'
  };
  constructor() {
  }
}

module.exports = WebServiceURLConstant;
