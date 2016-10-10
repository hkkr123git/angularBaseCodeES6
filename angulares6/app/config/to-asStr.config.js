/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-*/
/*@flow*/

/*@ngInject;*/
const ToAStrConfig = (toastrConfig: Object): void => {
  angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: '.wrapper-all'
  });
}

module.exports = ToAStrConfig;
