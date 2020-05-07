// 节点接口



interface Node {
  tag: TAGS | string,
  id: string,
  level: Number,
  style: string,
  customClassList: string[],
  classList: string[],
  attrList: { [key: string]: any },
  children: Array<Node>
  themeNode: ThemeNode,
  layoutNode: LayoutNode,

  appendTo: (node: Node) => Node;
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


class Layout {
  private name: string; // render name
  private layoutNodeList: Array<LayoutNode> = [];

  public registerLayoutNode (node: LayoutNode) {
    let foundIndex = this.duplicatedLayoutNode(node);
    if (foundIndex === -1) {
      this.layoutNodeList.push(node);
      return;
    }
    this.layoutNodeList.splice(foundIndex, 1, node);
  }

  public injectLayoutNode (node: Node) {
    for (let i = 0; i < this.layoutNodeList.length; i++) {
      if (this.layoutNodeList[i].tag === node.tag) {
        node.layoutNode = this.layoutNodeList[i];
        return;
      }
    }

    throw new Error('No Adapted LayoutNode: ' + node.tag);
  }

  private duplicatedLayoutNode (node: LayoutNode): number {
    let foundIndex = -1;

    for (let i = 0; i < this.layoutNodeList.length; i++) {
      let _node = this.layoutNodeList[i];
      if (_node.tag === node.tag) {
        foundIndex = i;
        break;
      }
    }

    return foundIndex;
  }

}

class Theme {
  private name: string; // theme name
  private themeNodeList: Array<ThemeNode> = [];

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

  public injectThemeNode (node: Node) {
    for (let i = 0; i < this.themeNodeList.length; i++) {
      if (this.themeNodeList[i].tag === node.tag) {
        node.themeNode = this.themeNodeList[i];
        node.classList.splice(0, node.classList.length);
        node.themeNode.inject(node);
        return;
      }
    }

    throw new Error('No Adapted ThemeNode: ' + node.tag);
  }

}


// 声明组件的tag,所有的组件的识别都要基于这个tag
enum TAGS {
  NONE = 0,
  PAGE,
  ROW,
  COL,
  CARD,
  IMAGE,
  BUTTON,
  TEXT
}


// some utils
const Utils = {
  resolveClassList (node: Node): string {
    let finalClassList: string[] = [];
    node.classList.forEach(cls => {
      if (finalClassList.indexOf(cls.trim()) === -1) {
        finalClassList.push(cls);
      }
    })

    node.customClassList.forEach(cls => {
      if (finalClassList.indexOf(cls) === -1) {
        finalClassList.push(cls);
      }
    })

    return finalClassList.join(' ');
  }
}

export { Node, LayoutNode, ThemeNode, Layout, Theme, TAGS, Utils };
