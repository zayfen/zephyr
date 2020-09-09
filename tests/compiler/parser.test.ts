
import { describe, it } from 'mocha'
import { expect } from 'chai'

import { Parser } from '../../src/compiler/parser'


describe('parser', function () {
  it('simple template', function () {
    const template = '<div></div>'
    const parser = new Parser(template)
    const ast = parser.parse()

    expect('div').eq(ast.tag)
  })

  it('template with attributes', function () {
    const template = '<div style="background-color: #fff" class="demo"></div>'
    const parser = new Parser(template)
    const ast = parser.parse()

    expect('div').eq(ast.tag)

    const expectAttrs = { 'style': 'background-color: #fff', 'class': 'demo' }

    const actualAttrs = ast.attrs.reduce((prevValue: any, curr: any) => {
      prevValue[curr.key] = curr.value
      return prevValue
    }, {})

    expect(expectAttrs.style).eq(actualAttrs.style)
    expect(expectAttrs['class']).eq(actualAttrs['class'])
  })

  it('template with children', function () {
    const template = '<div><span></span></div>'
    const parser = new Parser(template)
    const ast = parser.parse()

    expect('div').eq(ast.tag)
    expect('span').eq(ast.children[0].tag)
  })

  it('template with text', function () {
    const template = '<div>I am a text!</div>'
    const parser = new Parser(template)
    const ast = parser.parse()

    expect('div').eq(ast.tag)
    expect('I am a text!').eq(ast.children[0].text)
  })


  it('template with comment', function () {
    const template = '<div><!--I am a comment!--></div>'
    const parser = new Parser(template)
    const ast = parser.parse()

    expect('div').eq(ast.tag)
    expect(0).eq(ast.children.length)
  })

})
