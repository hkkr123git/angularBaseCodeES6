/* -@-
 Copyright 2015, RapidValue Solutions
 Author:
 -@-*/
// @flow

class LoginController {
  username: string = 'Admin';
  password: string = 'welcome123';
  dataLoadingStatus: number;
  _$state: Object;

  /*@ngInject;*/
  constructor($state: Object) {
    this._$state = $state;
  }

  onLoginSubmit(): void {
    this.dataLoadingStatus = 0;
    this._$state.go('root.event');
  }
}

module.exports = LoginController;
