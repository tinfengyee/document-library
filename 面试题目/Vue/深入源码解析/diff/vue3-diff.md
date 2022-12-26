# vue3-diff <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-19 00:01:51
> LastEditTime: 2022-12-19 00:01:59
> Description: NO Desc

## Vue2中updateChildren的缺点

> 至此，updateChildren的流程就搞完了，但是Vue2中这个流程一样存在性能上的一些缺点。
>
> 如果有注意，以上图5、图6、图7、图8、图9都统计了dom节点移动的次数，一共移动了5次。
>
> 但是，其实我们来看这个序列

```
oldChildren : 2 3 4 5 6 7 8
newChildren : 8 5 6 7 3 4 2
// 在Vue3中，尤大的团队采用了移动次数更少的diff算法来解决这个缺点
// 其实更少的移动次数是依据最大递增子序列来处理的
// 以上的oldChildren和newChildren，因为我这个例子是newChildren中的key的顺序就是各自在oldChildren中的相对位置，所以我们可以直接找到最大递增子序列为 5 6 7
// 也就是说5 6 7 这三个节点我们不需要移动
// 只需要将8 移动到 5之前
// 其次将3 4 2依次追加到父节点的末尾即可
// 在Vue3中的diff算法中，这个例子只移动了4次，所以节省了一些dom操作次数，达到了性能优化的目的W
```

## vue3 diff

Vue3的diff也是双指针来处理同级的diff的

但是不同的是，规则是：

- 旧的头部与新的头部对比

- 旧的尾部与新的尾部对比

- 如果`oldStartIndex > oldEndIndex && newStartIndex <= newEndIndex`，则进行新节点的创建并插入

- 如果`oldStartIndex <= oldEndIndex && newStartIndex > newEndIndex`，则进行旧节点的卸载

- 如果`oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex`，则进入这一步

  - 先为`newChildren`创建`keyToNewIndexMap`，用来判断是否需要移动节点
  - 循环`oldChildren`（未知子序列区间内）
    - 如果`oldChild.key`存在于`keyToNewIndexMap`，就说明有这个节点可以复用，然后与对应的新节点`patch`更新
      - 这一步还需要看拿到的`newIndex`是否是递增的，如果不是递增的，就说明是需要移动的，就需要去计算最大递增子序列
      - 以及需要将`newChildren`对应`newIndex`位置设置为已经diff过的标志（`newIndexToOldIndexMap`）（也是为了用来计算最大递增子序列），因为说明已经diff过，就可以判断某个索引位置是否是diff过的，需不需要新建的节点
    - 如果不存在，就卸载掉这个旧节点

  - 如果需要移动，计算最大递增子序列（根据`newIndexToOldIndexMap`）

  - 循环`newChildren`（未知子序列区间内）

    - 如果`newIndexToOldIndexMap`中对应索引的位置diff过（条件不赘述了，未diff是0）
      - 如果索引位置在最大递增子序列中，则不动跳过，更新指针
      - 如果索引位置不在最大递增子序列中，则移动，锚点需要注意

    - 如果没被diff过，则新建节点插入

### 计算最长递增子序列？

用到的算法是二分查找 + 贪心，最好先去leetcode看看如何计算最长递增子序列的长度 [leetcode.cn/problems/lo…](https://link.juejin.cn/?target=url) 具体原理是：以序列中每一项作为递增序列的结尾时，能组成多长的序列以及保存以这一项作为递增序列的结尾时，它相对的递增序列中的前一位索引。因为递增序列满足单调性，所以可以用二分查找去优化时间复杂度。 另外贪心是指，形成的每个长度的递增序列，都会以所能满足该序列的最小值来保存。

## 转载

[Vue2的diff算法--updateChildren图文流程以及缺点](https://juejin.cn/post/7094540782517878820)
