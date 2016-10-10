/* jshint ignore: start */
type AngularJSIterable = Object | Array<any>;
type AngularJSStringNumber = string | number;
type AngularJSDependencyDirectiveFunction = (...args: any) => Object;
type AngularJSDependencyControllerFunction = (...args: any) => void;
type AngularJSDependencyFactoryFunction = (...args: any) => void;
type AngularJSDependencyConfigOrRunFunction = (...args: any) => void;
type AngularJSCallbacksCssFunction = (index: number, value: string) => AngularJSStringNumber;
type AngularJSCallbacksIteratorFunction = (value: any, key: string | number) => void;

declare class AngularJSCallbacks {
  static css: AngularJSCallbacksCssFunction;
  static iterator: AngularJSCallbacksIteratorFunction;
}

declare class AngularJSJQueryLite {
  bind(eventType: string, handler: Function): AngularJSJQueryLite;
  css(properties: Object): AngularJSJQueryLite;
  css(propertyName: string): string;
  css(propertyName: string, propertyFunction: AngularJSCallbacks.css): AngularJSJQueryLite;
  css(propertyName: string, value: string): AngularJSJQueryLite;
  unbind(eventType: string): AngularJSJQueryLite;
  unbind(eventType: string, handler: Function): AngularJSJQueryLite;
}

declare class AngularJSModule {
  controller(name: string, dependencies: Array<AngularJSDependencyControllerFunction | string> | Class<T>): AngularJSModule;
  directive(name: string, directiveFactory: Array<AngularJSDependencyDirectiveFunction | string>): AngularJSModule;
  directive(name: string, directiveFactory: Function | Class<T>): AngularJSModule;
  directive(name: { name: Array<AngularJSDependencyDirectiveFunction | string> | Class<T> }): AngularJSModule;
  factory(name: string, providerFunction: Array<AngularJSDependencyFactoryFunction | string>): AngularJSModule;
  factory(name: string, providerFunction: AngularJSDependencyFactoryFunction): AngularJSModule;
  service(name: string, providerFunction: AngularJSDependencyFactoryFunction | Class<T>): AngularJSModule;
  value(name: string, object: any): AngularJSModule;
  constant(name: string, object: any): AngularJSModule;
  config(name: AngularJSDependencyConfigOrRunFunction): AngularJSModule;
  run(name: AngularJSDependencyConfigOrRunFunction): AngularJSModule;
  name: string;
}

declare class AngularJS {
  // copy(object: Object | Array): Object | Array;
  copy<T>(object: T): T;
  element(element: string | Element): AngularJSJQueryLite;
  extend<T>(dst: T, src: Object): T;
  forEach(obj: AngularJSIterable, iterator: AngularJSCallbacks.iterator): AngularJSIterable;
  forEach(obj: AngularJSIterable, iterator: AngularJSCallbacks.iterator, context: Object): AngularJSIterable;
  module(name: string, dependencies: Array<string>): AngularJSModule;
}

declare var angular: AngularJS;
