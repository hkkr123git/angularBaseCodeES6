/* -@-
 Copyright 2016, RapidValue Solutions
 Author: eldho.alias@rapidvaluesolutions.com
 -@-*/
///*@flow*/

class DialogController {
  _$scope: Object;
  _$mdDialog: Object;
  isTicketChecked: boolean = true;

  /*@ngInject;*/

  constructor($scope: Object, $mdDialog: Object) {
    this._$scope = $scope;
    this._$mdDialog = $mdDialog;
  }

  hide() : void {
    this._$mdDialog.hide();
  }

  cancel() : void {
    this._$mdDialog.cancel();
  }

  answer(response: Object): void {
    this._$mdDialog.hide(response);
  }

}

// const DialogControllerModule =
//   angular
//     .module('camApp.common.dialog.controller', [])
//     .controller('DialogController', DialogController);

module.exports = DialogController;
