#!/usr/bin/env python
#coding: utf-8

# __author__ = "zayfen<zhangyunfeng@shuame.com>"
# __version__ = "v1.0.0"

from string import Template

def component_template (component_name):
  """
  define component template of typescript source code
  """
  template = '''
import { VNode } from '../core/prototype'
import { LayoutNode } from '../core/prototype'
import { ThemeNode } from '../core/prototype'
import { ComponentAssets } from '../core/component-assets'


const TAG = '$tag'

class $Tag extends VNode {
  constructor () {
    super(TAG)
  }

}


class ${Tag}HTML extends LayoutNode<${Tag}> {

  constructor () {
    super(TAG)
  }

  render(node: ${Tag}): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\\n')

    return `<${tag}>$${childrenRendered} </${tag}>`
  }
}


class ${Tag}WXML extends LayoutNode<$Tag> {

  constructor () {
    super(TAG)
  }

  render(node: $Tag): string {
    const children = node.children || []
    const childrenRendered = children.map(child => child.render()).join('\\n')
    return `<${wxmlTag}>$${childrenRendered} </${wxmlTag}>`
  }

}

class ${Tag}Theme extends ThemeNode<$Tag> {

  constructor () {
    super(TAG)
  }

  inject(node: ${Tag}): ${Tag} {
    const themeClasses = ['zephyr-component', `zephyr-$${TAG}`]
    themeClasses.forEach(cls => node.addCustomClass(cls))
    return node
  }
}

export function install (assets: ComponentAssets): void {
  assets.defineVNode(TAG, ${Tag})
  assets.defineLayoutNode('html', new ${Tag}HTML)
  assets.defineLayoutNode('wxml', new ${Tag}WXML)
  assets.defineThemeNode('zephyr', new ${Tag}Theme)
}

  '''
  code_template = Template(template)
  return code_template


def write_sourcecode_file (file_name, code):
  '''
  把代码写入文件
  '''
  try:
    with open(file_name, mode = "w+", encoding="utf-8") as f:
      f.write(code)
  except Error as err:
    print("Oops! write source code to file failed!" + err.what())


def generate (components, wxml_tag_transform):
  """
  generate component typescript source code
  """
  for component in components:
    code_template = component_template(component)
    d = dict(tag = component, Tag = str.capitalize(component), wxmlTag=wxml_tag_transform[component])
    source_code = code_template.substitute(d)
    write_sourcecode_file(component + '.ts', source_code)


def generate_exports (components):
  """
  组件的导出代码
  """
  export_component_template = Template('''

  import { install as ${tag}Installer } from './${tag}'
  allComponentInstallers.push(${tag}Installer)
  ''')

  exports_code = '''
  // export all components
  import { ComponentAssets } from '../core/component-assets'

  let allComponentInstallers: Array<(asset: ComponentAssets) => void> = []
  '''

  for component in components:
    d = dict(tag = component)
    exports_code = exports_code + export_component_template.substitute(d)

  exports_code = exports_code + '\n\nexport default allComponentInstallers'
  return exports_code


if __name__ == "__main__":
  components = ['a', 'address', 'article', 'aside', 'audio', 'base', 'button', 'canvas', 'code', 'dd', 'def', 'div', 'dl', 'dt', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'head', 'hgroup', 'iframe', 'img', 'input', 'i', 'label', 'li', 'nav', 'option', 'section', 'select', 'span', 'table', 'tbody', 'td', 'textarea', 'thead', 'th', 'title', 'tr', 'ul', 'video']

  wxml_tag_transform = dict([
    ("a", "navigator"),
    ("address", "view"),
    ("article", "view"),
    ("aside", "view"),
    ("audio", "audio"),
    ("base", "view"),
    ("button", "button"),
    ("code", "view"),
    ("canvas", "canvas"),
    ("dd", "view"),
    ("def", "view"),
    ("div", "view"),
    ("dl", "view"),
    ("dt", "view"),
    ("footer", "view"),
    ("form", "form"),
    ("h1", "view"),
    ("h2", "view"),
    ("h3", "view"),
    ("h4", "view"),
    ("h5", "view"),
    ("h6", "view"),
    ("head", "view"),
    ("header", "view"),
    ("hgroup", "view"),
    ("i", "view"),
    ("iframe", "web-view"),
    ("img", "image"),
    ("input", "input"),
    ("label", "label"),
    ("li", "view"),
    ("nav", "view"),
    ("option", "view"),
    ("section", "view"),
    ("select", "view"),
    ("span", "text"),
    ("table", "view"),
    ("tbody", "view"),
    ("td", "view"),
    ("textarea", "textarea"),
    ("th", "view"),
    ("thead", "view"),
    ("title", "view"),
    ("tr", "view"),
    ("ul", "view"),
    ("video", "video")
  ])
  generate(components, wxml_tag_transform)

  exports = generate_exports(components)
  write_sourcecode_file('index.ts', exports)
