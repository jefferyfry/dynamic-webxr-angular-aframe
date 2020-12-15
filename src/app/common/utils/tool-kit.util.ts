// tslint:disable no-bitwise
// import { ROUTING_SCALING_FACTOR } from './routing/path-finding.service';
// import * as Path from 'paths-js/path';

/**
 * Utility pathing and routing service
 */

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ID} from "../types/id.type";

export enum LOG_LEVEL {
  'LOG',
  'ERROR'
}

// @internal
export let __DEV__ = true;
// @internal
export let __LOG__: LOG_LEVEL = LOG_LEVEL.ERROR;

export function enableDiagramProdMode(): void {
  __DEV__ = false;
}

// @internal
export function setLogLevel(level: LOG_LEVEL): void {
  __LOG__ = level;
}

// @internal
export function isDev(): boolean {
  return __DEV__;
}

// @internal
export function log(message: string, level: LOG_LEVEL = LOG_LEVEL.LOG, ...args: any[]): void {
  if (isDev() && __LOG__ === level) {
    if (__LOG__ === LOG_LEVEL.ERROR) {
      console.error(message, ...args);
    }
    console.log(message, ...args);
  }
}

/**
 * rxjs log operator
 * @internal
 */
export function withLog(message: string, level: LOG_LEVEL = LOG_LEVEL.LOG, ...args: any) {
  return <T>(source: Observable<T>) => (isDev() ? source.pipe(tap(val => log(message, level, val, ...args))) : source);
}

/**
 * Generates a unique ID
 */
export function UID(): ID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isArray<T>(val: any): val is T[] {
  return Array.isArray(val);
}

export function isString(val: any): val is string {
  return typeof val === 'string';
}

export function isFunction(val: any): val is (...args: any) => any {
  return typeof val === 'function';
}

// @internal
export function isNil(v: any) {
  return v === null || v === undefined;
}

export function coerceArray<T>(value: T | T[]): T[] {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export function mapToArray<T>(map: { [key: string]: T }): T[] {
  const result = [];
  for (const key in map) {
    if (!isNil(map[key])) {
      result.push(map[key]);
    }
  }

  return result;
}
