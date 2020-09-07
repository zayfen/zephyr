
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'audio'

class Audio extends VNode {
  constructor () {
    super(TAG)
  }

}


class AudioHTML extends LayoutNode<Audio> {

  constructor () {
    super(TAG)
  }

  render(node: Audio): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<audio>${childrenRendered} </audio>`
  }
}


class AudioWXML extends LayoutNode<Audio> {

  constructor () {
    super(TAG)
  }

  render(node: Audio): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<audio>${childrenRendered} </audio>`
  }

}

class AudioTheme extends ThemeNode<Audio> {

  constructor () {
    super(TAG)
  }

  inject(node: Audio): Audio {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Audio)
  assets.defineLayoutNode('html', new AudioHTML)
  assets.defineLayoutNode('wxml', new AudioWXML)
  assets.defineThemeNode('zephyr', new AudioTheme)
}

  