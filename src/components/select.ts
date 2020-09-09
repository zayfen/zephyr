
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


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
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<select id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</select>`
  }
}


class SelectWXML extends LayoutNode<Select> {

  constructor () {
    super(TAG)
  }

  render(node: Select): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
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

  