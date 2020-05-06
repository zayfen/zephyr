// 节点接口



interface Node {
  tag: TAGS | string,
  id: string,
  level: Number,
  style: string,
  classList: string[],
  attrList: { [key: string]: any },
  layoutNode: LayoutNode,
  children: Array<Node>
}


abstract class LayoutNode {
  tag: TAGS = TAGS.NONE;
  tabWidth: Number;
  abstract render(node: Node): string;
}


abstract class ThemeNode {
  tag: TAGS = TAGS.NONE;
  abstract inject(node: Node): Node;
}


abstract class Layout {
  private name: string; // render name
  private nodeRenderList: Array<LayoutNode>;

  public registerLayoutNode (node: LayoutNode) {
    let foundIndex = this.duplicatedLayoutNode(node);
    if (foundIndex === -1) {
      this.nodeRenderList.push(node);
      return;
    }
    this.nodeRenderList.splice(foundIndex, 1, node);
  }

  public findRender (node: Node): LayoutNode {
    for (let i = 0; i < this.nodeRenderList.length; i++) {
      if (this.nodeRenderList[i].tag === node.tag) {
        return this.nodeRenderList[i];
      }
    }

    throw new Error('No Adapted LayoutNode: ' + node.tag);
  }

  private duplicatedLayoutNode (node: LayoutNode): number {
    let foundIndex = -1;

    for (let i = 0; i < this.nodeRenderList.length; i++) {
      let _node = this.nodeRenderList[i];
      if (_node.tag === node.tag) {
        foundIndex = i;
        break;
      }
    }

    return foundIndex;
  }

}

abstract class Theme {
  private name: string; // theme name
  private themeNodeList: Array<ThemeNode>;

  public registerThemeNode (node: ThemeNode) {
    let foundIndex = this.duplicatedThemeNode(node);
    if (foundIndex === -1) {
      this.themeNodeList.push(node);
      return;
    }
    this.themeNodeList.splice(foundIndex, 1, node);
  }


  private duplicatedThemeNode (node: ThemeNode): number {
    let foundIndex = -1;
    for (let i = 0; i < this.themeNodeList.length; i++) {
      let _node = this.themeNodeList[i];
      if (_node.tag === node.tag) {
        foundIndex = i;
        break;
      }
    }

    return foundIndex;
  }
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

export { Node, LayoutNode, ThemeNode, Layout, Theme, TAGS };
