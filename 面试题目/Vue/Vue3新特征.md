# Vue3.0 的新特性

- 用 Typescript 重写

- Proxy 响应式绑定
- 组合式 API ，[Composition API](https://link.juejin.cn/?target=https%3A%2F%2Fcomposition-api.vuejs.org%2Fapi.html) (setup 语法)
  - 代码重用性
- 组合式函数 use
- Fragment 片段 (多个根节点)、Teleport 传送、Suspense
- 自定义渲染 API
- Tree-Shaking Support
- 源码优化

[Vue3.0 的新特征 | Vue3.0 面试题总结](https://blog.51cto.com/u_15069477/4645141)

[Vue 3 迁移指南](https://v3-migration.vuejs.org/)

# 复制

Vue3.0 从整体来说，既修改了 Vue2.x 时期遗留的一些缺陷，又引入了 组合式 API 、自定义渲染 API 等新特性。这些新特性的引入，不仅为 Vue 的发展注入了更多的活力，同时也塑造了 Vue 使用场景方面更多的可能性。

> #### Vue3.0 的新特性

- 
- Proxy 响应式绑定
- Tree-Shaking Support
- 组合式 API
- Fragment 片段、Teleport、Suspense
- 自定义渲染 API
- 源码优化
- 

##### 一、Proxy 响应式绑定

Vue2.x 内部是通过 `Object.defineProperty` 这个 API 去劫持数据的 getter 和 setter 来实现响应式的。因为这个 API 它必须预先知道要拦截的 key 是什么，所以它并不能检测对象属性的添加和删除。直接造成了数组元素的直接修改不会触发响应式机制，这个很多初学者所谓的 bug。

例如，对象obj的text属性进行劫持：

```
const obj = {};
Object.defineProperty(obj, 'text', {
    get: function() {
        console.log('get val');&emsp;
    },
    set: function(newVal) {
        console.log('set val:' + newVal);
        document.getElementById('input').value = newVal;
        document.getElementById('span').innerHTML = newVal;
    }
});
const input = document.getElementById('input');
input.addEventListener('keyup', function(e){
    obj.text = e.target.value;
})
1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.
```



Vue3.0 使用了 Proxy API 做数据劫持，它劫持的是整个对象，自然对于对象的属性的增加和删除都能检测到，自然也不会在存在上述的问题。

将上面例子进行改写：

```
const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};
const newObj = new Proxy(obj, {
    get: function(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
        console.log(target, key, value, receiver);
        if (key === 'text') {
            input.value = value;
            p.innerHTML = value;
        }
        return Reflect.set(target, key, value, receiver);
    },
});
input.addEventListener('keyup', function(e) {
    newObj.text = e.target.value;
});
1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.16.17.18.19.20.
```



通过 Proxy 实现双向响应式绑定，相比 defineProperty 的遍历属性的方式效率更高，性能更好，另外 Virtual DOM 更新只 diff 动态部分、事件缓存等，也带来了性能上的提升。

##### 二、Tree-Shaking Support（摇树优化）

tree-sharking 即在构建工具构建后消除程序中无用的代码，来减少包的体积。

相比 Vue2.x 导入整个 Vue 对象，Vue3.0 支持按需导入，只打包需要的代码。Tree-Shaking 依赖 ES2015 模块语法的静态结构（即 import 和 export），通过编译阶段的静态分析，找到没有引入的模块并打上标记。像我们在项目中如果没有引入 Transition、KeepAlive 等不常用的组件，那么它们对应的代码就不会打包进去。

##### 三、组合式 API

首先需要明确的是，Vue2.x 中组件传统的 data，computed，watch，methods 写法，我们称之为选项式 API（Options API ）。

**（1）选项式 API 存在的缺陷**

随着业务复杂度越来越高，代码量会不断的加大；由于代码需要遵循 option 的配置写到特定的区域，导致后续维护非常的复杂，代码可复用性也不高。比如，很长的 methods 区域代码、data变量声明与方法区域未在一起。

**（2）与 mixins 的比较**

对于上述提到的问题，我们可能会想到会 mixins 来解决，但是当抽离并引用了大量的 mixins，你就会发现两个不可避免的问题：命名冲突和数据来源不清晰。

组合式 API 和 mixins 二者的差别：

- 
- 层级不同：组合式 API 与组件是嵌套关系，而mixin与组件是同 层级关系
- 影响面不同：组合式 API 作为组件的被调用方，并且变量逻辑是组件控制，耦合性很低。而 mixins 是耦合在代码逻辑里，并且存在变量的互相引用，为将来的升级和维护埋下隐患。
- 

**（3）与 React Hook 的比较**

不可置否，组合式 API 的诞生确实受到了 React Hooks 的启发。对于使用者而言，使用一些概念时大同小异，这也不用就此贴上抄袭的标签，因为很多语言上都有相似的概念或者语法，比如 TS 可以规范变量的声明，但是 Java 中为了方便也出现了 var。事实上，组合式 API 的实现与 React Hook 是截然不同的。

组合式 API 使用上 比 React Hooks简便了不少：

- 
- 同样的逻辑组合、组件复用能力
- 只调用一次 setup 方法
  更加符合 JS 直觉
  没有闭包变量问题
  没有内存/GC压力
  不存在内联回调导致子组件永远更新的问题
- 

**（4）组合式 API 的使用**

下面简单概述了组合式 API 的使用，主要是一些 方法增加 和 概念迁移：

- 
- setup方法：
  vue3.0 中，所有的代码逻辑将在setup方法中实现，包括 data、watchcomputed、methods 等，并且不再有this。
  vue3.0 会先执行setup方法，再执行兼容2.x的其他方法。
  vue3.0 中setup方法在组件生命周期内只执行一次，不会重复执行。
- 生命周期钩子：
  2.x 中生命周期钩子放在跟 methods 同级属性下。
  3.x 中需要先导入钩子，然后在 setup 方法中注册钩子回调，并且钩子命名也跟 React 保持一样。
  3.x 移除了 2.x 中的 beforeCreate 和 created 钩子，通过 setup 方法代替。
- 

```
// vue2.x
export default {
    data () {
        return {}
    },
    methods: {
        ...
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {}
}

// vue3.x
import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
} from 'vue'

export default {
    setup() {
        onBeforeMount(() => {
            console.log('component is onBeforeMount')
        })
        onMounted(() => {
            console.log('component is onMounted')
        })
        onBeforeUpdate(() => {
            console.log('component is onBeforeUpdate')
        })
        onUpdated(() => {
            console.log('component is onUpdated')
        })
        onBeforeUnmount(() => {
            console.log('component is onBeforeUnmount')
        })
        onUnmounted(() => {
            console.log('component is onUnmounted')
        })
    }
}
1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.16.17.18.19.20.21.22.23.24.25.26.27.28.29.30.31.32.33.34.35.36.37.38.39.40.41.42.43.44.45.46.47.48.49.50.
```



- 
- 响应式数据对象相关方法：reactive 方法、ref 方法、toRef 等方法，数据的只读属性，计算属性，方法的拆解，watchEffect，useStore 等相关方法不在此一一详解。
- 

##### 四、Fragment 片段、Teleport、Suspense

**（1）Fragment 片段**

- 
- Vue2.x中，vue template只允许有一个根节点。
- Vue3.0中，vue template支持多个根节点。
- 

```
// vue2.x
<template>
<div>
<Headers></Headers>
<Main></Main>
<Footer></Footer>
</div>
</template>
1.2.3.4.5.6.7.8.
// Vue3.0
<template>
<Headers></Headers>
<Main></Main>
<Footer></Footer>
</template>
1.2.3.4.5.6.
```



**（2）Teleport**

Teleport 是一种能够将我们的模板渲染至指定 DOM 节点，不受父级 style 、v-show 等属性影响，但 data、prop 数据依旧能够共用的技术；类似于 React 的 Portal。

**（3）Suspense**

`<Suspense>` 是一个特殊的组件，它将呈现回退内容，而不是对于的组件，直到满足条件为止，这种情况通常是组件 setup 功能中发生的异步操作或者是异步组件中使用。

使用场景：父组件展示的内容包含异步的子组件，异步的子组件需要一定的时间才可以加载并展示，这时就需要一个组件处理一些占位逻辑或者加载异常逻辑。

```
// vue2.x
<template>
<div>
<div v-if="!loading">
            ...
</div>
<div v-if="loading">Loading...</div>
</div>
</template>

// vue3.x
<Suspense>
<template >
<Suspended-component />
</template>
<template #fallback>
        Loading...
</template>
</Suspense>
1.2.3.4.5.6.7.8.9.10.11.12.13.14.15.16.17.18.19.
```



##### 五、自定义渲染 API

自定义渲染 API 将 Virtual DOM（虚拟DOM）和平台相关的渲染分离。

通过 createRendererAPI 我们可以自定义 Virtual DOM 渲染到某一平台中时的所有操作，比如新增、修改、删除一个“元素”，我们可以这些方法中替换或修改为我们自定义的逻辑，从而打造一个我们自定义的渲染器。

利用这个 API，在 Vue3.0 中我们可以自由方便地去构建 Web（浏览器）平台或非 Web 平台的自定义渲染器。

在 Vue 中是利用 runtime-dom 方法提供的一个上层的抽象层，它帮我们完成了 Virtual DOM 渲染到 Web DOM 中的复杂浏览器接口编程操作。

通过编写自定义渲染器，极大丰富了 Vue 的使用场景。

##### 六、源码优化

**（1）使用 monorepo 来管理源码**

- 
- Vue.js 2.x 的源码托管在 src 目录，然后依据功能拆分 出了 compiler（模板编译的相关代码）、core（与平台无关的通用运行时代码）、platforms（平台专有代码）、server（服务端渲染的相关代码）、sfc（.vue 单文件解析相关代码）、shared（共享工具代码）等目录。
- Vue.js 3.0，整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到 packages 目录下面不同的子目录中，每个 package 有各自的 API、类型定义和测试。
- 

**（2）使用 Typescript 来开发源码**

- 
- Vue.js 2.x 选用 Flow 做类型检查，来避免一些因类型问题导致的错误，但是 Flow 对于一些复杂场景类型的检查，支持得并不好。
- Vue.js 3.0 抛弃了 Flow ，使用 TypeScript 重构了整个项目。TypeScript 提供了更好的类型检查，能支持复杂的类型推导；由于源码就使用 TypeScript 编写，也省去了单独维护 d.ts 文件的麻烦。
- 

> ### Vue3 面试题总结

##### Vue3.0 源码分析

- 
- Vue.js 3.0 响应式系统的实现原理？
- 响应式是惰性的
- vue3 新增 Composition API
- Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的 Options Api 有什么区别？
- vue3 新增内置组件 Teleport
- Props 初始化和更新流程改进
- Vue3 Slot内容分发
- Vue 3.0 在编译方面有哪些优化？
- Vue3 依赖注入子孙组件如何共享数据
- Vue3 侦听器实现原理与使用场景
- Vue3 组件实现原理核心源码解读
- Vuex 数据流管理方案
- 原生服务端渲染（SSR）的实现、
- 同构开发
- Nuxt.js 集成式 SSR 框架