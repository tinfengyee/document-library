// 两个判断函数
function isUndef(v: any): boolean %checks {
  return v === undefined || v === null;
}
function isDef(v: any): boolean %checks {
  return v !== undefined && v !== null;
}
/**
 * 判定是否相同节点
 * key，tag，是注释节点，data状态一致，input type有相同的类型就判定为相同节点
 * data 大致为 createElement 的数据对象，还包含部分其他数据
 */
function sameVnode(a, b) {
  return (
    a.key === b.key && // key 是不是一样
    a.asyncFactory === b.asyncFactory && // 是不是异步组件
    ((a.tag === b.tag && // 标签是不是一样
      a.isComment === b.isComment && // 是不是注释节点
      isDef(a.data) === isDef(b.data) && // 内容数据是不是一样
      sameInputType(a, b)) || // 判断 input 的 type 是不是一样
      (isTrue(a.isAsyncPlaceholder) && // 判断区分异步组件的占位符否存在， // isTrue:v === true
        isUndef(b.asyncFactory.error)))
  );
}

/**
 * patch 判定根节点是否相同
 */
return function patch(oldVnode, vnode, hydrating, removeOnly) {
  // 如果新的 vnode 不存在，但是 oldVnode 存在
  if (isUndef(vnode)) {
    // 如果 oldVnode 存在，调用 oldVnode 的组件卸载钩子 destroy
    if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
    return;
  }

  let isInitialPatch = false;
  const insertedVnodeQueue = [];

  // 如果 oldVnode 不存在的话，新的 vnode 是肯定存在的，比如首次渲染的时候
  if (isUndef(oldVnode)) {
    isInitialPatch = true;
    // 就创建新的 vnode
    createElm(vnode, insertedVnodeQueue);
  } else {
    // 剩下的都是新的 vnode 和 oldVnode 都存在的话

    // 是不是元素节点
    const isRealElement = isDef(oldVnode.nodeType);
    // 是元素节点 && 通过 sameVnode 对比是不是同一个节点 (函数后面有详解)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // 如果是 就用 patchVnode 进行后续对比 (函数后面有详解)
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
    } else {
      // 如果不是同一元素节点的话
      if (isRealElement) {
        // const SSR_ATTR = 'data-server-rendered'
        // 如果是元素节点 并且有 'data-server-rendered' 这个属性
        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
          // 就是服务端渲染的，删掉这个属性
          oldVnode.removeAttribute(SSR_ATTR);
          hydrating = true;
        }
        // 这个判断里是服务端渲染的处理逻辑，就是混合
        if (isTrue(hydrating)) {
          if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
            invokeInsertHook(vnode, insertedVnodeQueue, true);
            return oldVnode;
          } else if (process.env.NODE_ENV !== "production") {
            warn("这是一段很长的警告信息");
          }
        }
        // function emptyNodeAt (elm) {
        //    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
        //  }
        // 如果不是服务端渲染的，或者混合失败，就创建一个空的注释节点替换 oldVnode
        oldVnode = emptyNodeAt(oldVnode);
      }

      // 拿到 oldVnode 的父节点
      const oldElm = oldVnode.elm;
      const parentElm = nodeOps.parentNode(oldElm);

      // 根据新的 vnode 创建一个 DOM 节点，挂载到父节点上
      createElm(
        vnode,
        insertedVnodeQueue,
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      );

      // 如果新的 vnode 的根节点存在，就是说根节点被修改了，就需要遍历更新父节点
      if (isDef(vnode.parent)) {
        let ancestor = vnode.parent;
        const patchable = isPatchable(vnode);
        // 递归更新父节点下的元素
        while (ancestor) {
          // 卸载老根节点下的全部组件
          for (let i = 0; i < cbs.destroy.length; ++i) {
            cbs.destroy[i](ancestor);
          }
          // 替换现有元素
          ancestor.elm = vnode.elm;
          if (patchable) {
            for (let i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, ancestor);
            }
            const insert = ancestor.data.hook.insert;
            if (insert.merged) {
              for (let i = 1; i < insert.fns.length; i++) {
                insert.fns[i]();
              }
            }
          } else {
            registerRef(ancestor);
          }
          // 更新父节点
          ancestor = ancestor.parent;
        }
      }
      // 如果旧节点还存在，就删掉旧节点
      if (isDef(parentElm)) {
        removeVnodes([oldVnode], 0, 0);
      } else if (isDef(oldVnode.tag)) {
        // 否则直接卸载 oldVnode
        invokeDestroyHook(oldVnode);
      }
    }
  }
  // 返回更新后的节点
  invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
  return vnode.elm;
};

/**
 * 对 vnode 的操作，打补丁。有子节点就调用 updateChildren
 */
