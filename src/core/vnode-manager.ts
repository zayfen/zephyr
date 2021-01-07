/** 虚拟节点管理
* @author: zayfen
*/

import { Clazz } from './types'
import { VNode, TAG_TYPE } from '../core/prototype'

export class VNodeManager {
  private static instance: VNodeManager = null

  vnodes: { [Key: string]: Clazz<VNode> } = {}

  constructor () {

  }

  public static getInstance (): VNodeManager {
    if (VNodeManager.instance === null) {
      VNodeManager.instance = new VNodeManager()
    }
    return VNodeManager.instance
  }

  public registerVNode (tag: TAG_TYPE, vnode: Clazz<VNode>) {
    // avoid push duplicated vnode
    if (this.vnodes[tag]) {
      console.warn("registering a duplicated vnode: <" + tag + ">")
      // throw new Error("duplicated vnode: " + tag)
    }

    this.vnodes[tag] = vnode
  }

  findVNodeByTag (tag: TAG_TYPE): Clazz<VNode> | undefined {
    return this.vnodes[tag]
  }
}
