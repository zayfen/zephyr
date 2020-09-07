
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'iframe'

class Iframe extends VNode {
  constructor () {
    super(TAG)
  }

}


class IframeHTML extends LayoutNode<Iframe> {

  constructor () {
    super(TAG)
  }

  render(node: Iframe): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<iframe>${childrenRendered} </iframe>`
  }
}


class IframeWXML extends LayoutNode<Iframe> {

  constructor () {
    super(TAG)
  }

  render(node: Iframe): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<web-view>${childrenRendered} </web-view>`
  }

}

class IframeTheme extends ThemeNode<Iframe> {

  constructor () {
    super(TAG)
  }

  inject(node: Iframe): Iframe {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Iframe)
  assets.defineLayoutNode('html', new IframeHTML)
  assets.defineLayoutNode('wxml', new IframeWXML)
  assets.defineThemeNode('zephyr', new IframeTheme)
}

  