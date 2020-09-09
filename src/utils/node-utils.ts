import { IVNode } from '../core/prototype';
import { camelCase2kebabCase, splitCssPropertyValue } from './string-utils';


export  function resolveClassList (node: IVNode): string {
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

export function resolveAttributes (node: IVNode): string {
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

export function resolveStyle (node: IVNode): string {
  let keys = Object.keys(node.style);
  return keys.reduce((prev, curr) => {
    // 需要对style做尺寸转换
    let styleValue: string|number = node.style[curr];
    let styleValueArr = splitCssPropertyValue(<string> styleValue);
    // translate layout size
    let isVariable: boolean = curr.slice(0, 2) === '--' // css var, don't translate, e.g. :root { --scale-factor: 1 }
    if (node.layoutNode.hasSizeTranslator() && !isVariable) {
      let translator = node.layoutNode.sizeTranslator()
      styleValue = styleValueArr.map((value: string | number) => {
        if (typeof value === 'number') {
          return translator ? translator.translate(value) + translator.unit : value
        }
        return value
      }).join(' ')
    }

    return prev + camelCase2kebabCase(curr) + ':' + styleValue + ';';
  }, '');
}


export function setStyle (node: IVNode, styleKey: string, styleValue: string|number) {
  node.style[styleKey] = styleValue;
}


export function splitStyleStr2Styles (style: string): { [key: string]: string } {
  let styles: {[key: string]: string } = {}

  style.split(';').forEach((kv: string) => {
    let [key, value] = kv.split(':')
    if (!!key?.trim() && !!value?.trim()) {
      styles[key.trim()] = value?.trim()
    }
  })
  return styles
}


export function makeMap (str: string): ( _: string) => boolean {
  const map = Object.create(null)
  str.split(',').forEach(field => map[field] = true)
  return (val: string) => map[val]
}

export const isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
)


export const isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
)


export const isReservedTag = (tag: string) => isHTMLTag(tag) || isSVG(tag)
