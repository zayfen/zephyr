// common types

export interface Clazz<T> extends Function {
  new (...args: any[]): T;
}
