
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { makeZephyrWithInnerComponents } from '../../src/zephyr'
import { createElementFromHTML } from '../../src/utils/dom-utils'
import { LayoutNode, ThemeNode, VNode } from '../../src/core/prototype'
import { resolveAttributes, resolveClassList, resolveStyle } from '../../src/utils/node-utils'
import { ComponentAssets } from '../../src/core/component-assets'
import { VNodeManager } from '../../src/core/vnode-manager'


const zephyr = makeZephyrWithInnerComponents()

class MyComponent extends VNode {
  constructor () {
    super('my-component')
  }
}

class MyComponentLayout extends LayoutNode<MyComponent> {
  constructor () {
    super('my-component')
  }

  render(node: MyComponent): string {
    console.info("mycomponent.render: ", node)
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)
    return (`
      <ul id="${id}" style="${style}" class="${cls}" ${attrs}>
        ${node.children.map(child => child.render()).join('\n')}
      </ul>
    `)
  }
}

class MyComponentTheme extends ThemeNode<MyComponent> {
  constructor () {
    super('my-component')
  }

  inject(node: MyComponent): MyComponent {
    const themeClass = ['theme-class']
    themeClass.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

function install (assets: ComponentAssets): void {
  assets.defineVNode('my-component', MyComponent)
  assets.defineLayoutNode('html', new MyComponentLayout)
  assets.defineThemeNode('zephyr', new MyComponentTheme)
}


describe('render component', function () {
  it("render a component", function () {
    zephyr.use(install) // install MyComponent
    zephyr.useLayout('html')
    zephyr.useTheme('zephyr')

    // let viewTree = new MyComponent()
    // // 查找内部的组件
    // const liComponentClass = VNodeManager.getInstance().findVNodeByTag('li')
    // const textComponentClass = VNodeManager.getInstance().findVNodeByTag('__text__')

    // viewTree.append(new liComponentClass().append(new textComponentClass("item1")))
    // viewTree.append(new liComponentClass().append(new textComponentClass("item2")))

    // let rendered = zephyr.render(viewTree)
    // console.log('rendered: ', rendered)

    const template = "<div><my-component class=\"test1 test2\"><li>Item1</li><li>Item2</li></my-component></div>"
    let ast = zephyr.renderTemplate(template)
    console.log("**** ast.children : ", ast.children)
    console.log("*** ast: ", zephyr.render(ast))
  })
})
