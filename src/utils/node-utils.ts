import { Node } from '../core/proptype';
import { camelCase2kebabCase } from './string-utils';

export  function resolveClassList (node: Node): string {
    let finalClassList: string[] = [];
    node.classList.forEach(cls => {
      if (finalClassList.indexOf(cls.trim()) === -1) {
        finalClassList.push(cls);
      }
    })

    node.customClassList.forEach(cls => {
      if (finalClassList.indexOf(cls) === -1) {
        finalClassList.push(cls);
      }
    })

    return finalClassList.join(' ');
  }

  export function resolveAttributes (node: Node): string {
    let validAttrList: string[] = node.attrWhiteList ? node.attrWhiteList : Object.keys(node.attrList);
    if (!validAttrList || !Array.isArray(validAttrList)) {
      return '';
    }

    let attributes = validAttrList.reduce((prev: string, curr: string) => {
      if (node.attrList.hasOwnProperty(curr)) {
        let val: string|number = node.attrList[curr];
        if (typeof val === 'string') {
          val = '\"' + encodeURIComponent(val) + '\"';
        }
        return `${prev} ${curr}=${val}`;
      }
      return prev;
    }, '');

    return attributes;
  }

  export function resolveStyle (node: Node): string {
    let keys = Object.keys(node.style);
    return keys.reduce((prev, curr) => {
      return prev + camelCase2kebabCase(curr) + ':' + node.style[curr] + ';';
    }, '');
  }


  export function setStyle (node: Node, styleKey: string, styleValue: string|number) {
    node.style[styleKey] = styleValue;
  }
