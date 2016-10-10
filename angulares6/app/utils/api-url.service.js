/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-
*/
/*@flow*/
'use strict';

class AppURLService {
  _webServiceURL: Object;

  /*@ngInject;*/
  constructor(webServiceURL: Object) {
    this._webServiceURL = webServiceURL;
  }

  getBaseURL(): string {
      return this._webServiceURL.BASE_URL;
  }

  getLoginURL(): string {
      return this.getBaseURL() + this._webServiceURL.login.loginUrl;
  }
}

module.exports = AppURLService;
