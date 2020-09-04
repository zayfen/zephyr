import Lexer, { TokenKind, Token } from './lexer'
 import { AST } from './ast'

let suspendTokens: Array<Token> = []

function tryConsumeSuspendToken(): { token: Token, restore: () => void } {
  if (suspendTokens.length <= 0) {
    return null
  }

  let token = suspendTokens.shift()
  return {
    token,
    restore: function() {
      suspendTokens.unshift(token)
    }
  }
}



export class Parser {
  private lexer: Lexer = null
  private ast: AST = null
  private nodeStack: Array<AST> = []

  constructor(source: string) {
    this.lexer = new Lexer(source)
  }

  private currentNode (): AST {
    if (this.nodeStack.length <= 0) {
      return null
    }

    return this.nodeStack[this.nodeStack.length-1]
  }

  private match(...tokenKinds: Array<TokenKind>): void {
    let token: Token = this.lexer.nextToken()

    if (token === null) {
      return void 0;
    }

    let index = tokenKinds.indexOf(token.kind)
    if (index === -1) {
      throw new Error(`match error: need tokens ${tokenKinds}, but found ${token.kind}`)
    }

    switch (token.kind) {

      // 匹配注释
      case TokenKind.Comment: {
        // ignore comment
        this.match(...tokenKinds)
        break
      }

        // 匹配 <xxxx
      case TokenKind.TagBeginOpen: {

        console.log("TagBeginOpen: ", token)

        let node: AST = { tag: token.value as string, attrs: [], children: [] }

        if (this.ast === null) {
          this.ast = node
        } else {
          // now top node of nodeStack is parent of node
          this.currentNode().children.push(node)
        }

        this.nodeStack.push(node)
        this.match(TokenKind.AttrKey, TokenKind.TagBeginClose)
        break
      }

        // 匹配 >
      case TokenKind.TagBeginClose: {
        this.match(TokenKind.Comment, TokenKind.TagBeginOpen, TokenKind.Text, TokenKind.TagEnd)
        break
      }


      case TokenKind.AttrKey: {
        this.currentNode().attrs.push({ key: token.value as string, value: true })
        this.match(TokenKind.Equal, TokenKind.AttrKey, TokenKind.TagBeginClose)
        break
      }

      case TokenKind.Equal: {
        this.match(TokenKind.AttrValue)
        break
      }

      case TokenKind.AttrValue: {
        let attrsLen = this.currentNode().attrs.length
        this.currentNode().attrs[attrsLen-1].value = token.value
        this.match(TokenKind.AttrKey, TokenKind.TagBeginClose)
        break
      }

      case TokenKind.TagEnd: {
        // check tag name
        let top =  this.nodeStack.pop()
        if (top.tag !== token.value) {
          throw new Error("tag-begin not match tag-end: " + `${top.tag} !== ${token.value} `)
        }
        this.match(TokenKind.TagBeginOpen, TokenKind.TagEnd, TokenKind.Comment, TokenKind.Text)
        break
      }

      case TokenKind.Text: {
        let textNode: AST = {
          tag: '',
          attrs: [],
          children: [],
          text: token.value as string,
          isText: true
        }
        this.currentNode().children.push(textNode)
        this.match(TokenKind.TagBeginOpen, TokenKind.TagEnd, TokenKind.Comment)
        break
      }
    }


  }

  public parse(): AST {
    // 开头可能是注释或者<xxx
    this.match(TokenKind.Comment, TokenKind.TagBeginOpen)
    return this.ast
  }
}
