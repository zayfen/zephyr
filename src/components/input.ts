
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'input'

class Input extends VNode {
  constructor () {
    super(TAG)
  }

}


class InputHTML extends LayoutNode<Input> {

  constructor () {
    super(TAG)
  }

  render(node: Input): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<input id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</input>`
  }
}


class InputWXML extends LayoutNode<Input> {

  constructor () {
    super(TAG)
  }

  render(node: Input): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<input id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</input>`
  }

}

class InputTheme extends ThemeNode<Input> {

  constructor () {
    super(TAG)
  }

  inject(node: Input): Input {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Input)
  assets.defineLayoutNode('html', new InputHTML)
  assets.defineLayoutNode('wxml', new InputWXML)
  assets.defineThemeNode('zephyr', new InputTheme)
}

  