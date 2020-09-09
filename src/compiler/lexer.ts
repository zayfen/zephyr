
const EndTagReg = /<\/[a-zA-Z]+?[-a-zA-Z]*?(?<=[a-zA-Z])>/g
const BeginTagReg = /<[a-zA-Z][a-zA-z\-0-9]*[a-zA-Z0-9]/g

// utils
function isWhiteSpace (char: string): boolean {
  const whiteSpaceReg = /^\s+$/g
  return whiteSpaceReg.test(char)
}

function isAlpha (char: string): boolean {
  const alphaReg = /^[a-zA-Z]$/g
  return alphaReg.test(char)
}

function isNumber (char: string): boolean {
  const numberReg = /^\d+$/g
  return numberReg.test(char)
}

function startsWithBeginTag (str: string): boolean {
  let index = str.search(BeginTagReg)
  return index === 0
}

function isTagName (str: string): boolean {
  let lastCharIndex = str.length - 1
  return str.split("").every((val, index) => isAlpha || (val === '-' && index < lastCharIndex))
}



// iterator for scan source code
class Iterator {
  private source: string = ''
  private _position: number = -1
  private maxLength: number = 0
  private _done: boolean = false

  constructor (source: string) {
    this.source = source
    this.maxLength = source.length
  }

  public next (): [string, string] {
    this._position += 1 // forward

    if (this._position >= this.maxLength) {
      this._done = true
      return [null, null];
    }

    let char0 = this.source[this._position]
    let char1 = this._position + 1 >= this.maxLength ? null : this.source[this._position + 1]
    return [char0, char1]
  }

  // just return future string, position not modified
  public lookforward (num: number): string {
    let char0Position = this._position
    return this.source.slice(char0Position, char0Position + num)
  }

  public peekTo (reg: RegExp): string {
    let char0Position = this._position
    let sliceStr: string = this.source.slice(char0Position)
    let index = sliceStr.search(reg)
    return index === -1 ? sliceStr : sliceStr.slice(0, index)
  }


  /**
  ** return early matched regular
  **
  **/
  public earlyMatch (reg1: RegExp, reg2: RegExp): RegExp {
    let char0Position = this._position
    const sliceStr: string = this.source.slice(char0Position)
    const sourceLen: number = this.source.length

    let index1 = sliceStr.search(reg1)
    let index2 = sliceStr.search(reg2)

    index1 = index1 < 0 ? sourceLen : index1
    index2 = index2 < 0 ? sourceLen : index2

    return index1 <= index2 ? reg1 : reg2
  }

  // iterator done
  public get done (): boolean {
    return this._done
  }

  public get position () {
    return this._position
  }

  // reset
  public reset () {
    this._position = -1
    this._done = false
  }
}


interface TokenLocation {
  start: number,
  end: number
}

export enum TokenKind {
  TagBeginOpen = 'TAG-BEGIN-OPEN',                 // <div
  TagBeginClose = 'TAG-BEGIN-CLOSE',                // >
  TagEnd = 'TAG-END',                       // </div>
  AttrKey = 'TAG-ATTR-KEY',                         // (style)="xxxx"
  AttrValue = 'TAG-ATTR-VALUE',                       // style=("xxx")
  Equal = 'TAG-EQUAL',                           // =
  Comment = 'TAG-COMMENT',                       // // xxxxx
  Text = 'TAG-TEXT'
}

export interface Token {
  kind: TokenKind,
  value: string | number,                 // token value
  location: TokenLocation,
}

export default class Lexer  {
  private chars: Iterator = void 0
  private char0: string = ''
  private char1: string = ''

  private inTagBeginProcess: boolean = false

  constructor (source: string) {
    this.chars = new Iterator(source)
    let nextChars = this.chars.next()
    this.char0 = nextChars[0]
    this.char1 = nextChars[1]
  }

  peekTo (leftReg: RegExp): string {
    let s = this.chars.peekTo(leftReg)
    // 需用重新设置 char0 和 char1
    // Array.prototype.forEach.call({ length: s.length }, () => this.shift())
    let len = s.length
    while (len > 0) {
      this.shift()
      len -= 1
    }
    // console.log("peekTo char0: ", this.char0, "  ;char1: ", this.char1)
    return s
  }

  shift () {
    let chars = this.chars.next()
    this.char0 = chars[0]
    this.char1 = chars[1]
  }

  public get headChars () {
    return [this.char0, this.char1]
  }

  public lookforwad (num: number): string {
    if (num > 0) {
      return this.chars.lookforward(num)
    }
    return ''
  }


  public nextToken (): Token {

    while (!this.chars.done) {
      let [char0, char1] = this.headChars

      // is white space or reach end, do shift
      if (isWhiteSpace(char0)) {
        this.shift()
        continue
      }
      // console.log("char0: ", char0, " ;char1: ", char1)

      // now char0 is not whilte space character

      // <!--   xxxx -->
      if (char0 === '<' && char1 === '!') {
        let head = this.lookforwad(4)

        // <!--
        if (head[2] === '-' && head[3] === '-') {
          return this.parseComment()
        }

        return this.parseText()
      }

      // TagBenginOpen
      if (char0 === '<' && isAlpha(char1)) {
        this.inTagBeginProcess = true
        return this.parseTagBeginOpen()
      }

      // TagBeginClose
      if (char0 === '>') {
        this.inTagBeginProcess = false
        return this.parseTagBeginClose()
      }

      // TagEnd
      if (char0 === '<' && char1 === '/') {
        return this.parseTagEnd()
      }


      if (this.inTagBeginProcess) {
        // AttrKey
        if (isAlpha(char0)) {
          return this.parseAttrKey()
        }

        if (char0 === '=') {
          return this.parseEqual()
        }

        // it's a string value or number value
        if (char0 === '\'' || char0 === '\"' || isNumber(char0)) {
          return this.parseAttrValue()
        }

      } else {
        // is text
        return this.parseText()
      }


      // FIXME: no matched token, throw error
      throw new Error(`Can't recognise this token [${char0}, ${char1}]`)
    }

    return null
  }


