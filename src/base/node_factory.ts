import { Node, TAGS, ThemeNode, LayoutNode } from './proptype';

class Row implements Node {
  tag = TAGS.ROW;
  id: string = 'row-id';
  level: Number = 0;
  style: string = '';
  customClassList: string[] = [];
  classList: string[] = [];
  attrList: { [key: string]: any; } = {};
  children: Node[] = [];
  themeNode: ThemeNode = null;
  layoutNode: LayoutNode = null;

}
