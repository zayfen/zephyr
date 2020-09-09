import { VNode } from '../core/prototype'

interface Node {
  tag: string,
  attrs: Array<{ key: string, value: string | number | boolean }>,
  text?: string                 // text
  comment?: string,              // comment
  children: Array<Node>,          // children nodes
  isText?: boolean,
  isComment?: boolean,
  $vnode?: VNode
  $parent?: VNode
}

export type AST = Node
