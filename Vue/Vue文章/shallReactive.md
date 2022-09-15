

# vue3.0中shallowRef和shallReactive

https://juejin.cn/post/6987942531472457759

https://www.cnblogs.com/qd-lbxx/p/16292137.html

```
<template>
    <div>
    <h1>正常的 : reactive</h1>
    姓名 : {{name}}  <br>
    价格 : {{a.b.money}}  <br>

    <button @click =' name+= 1'>姓名+1</button>   <br>
    <button @click = a.b.money++>价格+1</button>

    <hr>
    
    <!-- 就是第一层,才具备响应式 -->
    <h1>正常的 : shallowReactive</h1>
    姓名 : {{name2}}  <br>
    价格 : {{a.b.money2}}  <br>

    <!-- 浅层次就可以 -->
    <button @click =' name2+= 2'>姓名+2</button>   <br> 
    <!-- 深层次就不行了 -->
    <button @click =' a.b.money2+=2'>价格+2</button>   

    </div>
</template>

<script>
    import {reactive,toRefs,shallowReactive,}    from 'vue'
    export default {
        name: 'App',
        setup() {
      
      // 正常的reactive
      let data = reactive({
        name:'吴宇腾',
        a:{
          b:{
            money : 18
          }
        }
      })
      // 这个是proxy
      console.log('正常的reactive的深层次: ',data.a)


      // 浅层次的shallowReactive[ 就是第一层,才具备响应式]
      let data2 = shallowReactive({
        name2:'吴宇腾2',
        a:{
          b:{
            money2 : 22
          }
        }
      })
      // 这个是obj
      console.log('shallowReactive的浅层次: ',data2.a)

      return{
        ...toRefs(data),
        ...toRefs(data2)
      }
        }
    }
</script>
```

