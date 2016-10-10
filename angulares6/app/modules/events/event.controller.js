/* -@-
  Copyright 2016, Sweets N' Salt
  Author: ea@sweetsnsalt.com
 -@-*/
/*@flow*/

class EventController {
  _$state: Object;
  isEvent1Checked: boolean = true;
  isEvent2Checked: boolean = false;
  isEvent3Checked: boolean = true;
  isEvent4Checked: boolean = true;
  isEvent1Published: boolean = true;

  /*@ngInject;*/

  constructor($scope: Object, $state: Object, eventService: Object) {
    this._$state = $state;
  }

  getHeaderStripData (): Object {
      return {
          title: 'Events',
          backButton: false
      };
  }

  onAddEventClick (): void {

  }

  getEventStatusText (eventStatus: boolean): string {
    let status = 'INACTIVE';
    if (eventStatus) {
      status = 'ACTIVE';
    }
    return status;
  }
}

const EventControllerModule =
  angular
    .module('snsCmsApp.event.controller', [])
    .controller('EventController', EventController);

module.exports = EventControllerModule;
