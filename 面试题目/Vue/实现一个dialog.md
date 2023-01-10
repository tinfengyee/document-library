https://juejin.cn/post/6844903604902428679

[基于单例模式下实现的vue全局组件](https://juejin.cn/post/7072704321774682119)

[封装Vue动态toast组件](https://juejin.cn/post/6858443080166965262)

思路对的。有两个地方可以优化，1.toast创建可以使用单例，避免重复 调用的性能损耗。2.动画可以直接用vue提供translation。





https://www.codenong.com/cs105394361/

https://juejin.cn/post/6890072682864476168



https://blog.csdn.net/ilovexiaoming1/article/details/124347245

```JS
import Toast from'./Toast'

const install = function(Vue) {
  const ToastConstructor = Vue.extend(Toast)
  const toast = new ToastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
Toast.install = install
export default Toast
```

```VUE
<template>
  <Transition name="fade">
    <div class="mask" v-if="isShow">
      <div class="toast">
        <div class="toast-body">
          {{ message }}
        </div>
        <div class="toast-bottom">
          <button @click="hide">cancal</button>
          <button @click="confirm">confirm</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: 'show toast',
      isShow: false
    }
  },
  methods: {
    show(option = { message: 'none' }) {
      if (typeof option === 'string') {
        this.message = option
      } else {
        this.message = option.message
      }
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    confirm() {
      this.$toast.hide()
      setTimeout(() => {
        this.$toast.show('my 22')
      }, 10);
    }
  }
}
</script>
<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  font-size: 28px;
  background: rgba(0, 0, 0, 0.7);

  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;

    &-bottom {
      display: flex;
      justify-content: space-around;
    }
  }
}

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

