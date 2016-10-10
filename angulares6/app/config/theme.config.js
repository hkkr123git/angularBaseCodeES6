/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-*/
/*@flow*/

/*@ngInject;*/
const ThemeConfig = ($mdThemingProvider: Object): void => {
  $mdThemingProvider.theme('appTheme')
  .primaryPalette('blue')
  .accentPalette('blue');
}

module.exports = ThemeConfig;
