
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = 'video'

class Video extends VNode {
  constructor () {
    super(TAG)
  }

}


class VideoHTML extends LayoutNode<Video> {

  constructor () {
    super(TAG)
  }

  render(node: Video): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<video>${childrenRendered} </video>`
  }
}


class VideoWXML extends LayoutNode<Video> {

  constructor () {
    super(TAG)
  }

  render(node: Video): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<video>${childrenRendered} </video>`
  }

}

class VideoTheme extends ThemeNode<Video> {

  constructor () {
    super(TAG)
  }

  inject(node: Video): Video {
    const themeClasses = ['zephyr-component', `zephyr-${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, Video)
  assets.defineLayoutNode('html', new VideoHTML)
  assets.defineLayoutNode('wxml', new VideoWXML)
  assets.defineThemeNode('zephyr', new VideoTheme)
}

  