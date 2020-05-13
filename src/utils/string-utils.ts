

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
