
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'select'

class Select extends VNode {
  constructor () {
    super(TAG)
  }

}


class SelectHTML extends LayoutNode<Select> {

  constructor () {
    super(TAG)
  }

  render(node: Select): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<select>${childrenRendered} </select>`
  }
}


class SelectWXML extends LayoutNode<Select> {

  constructor () {
    super(TAG)
  }

  render(node: Select): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class SelectTheme extends ThemeNode<Select> {

  constructor () {
    super(TAG)
  }

  inject(node: Select): Select {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Select)
  assets.defineLayoutNode('html', new SelectHTML)
  assets.defineLayoutNode('wxml', new SelectWXML)
  assets.defineThemeNode('zephyr', new SelectTheme)
}

  