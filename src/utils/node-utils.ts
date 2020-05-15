import { Node } from '../core/prototype';
import { camelCase2kebabCase, splitCssPropertyValue } from './string-utils';


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
    // let validAttrList: string[] = node.attrWhiteList ? node.attrWhiteList : Object.keys(node.attrList);
    // if (!validAttrList || !Array.isArray(validAttrList)) {
    //   return '';
    // }
    let validAttrList: string[] = Object.keys(node.attrList).filter(key => key.slice(0,2) !== '__');
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
      // 需要对style做尺寸转换
      let styleValue: string|number = node.style[curr];
      let styleValueArr = splitCssPropertyValue(<string> styleValue);
      // translate layout size
      if (node.layoutNode.sizeTranslatorHolder.translator) {
        let translator = node.layoutNode.sizeTranslatorHolder.translator;
        styleValue = styleValueArr.map((value: string | number) => {
          if (typeof value === 'number') {
            return translator.translate(value) + translator.unit;
          }
          return value;
        }).join(' ');
      }

      return prev + camelCase2kebabCase(curr) + ':' + styleValue + ';';
    }, '');
  }


  export function setStyle (node: Node, styleKey: string, styleValue: string|number) {
    node.style[styleKey] = styleValue;
  }
