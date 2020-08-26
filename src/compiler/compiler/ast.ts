

interface Node {
  tag: string,
  attrs: Array<{ key: string, value: string | number | boolean }>,
  text?: string                 // text
  comment?: string,              // comment
  children: Array<Node>,          // children nodes
  isText?: boolean,
  isComment?: boolean
}

export type AST = Node
