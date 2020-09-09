
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'label'

class Label extends VNode {
  constructor () {
    super(TAG)
  }

}


class LabelHTML extends LayoutNode<Label> {

  constructor () {
    super(TAG)
  }

  render(node: Label): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<label id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</label>`
  }
}


class LabelWXML extends LayoutNode<Label> {

  constructor () {
    super(TAG)
  }

  render(node: Label): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<label id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</label>`
  }

}

class LabelTheme extends ThemeNode<Label> {

  constructor () {
    super(TAG)
  }

  inject(node: Label): Label {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Label)
  assets.defineLayoutNode('html', new LabelHTML)
  assets.defineLayoutNode('wxml', new LabelWXML)
  assets.defineThemeNode('zephyr', new LabelTheme)
}

  