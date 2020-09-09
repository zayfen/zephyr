
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'
import {
  resolveStyle,
  resolveClassList,
  resolveAttributes
} from '../utils/node-utils'


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
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')

    return `<video id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</video>`
  }
}


class VideoWXML extends LayoutNode<Video> {

  constructor () {
    super(TAG)
  }

  render(node: Video): string {
    let id = node.getId()
    let style = resolveStyle(node)
    let cls = resolveClassList(node)
    let attrs = resolveAttributes(node)

    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\n')
    return `<video id="${id}" style="${style}" class="${cls}" ${attrs}>${childrenRendered}</video>`
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

  