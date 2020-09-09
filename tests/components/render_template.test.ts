
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { makeZephyrWithInnerComponents } from '../../src/zephyr'
import { createElementFromHTML } from '../../src/utils/dom-utils'


const zephyr = makeZephyrWithInnerComponents()

describe('render template', function () {
  it('simple template', function () {
    const template = '<div></div>'
    zephyr.useLayout('html')
    zephyr.useTheme('zephyr')

    let root = zephyr.renderTemplate(template)
    console.log("simple template: ", root)
    expect('div').to.eq(root.tag)

    let rendered = zephyr.render(root)
    const expectRegExp: RegExp = /<div\s+id="[a-zA-Z0-9\-]+?"\s+?style=".*?"\s+?class="zephyr-component zephyr-div"\s*>\s*?<\/div>/g
    expect(rendered.trim()).to.match(expectRegExp)
  })


  it('template with children', function () {
    const template = '<div><span></span></div>'

    zephyr.useLayout('html')
    zephyr.useTheme('zephyr')

    let root = zephyr.renderTemplate(template)
    expect('div').to.eq(root.tag)
    expect('span').to.eq(root.children[0].tag)

    let rendered = zephyr.render(root)
    console.log('template with children: ', rendered)
    expect(rendered).to.contains('span')
    expect(rendered).to.contains('</span>')
  })

})
