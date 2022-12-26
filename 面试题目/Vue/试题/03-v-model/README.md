## 能说说双向绑定以及它的实现原理吗？

## 题目分析：

双向绑定是vue的特色之一，开发中必然会用到的知识点，然而此题还问了实现原理，升级为深度考查。

## 思路分析：3w1h

1. 给出双绑定义
2. 双绑带来的好处
3. 在哪使用双绑
4. 使用方式
5. 扩展：使用细节、原理实现描述

## 回答范例：

1. vue中双向绑定是一个指令v-model，可以绑定一个动态值到视图，同时视图中变化能改变该值。v-model是语法糖，默认情况下相当于`:value`和`@input="$event.target.value"`。
2. 使用v-model可以减少大量繁琐的事件处理代码，提高开发效率，代码可读性也更好
3. 通常在表单项上使用v-model
4. 原生的表单项可以直接使用v-model，自定义组件上如果要使用它需要在组件内绑定value并处理输入事件

## 可能的追问：

### v-model和sync修饰符有什么区别

v-model的本质

```vue
    <!--v-model写法-->
    <my-component type="text" v-model="value">
    <!--展开语法糖后的写法-->
    <my-component type="text"
      :value="value"
      @input="value = $event.target.value"
    >
    <!--
    默认针对原生组件input事件，但是如果子组件定义了针对事件
    model: {
            prop: "value",
            event: "update"
    },
    则编译为
    -->
    <my-component type="text"
      :value="value"
      @update="(val) => value = val"
    >
```

.sync本质

```vue
    <!--语法糖.sync-->
    <my-component :value.sync="value" />
    <!--编译后的写法-->
    <my-component 
      :value="msg" 
      @update:value="(val) => value = val"
    >
```

两者本质都是一样，并没有任何区别： `“监听一个触发事件”="(val) => value = val"`。

1.只不过v-model默认对应的是input或者textarea等组件的input事件，如果在子组件替换这个input事件，其本质和.sync修饰符一模一样。比较单一，不能有多个。

```js
// 子组件可以用自定义事件，来替换v-model默认对应的原生input事件，只不过我们需要在子组件手动 $emit
model: {
        prop: "value",
        event: "update"
},
```

一个组件可以多个属性用.sync修饰符，可以同时"双向绑定多个“prop”，而并不像v-model那样，一个组件只能有一个。

> 注意：Vue3 可以有多个 v-model

总结功能作用场景：

1. v-model针对更多的是**表单最终操作结果**，是双向绑定的结果，是value，是一种change操作。 比如：输入框的值、多选框的value值列表、树结构最终绑定的id值列表（ant design和element都是）、等等...
2. .sync针对更多的是**组件各种各样的状态**，是状态的互相传递，是status，是一种update操作。 比如：组件loading状态、子菜单和树结构展开列表（状态的一种）、某个表单组件内部验证状态、等等.... image.png

### 自定义 model

自定义组件使用v-model如果想要改变事件名或者属性名应该怎么做。

**vue 2** 

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：

```vue
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

**vue3**绑定多个 model

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>

<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

```

## 参考

- [x] [vue中v-model和.sync修饰符区别](https://juejin.cn/post/6943488981703065614)