/* -@-
 Copyright 2015, RapidValue Solutions
 Author:
 -@-
*/
// @flow
class SideMenuController {
  open: boolean = false;

  /*@ngInject;*/
  constructor($scope: Object) {
    $scope.$on(this.onSidemenuChange);
  }

  onSidemenuChange (): void {
    this.open = !this.open;
  }

  closeMenu (): void {
    this.open = false;
  }
}

module.exports = SideMenuController;
