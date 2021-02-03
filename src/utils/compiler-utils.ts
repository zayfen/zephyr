// template compiler utils

import { AST } from '../compiler/ast';
import { Parser } from '../compiler/parser';
import { VNode } from '../core/prototype';
import { LayoutManager } from '../core/layout-manager';

export function convertAstToLayoutNode<T extends VNode>(
  ast: AST,
  layout: LayoutManager
): T {
  let tag = ast.tag;
  while (tag) {
    let layoutNode = layout.findLayoutNodeByTag(tag);

    // set attrs
  }

  return null;
}
