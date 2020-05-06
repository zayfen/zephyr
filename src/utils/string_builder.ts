

export class StringBuilder {
  private strings: string[] = [];
  constructor (str?: string) {
    if (str) {
      this.strings.push(str);
    }
  }

  public append (str: string): StringBuilder {
    this.strings.push(str);
    return this;
  }

  public appendLine (line: string): StringBuilder {
    this.append('\n' + line);
    return this;
  }

  public reset (): StringBuilder {
    this.strings.length = 0;
    return this;
  }

  public str (): string {
    return this.strings.join('');
  }
}
