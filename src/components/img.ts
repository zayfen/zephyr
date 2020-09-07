
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'img'

class Img extends VNode {
  constructor () {
    super(TAG)
  }

}


class ImgHTML extends LayoutNode<Img> {

  constructor () {
    super(TAG)
  }

  render(node: Img): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<img>${childrenRendered} </img>`
  }
}


class ImgWXML extends LayoutNode<Img> {

  constructor () {
    super(TAG)
  }

  render(node: Img): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<image>${childrenRendered} </image>`
  }

}

class ImgTheme extends ThemeNode<Img> {

  constructor () {
    super(TAG)
  }

  inject(node: Img): Img {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Img)
  assets.defineLayoutNode('html', new ImgHTML)
  assets.defineLayoutNode('wxml', new ImgWXML)
  assets.defineThemeNode('zephyr', new ImgTheme)
}

  