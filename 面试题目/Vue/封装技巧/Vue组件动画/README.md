# 看下官网就懂

https://v2.cn.vuejs.org/v2/guide/transitions.html

![Transition Diagram](./README.assets/transition.png)

# 一般使用两种方式

1. animate: `fade-enter-active` `fade-leave-active` 过渡激活的状态 然后设置一个动画就可以了。
2. transition: `fade-enter-active` `fade-leave-active `  过渡激活的状态，配合 `fade-enter` `fade-leave-to` 初始 和结束的状态 

```vue
<template>
  <Transition name="fade">
    <div class="mask" v-if="isShow">
        .....
    </div>
  </Transition>
</template>

<style>
.fade-enter-active {
  // animation: animate_in 1s;
  transition: all 0.25s ease-in;

}

.fade-leave-active {
  // animation: animate_in 1s reverse;
  transition: all 0.25s ease-in;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// @keyframes animate_in {
//   0% {
//     opacity: 0;
//   }

//   100% {
//     opacity: 1;
//   }
// }
</style>
```

## **vue-confirm-dialog.vue**

[**vue-confirm-dialog.vue**](https://github.com/aslanon/vue-confirm-dialog/blob/master/src/vue-confirm-dialog.vue)
