// 节点接口



interface Node {
  tag: TAGS,
  id: string,
  level: Number,
  style: string,
  classList: string[],
  attrList: { [key: string]: any }
}


abstract class NodeRender {
  tag: TAGS = TAGS.NONE;
  tabWidth: Number;
  abstract render(node: Node): string;
}


abstract class Theme {
  tag: TAGS = TAGS.NONE;
  abstract inject(node: Node): Node;
}


// 声明组件的tag,所有的组件的识别都要基于这个tag
enum TAGS {
  NONE = 0,
  ROW,
  COL,
  CARD,
  IMAGE,
  BUTTON,
  TEXT
}

export { Node, NodeRender, Theme, TAGS };
