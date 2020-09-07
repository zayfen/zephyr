
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'section'

class Section extends VNode {
  constructor () {
    super(TAG)
  }

}


class SectionHTML extends LayoutNode<Section> {

  constructor () {
    super(TAG)
  }

  render(node: Section): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<section>${childrenRendered} </section>`
  }
}


class SectionWXML extends LayoutNode<Section> {

  constructor () {
    super(TAG)
  }

  render(node: Section): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<view>${childrenRendered} </view>`
  }

}

class SectionTheme extends ThemeNode<Section> {

  constructor () {
    super(TAG)
  }

  inject(node: Section): Section {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Section)
  assets.defineLayoutNode('html', new SectionHTML)
  assets.defineLayoutNode('wxml', new SectionWXML)
  assets.defineThemeNode('zephyr', new SectionTheme)
}

  