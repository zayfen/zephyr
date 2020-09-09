
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'h5'

class H5 extends VNode {
  constructor () {
    super(TAG)
  }

}


class H5HTML extends LayoutNode<H5> {

  constructor () {
    super(TAG)
  }

  render(node: H5): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<h5 id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</h5>`
  }
}


class H5WXML extends LayoutNode<H5> {

  constructor () {
    super(TAG)
  }

  render(node: H5): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</view>`
  }

}

class H5Theme extends ThemeNode<H5> {

  constructor () {
    super(TAG)
  }

  inject(node: H5): H5 {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, H5)
  assets.defineLayoutNode('html', new H5HTML)
  assets.defineLayoutNode('wxml', new H5WXML)
  assets.defineThemeNode('zephyr', new H5Theme)
}

  