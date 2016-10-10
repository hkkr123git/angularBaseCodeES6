/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-*/
/*@flow*/

/*@ngInject;*/
const DebugConfig = ($compileProvider: Object): void => {
  $compileProvider.debugInfoEnabled(false);
}

module.exports = DebugConfig;