function patchVnode(
  oldVnode, // 老的虚拟 DOM 节点
  vnode, // 新的虚拟 DOM 节点
  insertedVnodeQueue, // 插入节点的队列
  ownerArray, // 节点数组
  index, // 当前节点的下标
  removeOnly // 只有在
) {
  // 新老节点引用地址是一样的，直接返回
  // 比如 props 没有改变的时候，子组件就不做渲染，直接复用
  if (oldVnode === vnode) return;

  // 新的 vnode 真实的 DOM 元素
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // clone reused vnode
    vnode = ownerArray[index] = cloneVNode(vnode);
  }
  // 这里就是复用了之前的节点
  const elm = (vnode.elm = oldVnode.elm);
  // 如果当前节点是注释或 v-if 的，或者是异步函数，就跳过检查异步组件
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
    } else {
      vnode.isAsyncPlaceholder = true;
    }
    return;
  }
  // 当前节点是静态节点的时候，key 也一样，或者有 v-once 的时候，就直接赋值返回
  if (
    isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }
  // hook 相关的不用管
  let i;
  const data = vnode.data;
  if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
    i(oldVnode, vnode);
  }
  // 获取子元素列表
  const oldCh = oldVnode.children;
  const ch = vnode.children;

  if (isDef(data) && isPatchable(vnode)) {
    // 遍历调用 update 更新 oldVnode 所有属性，比如 class,style,attrs,domProps,events...
    // 这里的 update 钩子函数是 vnode 本身的钩子函数
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    // 这里的 update 钩子函数是我们传过来的函数
    if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
  }
  // 如果新节点不是文本节点，也就是说有子节点
  if (isUndef(vnode.text)) {
    // 如果新老节点都有子节点
    if (isDef(oldCh) && isDef(ch)) {
      // 如果新老节点的子节点不一样，就执行 updateChildren 函数，对比子节点
      if (oldCh !== ch)
        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
    } else if (isDef(ch)) {
      // 如果新节点有子节点的话，就是说老节点没有子节点

      // 如果老节点文本节点，就是说没有子节点，就清空
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, "");
      // 添加子节点
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
    } else if (isDef(oldCh)) {
      // 如果新节点没有子节点，老节点有子节点，就删除
      removeVnodes(oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      // 如果老节点是文本节点，就清空
      nodeOps.setTextContent(elm, "");
    }
  } else if (oldVnode.text !== vnode.text) {
    // 新老节点都是文本节点，且文本不一样，就更新文本
    nodeOps.setTextContent(elm, vnode.text);
  }
  if (isDef(data)) {
    // 执行 postpatch 钩子
    if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode);
  }
}

/**
 * 新旧虚拟节点的子节点对比，根据首尾指针两两对比，匹配成功执行 patchVnode 进行打补丁操作，不成功继续用 key 做匹配
 */
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  let oldStartIdx = 0; // 老 vnode 遍历的下标
  let newStartIdx = 0; // 新 vnode 遍历的下标
  let oldEndIdx = oldCh.length - 1; // 老 vnode 列表长度
  let oldStartVnode = oldCh[0]; // 老 vnode 列表第一个子元素
  let oldEndVnode = oldCh[oldEndIdx]; // 老 vnode 列表最后一个子元素
  let newEndIdx = newCh.length - 1; // 新 vnode 列表长度
  let newStartVnode = newCh[0]; // 新 vnode 列表第一个子元素
  let newEndVnode = newCh[newEndIdx]; // 新 vnode 列表最后一个子元素
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm;

  const canMove = !removeOnly;

  // 循环，规则是开始指针向右移动，结束指针向左移动移动
  // 当开始和结束的指针重合的时候就结束循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];

      // 老开始和新开始对比
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 是同一节点 递归调用 继续对比这两个节点的内容和子节点
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      // 然后把指针后移一位，从前往后依次对比
      // 比如第一次对比两个列表的[0]，然后比[1]...，后面同理
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];

      // 老结束和新结束对比
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(
        oldEndVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      // 然后把指针前移一位，从后往前比
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];

      // 老开始和新结束对比
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        );
      // 老的列表从前往后取值，新的列表从后往前取值，然后对比
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];

      // 老结束和新开始对比
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // 老的列表从后往前取值，新的列表从前往后取值，然后对比
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];

      // 以上四种情况都没有命中的情况
    } else {
      if (isUndef(oldKeyToIdx))
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      // 拿到新开始的 key，在老的 children 里去找有没有某个节点有这个 key
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

      // 新的 children 里有，可是没有在老的 children 里找到对应的元素
      if (isUndef(idxInOld)) {
        /// 就创建新的元素
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
      } else {
        // 在老的 children 里找到了对应的元素
        vnodeToMove = oldCh[idxInOld];
        // 判断标签如果是一样的
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 就把两个相同的节点做一个更新
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          oldCh[idxInOld] = undefined;
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
        } else {
          // 如果标签是不一样的，就创建新的元素
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // oldStartIdx > oldEndIdx 说明老的 vnode 先遍历完
  if (oldStartIdx > oldEndIdx) {
    // 就添加从 newStartIdx 到 newEndIdx 之间的节点
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    );

    // 否则就说明新的 vnode 先遍历完
  } else if (newStartIdx > newEndIdx) {
    // 就删除掉老的 vnode 里没有遍历的节点
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}

/**
 * 创建 map hash 表，用于匹配 key
 */
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

/**
 * 循环查找旧Vnode 是否匹配 sameVnode
 */
function findIdxInOld(node, oldCh, start, end) {
  for (let i = start; i < end; i++) {
    const c = oldCh[i];
    if (isDef(c) && sameVnode(node, c)) return i;
  }
}
