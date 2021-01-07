
import { describe, it } from 'mocha'
import { expect } from 'chai'

import Lexer from '../../src/compiler/lexer'

describe('lexer', function () {
  it('simple template', function () {
    const template = '<div></div>'
    const lexer = new Lexer(template)
    expect('TAG-BEGIN-OPEN').equal(lexer.nextToken().kind)
    expect('TAG-BEGIN-CLOSE').equal(lexer.nextToken().kind)
    expect('TAG-END').equal(lexer.nextToken().kind)
    expect(null).equal(lexer.nextToken())
  })

  it('template with attribute', function () {
    const template = '<div style="background-color: #ffff;" class="cls1 cls2" data-id="123"></div>'
    const lexer = new Lexer(template)

    expect('TAG-BEGIN-OPEN').equal(lexer.nextToken().kind)
    expect('TAG-ATTR-KEY').equal(lexer.nextToken().kind)
    expect('TAG-EQUAL').equal(lexer.nextToken().kind)
    expect('TAG-ATTR-VALUE').equal(lexer.nextToken().kind)


    expect('TAG-ATTR-KEY').equal(lexer.nextToken().kind)
    expect('TAG-EQUAL').equal(lexer.nextToken().kind)
    expect('TAG-ATTR-VALUE').equal(lexer.nextToken().kind)

    expect('TAG-ATTR-KEY').equal(lexer.nextToken().kind)
    expect('TAG-EQUAL').equal(lexer.nextToken().kind)
    expect('TAG-ATTR-VALUE').equal(lexer.nextToken().kind)

    expect('TAG-BEGIN-CLOSE').equal(lexer.nextToken().kind)
    expect('TAG-END').equal(lexer.nextToken().kind)

    expect(null).equal(lexer.nextToken())
  })

  it('template with children', function () {
    const template = '<div style="background-color: #fff"><span></span></div>'
    const lexer = new Lexer(template)

    const expects = ['TAG-BEGIN-OPEN', 'TAG-ATTR-KEY', 'TAG-EQUAL', 'TAG-ATTR-VALUE',
                     'TAG-BEGIN-CLOSE', 'TAG-BEGIN-OPEN', 'TAG-BEGIN-CLOSE', 'TAG-END', 'TAG-END']
    expects.forEach((expectValue: string) => {
      expect(expectValue).equal(lexer.nextToken().kind)
    })

    expect(null).equal(lexer.nextToken())

  })

  it('template with text', function () {
    const template = '<div style="background-color: #fff">I am text!</div>'
    const lexer = new Lexer(template)

    const expects = ['TAG-BEGIN-OPEN', 'TAG-ATTR-KEY', 'TAG-EQUAL', 'TAG-ATTR-VALUE',
                     'TAG-BEGIN-CLOSE', 'TAG-TEXT', 'TAG-END']
    expects.forEach((expectValue: string) => {
      let token = lexer.nextToken()
      expect(expectValue).equal(token.kind)
      if (token.kind === 'TAG-TEXT') {
        expect('I am text!').equal(token.value)
      }
    })

    expect(null).equal(lexer.nextToken())

  })

  it('tempalte with comment', function () {
    const template = '<div style="background-color: #fff"><!-- hello --> </div>'
    const lexer = new Lexer(template)

    const expects = ['TAG-BEGIN-OPEN', 'TAG-ATTR-KEY', 'TAG-EQUAL', 'TAG-ATTR-VALUE',
                     'TAG-BEGIN-CLOSE', 'TAG-COMMENT', 'TAG-END']

    expects.forEach((expectValue: string) => {
      let token = lexer.nextToken()
      expect(expectValue).equal(token.kind)
      if (token.kind === 'TAG-COMMENT') {
        expect(' hello ').equal(token.value)
      }
    })

    expect(null).equal(lexer.nextToken())

  })

})
