import Lexer from './index'


const dom =(`<div style="background: red" data-url="https://www.zayfen.com" >
 <p color="red">Hello World</p>
 I'm OK!
</div>
`)

let lexer = new Lexer(dom)

let token = lexer.nextToken()
while (token !== null) {
  console.log(token)
  token = lexer.nextToken()
}