  private parseTagBeginOpen (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.TagBeginOpen,
      value: '',
      location: loc
    }

    // now char0 is <, assume it tag open
    let tag = ''
    this.shift()
    // now char0 is available dom character
    let [char0, char1] = this.headChars

    while ((isAlpha(char0) || isNumber(char0) || char0 === '-') && char0 !== '>') {
      if (char0 === null) {
        throw new Error('parseTagBeginOpen Error: reach at source end but token not completed')
      }

      tag += char0

      this.shift()
      char0 = this.headChars[0]
      char1 = this.headChars[1]
    }

    loc.end = this.chars.position
    token.value = tag

    // treat div--div- as invalid tag
    if (!isTagName(token.value)) {
      throw new Error("invalid tag name: " + token.value)
    }

    return token
  }


  private parseTagBeginClose (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.TagBeginClose,
      value: '',
      location: loc
    }

    // now char0 is >, parse process finish, just move forward
    this.shift()
    loc.end = this.chars.position

    return token
  }

  private parseTagEnd (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.TagEnd,
      value: '',
      location: loc
    }


    // now char0 point to '<'
    this.shift()
    // now char0 point to '/'
    this.shift()
    // now char0 should point to alpha character
    let [char0, char1] = this.headChars
    let tag = ''
    while ((isAlpha(char0) || isNumber(char0) || char0 === '-') && char0 !== '>') {
      if (char0 === null) {
        throw new Error('')
      }
      tag += char0

      this.shift()
      char0 = this.headChars[0]
      char1 = this.headChars[1]
    }
    // now char0 point to '>', need move forward
    this.shift()

    token.value = tag
    token.location.end = this.chars.position
    return token
  }


  private parseAttrKey (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.AttrKey,
      value: '',
      location: loc
    }

    // now char0 is alpha
    let [char0, char1] = this.headChars
    let value = ''
    while (!isWhiteSpace(char0) && char0 !== '=') {
      if (char0 === null) {
        throw new Error('')
      }
      value += char0

      this.shift()
      char0 = this.headChars[0]
      char1 = this.headChars[1]
    }

    loc.end = this.chars.position
    token.value = value

    return token
  }


  private parseEqual (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.Equal,
      value: '=',
      location: loc
    }

    // now char0 point to '=', need forward
    this.shift()
    token.location.end = this.chars.position

    return token
  }

  private parseAttrValue (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.AttrValue,
      value: '',
      location: loc
    }

    // now char0 point to \', \" or number
    let [char0, char1] = this.headChars
    let value = ''
    if (isNumber(char0)) {
      while (isNumber(char0)) {
        value += char0
        this.shift()
        char0 = this.headChars[0]
      }

      token.value = parseInt(value, 10)

   } else {
     let quoteStart = char0
     this.shift()
     // now char0 is not quoteStart
     char0 = this.headChars[0]
     char1 = this.headChars[1]

     while (char0 !== quoteStart) {

       if (char0 === null) {
         throw new Error('Parse Attribute Value Error: reach end but token is not completed')
       }

       // 跳过转意的字符, 特别是 \${quoteStart}
       if (char0 === '\\') {
         value += [char0, char1].join('')
         this.shift()
         this.shift()
         char0 = this.headChars[0]
         char1 = this.headChars[1]
         continue
       }

       value += char0

       this.shift()
       char0 = this.headChars[0]
       char1 = this.headChars[1]
     }
     // now char0 point to ${quoteStart}, need to move forward
     this.shift()

     token.value = value
   }

    loc.end = this.chars.position
    return token
  }

  private parseComment (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.Comment,
      value: '',
      location: loc
    }

    // now char0 == '<' char1 == '!'
    this.shift()
    // now char0 == '!', char1 == '-'
    this.shift()
    // now char0 == '-', char1 == '-'
    this.shift()
    // now char0 == '-', char1 == 'x'
    this.shift()

    // now char0 point to begin of comment value
    let value = ''
    let [char0, char1] = this.headChars
    let forwardChars = this.lookforwad(3)

    while (!(forwardChars[0] === '-' && forwardChars[1] === '-' && forwardChars[2] === '>')) {
      if (char0 === null) {
        throw new Error("Parse Comment Error: read end but token not completed")
      }

      value += char0

      this.shift()
      char0 = this.headChars[0]
      char1 = this.headChars[1]

      forwardChars = this.lookforwad(3)
    }

    //  now char0 == '-' char1 == '-'
    this.shift()
    // now char0 == '-' char1 == '>'
    this.shift()
    // now char0 == '>' char1 == 'x'
    this.shift()

    // now char0 == 'x'
    token.value = value
    token.location.end = this.chars.position

    return token
  }


  private parseText (): Token {
    let loc: TokenLocation = {
      start: this.chars.position,
      end: this.chars.position
    }

    let token: Token = {
      kind: TokenKind.Text,
      value: '',
      location: loc
    }

    let [char0, char1] = this.headChars

    // find end postion </xxx>
    const reg = this.chars.earlyMatch(EndTagReg, BeginTagReg)
    let value = this.peekTo(reg)
    // console.log("parseText value: ", value)

    token.location.end = this.chars.position
    token.value = value
    return token
  }
}
