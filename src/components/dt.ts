
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'dt'

class Dt extends VNode {
  constructor () {
    super(TAG)
  }

}


class DtHTML extends LayoutNode<Dt> {

  constructor () {
    super(TAG)
  }

  render(node: Dt): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<dt id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</dt>`
  }
}


class DtWXML extends LayoutNode<Dt> {

  constructor () {
    super(TAG)
  }

  render(node: Dt): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class DtTheme extends ThemeNode<Dt> {

  constructor () {
    super(TAG)
  }

  inject(node: Dt): Dt {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Dt)
  assets.defineLayoutNode('html', new DtHTML)
  assets.defineLayoutNode('wxml', new DtWXML)
  assets.defineThemeNode('zephyr', new DtTheme)
}

  