

export class StringBuilder {
  private strings: string[] = [];
  private indent: number = 0;
  constructor (str?: string) {
    if (str) {
      this.strings.push(str);
    }
  }

  private indentStr (additionalIndent: number = 0): string {
    let s = '';
    for (let i = 0; i < this.indent + additionalIndent; i++) {
      s += ' ';
    }
    return s;
  }

  public setIndent (indent: number) {
    this.indent = indent;
  }

  public append (str: string, additionalIndent: number = 0): StringBuilder {
    this.strings.push(this.indentStr(additionalIndent) + str);
    return this;
  }

  public appendLine (line: string, additionalIndent: number = 0): StringBuilder {
    this.append(line + '\n', additionalIndent);
    return this;
  }

  public reset (): StringBuilder {
    this.strings.length = 0;
    this.indent = 0;
    return this;
  }

  public str (): string {
    return this.strings.join('');
  }
}


export function camelCase2kebabCase (camelCase: string): string {
  return camelCase.split('').reduce((prevValue, currValue) => {
    return (currValue >= 'A' && currValue <= 'Z') ? prevValue + '-' + currValue.toLowerCase() : prevValue + currValue;
  }, '');
}


/**
 * 尝试将字符串转换成数字
 * @param s {string}
 */
function tryConvertStringToNumber (s: string | number): number | string {
  let number: number | string = s;
  let r: number = parseFloat(s as string);
  if (!isNaN(r)) {
    number = r;
  }
  return number;
}


export function trim (s: string, chars: string): string {
  // step1: trim spaces
  s = ('' + s).trim()

  // step2: trim specified chars
  let leftBoundary: number = 0;
  let rightBoundary: number = s.split('').length - 1;
  let reachLeftBoundary: boolean = false;
  let reachRightBoundary: boolean = false;

  while (leftBoundary <= rightBoundary) {
    reachLeftBoundary = reachLeftBoundary || chars.indexOf(s.charAt(leftBoundary)) === -1;
    reachRightBoundary = reachRightBoundary || chars.indexOf(s.charAt(rightBoundary)) === -1;
    if (reachLeftBoundary && reachRightBoundary) {
      break;
    }
    !reachLeftBoundary && leftBoundary++;
    !reachRightBoundary && rightBoundary--;
  }

  return s.slice(leftBoundary, rightBoundary + 1);
}


export function isspace (char: string): boolean {
  let charCode = char.charCodeAt(0);
  const WhiteSpaceCharCode = [9, 10, 11, 12, 13, 32, 133, 160];
  return WhiteSpaceCharCode.indexOf(charCode) > -1;
}

type TPropertyAsArray = Array<string | number>;

/**
 * 将css属性转换成数组形式
 * @param propValue { string }
 */
export function splitCssPropertyValue (propValue: string): TPropertyAsArray {
  let result: TPropertyAsArray = [];
  propValue = trim(propValue, ';  ');
  let start: number = 0; // always point to valid char (not space char)
  let forward: number = start;
  while (forward < propValue.length) {
    if (propValue.charAt(forward) === '(') {
      // forward to paired ')'
      let fforward = forward + 1;
      let depth = 1;
      while (fforward < propValue.length) {
        if (propValue.charAt(fforward) === '(') {
          depth++;
        } else if (propValue.charAt(fforward) === ')') {
          depth--;
        }

        if (depth === 0) {
          // find paired ')'
          forward = fforward;
          break;
        }
        fforward++;
      }

      if (depth !== 0) {
        throw new Error('[splitCssPropertyValue error] invalid propValue: ' + propValue);
      }
    }

    if (isspace(propValue.charAt(forward)) || forward === propValue.length - 1) {
      // found a section, pick section string, and step next section
      if (forward === propValue.length - 1) {
        forward++;
      }
      let value = propValue.slice(start, forward).trim() as string
      // check if is percent number
      let isPercentFmt = value[value.length-1] === '%' // 百分比不转换
      result.push(isPercentFmt ? value : tryConvertStringToNumber(value));
      while (forward < propValue.length && isspace(propValue.charAt(forward))) {
        forward++;
      }
      start = forward;
      continue;
    }

    forward++;
  }

  return result;
}
