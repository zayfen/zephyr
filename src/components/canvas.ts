
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


const TAG = 'canvas'

class Canvas extends VNode {
  constructor () {
    super(TAG)
  }

}


class CanvasHTML extends LayoutNode<Canvas> {

  constructor () {
    super(TAG)
  }

  render(node: Canvas): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<canvas id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</canvas>`
  }
}


class CanvasWXML extends LayoutNode<Canvas> {

  constructor () {
    super(TAG)
  }

  render(node: Canvas): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<canvas id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</canvas>`
  }

}

class CanvasTheme extends ThemeNode<Canvas> {

  constructor () {
    super(TAG)
  }

  inject(node: Canvas): Canvas {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Canvas)
  assets.defineLayoutNode('html', new CanvasHTML)
  assets.defineLayoutNode('wxml', new CanvasWXML)
  assets.defineThemeNode('zephyr', new CanvasTheme)
}

  