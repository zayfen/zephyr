
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'form'

class Form extends VNode {
  constructor () {
    super(TAG)
  }

}


class FormHTML extends LayoutNode<Form> {

  constructor () {
    super(TAG)
  }

  render(node: Form): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<form>${childrenRendered} </form>`
  }
}


class FormWXML extends LayoutNode<Form> {

  constructor () {
    super(TAG)
  }

  render(node: Form): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<form>${childrenRendered} </form>`
  }

}

class FormTheme extends ThemeNode<Form> {

  constructor () {
    super(TAG)
  }

  inject(node: Form): Form {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Form)
  assets.defineLayoutNode('html', new FormHTML)
  assets.defineLayoutNode('wxml', new FormWXML)
  assets.defineThemeNode('zephyr', new FormTheme)
}

  