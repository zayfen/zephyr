import Lexer from './lexer'
import { Parser } from './parser'

const dom =(`
<div style="background: red" data-url="https://www.zayfen.com" class="test-class">
<!--  Im comment -->
    <p color="red">Hello<!-- Im text --> World</p>
    I'm OK!
    <span-custom onclick="onSpanClick">Im Span</span-custom>
    <grid-1 class="zephyr-component" style="display: block;width: 100%;height: 100vh;">
        <a href="https://www.zayfen.com"> Click Me</a>
    </grid-1>
</div>
`)

// let lexer = new Lexer(dom)


// let token = lexer.nextToken()
// while (token !== null) {
//   console.log(token)
//   token = lexer.nextToken()
// }

// test parser
let parser = new Parser(dom)
let ast = parser.parse()
console.log("\n=======\n")
console.log(JSON.stringify(ast))
