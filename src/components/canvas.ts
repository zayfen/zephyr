
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


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
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<canvas>${childrenRendered} </canvas>`
  }
}


class CanvasWXML extends LayoutNode<Canvas> {

  constructor () {
    super(TAG)
  }

  render(node: Canvas): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<canvas>${childrenRendered} </canvas>`
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

  