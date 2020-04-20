// 节点接口



interface Node {
  id: string,
  level: Number,
  style: string,
  classList: string[],
  theme: Theme,
  attrList: { [key: string]: any }
}


abstract class NodeRender {
  tabWidth: Number;
  abstract render(node: Node): string;
}


abstract class Theme {
  abstract inject(node: Node): Node;
}

export { Node, NodeRender, Theme };
