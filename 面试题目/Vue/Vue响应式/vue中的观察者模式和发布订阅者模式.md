https://blog.51cto.com/u_15127592/4336598

## 观察者模式

目标者对象和观察者对象有相互依赖的关系，观察者对某个对象的状态进行观察，如果对象的状态发生改变，就会通知所有依赖这个对象的观察者，

目标者对象 Subject，拥有方法：添加 / 删除 / 通知 Observer；

观察者对象 Observer，拥有方法：接收 Subject 状态变更通知并处理；

目标对象 Subject 状态变更时，通知所有 Observer。

 

Vue中响应式数据变化是观察者模式 每个响应式属性都有dep，dep存放了依赖这个属性的watcher，watcher是观测数据变化的函数，如果数据发生变化，dep就会通知所有的观察者watcher去调用更新方法。因此， 观察者需要被目标对象收集，目的是通知依赖它的所有观察者。那为什么watcher也要存放dep呢？是因为当前正在执行的watcher需要知道此时是哪个dep通知了自己。

 



在beforeCreate之后，created之前调用observe(data)初始化响应式数据，以下是简化版代码（没有处理数组的劫持）



```js
class Observer {
    // 需要对value的属性描述重新定义
    constructor(value) {
      this.walk(value); // 初始化的时候就对数据进行监控
    }
    walk(data) {
      Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
      });
    }
  }

  function defineReactive(data, key, value) {
    // value 可能是一个对象,要递归劫持，所以数据不能嵌套太深
    observe(value);
    let dep = new Dep();
    Object.defineProperty(data, key, {
      get() {
        // 如果有 watcher，就让 watcher 记住 dep，防止产生重复的 dep, 同时 dep 也收集此 watcher
        if (Dep.target) {
          dep.depend();
        }
        return value;
      },
      set(newVal) {
        // 数据没变动则不处理
        if (value === newVal) return;
        observe(newVal); // 如果新值是个对象，递归拦截
        value = newVal; // 设置新的值
        dep.notify(); // 通知收集的 watcher 去更新
      },
    });
}
function observe(data) {
    // 不是对象则不处理，isObject是用来判断是否为对象的函数
    if (Object.prototype.toString.call(data)!== '[object Object]') return;
    // 通过类来实现数据的观测，方便扩展，生成实例
    return new Observer(data);
}
observe(data)
```


在created之后，mouted之前调用mountComponent挂载组件，以下是简化版代码（没有处理watch和computed的watcher）





```js

class Dep {
    static target = null
    constructor() {
      this.id = id++;
      this.subs = []; // 存放依赖的watcher
    }
    depend() {
      // 让正在执行的watcher记录dep，同时dep也会记录watcher
      Dep.target.addDep(this);
    }
    addSub(watcher) {
      // 添加观察者对象
      this.subs.push(watcher);
    }
    notify() {
      // 触发观察者对象的更新方法
      this.subs.forEach((watcher) => watcher.update());
    }
}
class Watcher {
    constructor(vm, exprOrFn) {
      this.vm = vm;
      this.deps = [];
      // 用来去重，防止多次取同一数据时存入多个相同dep
      this.depId = new Set();
      // exprOrFn是updateComponent
      this.getter = exprOrFn;
      // 更新页面
      this.get();
    }
    get() {
      Dep.target = watcher; // 取值之前，收集 watcher
      this.getter.call(this.vm); // 调用updateComponent更新页面
      Dep.target = null; // 取值完成后，将 watcher 删除
    }
    // dep.depend执行时调用
    addDep(dep) {
        let id = dep.id;
        let has = this.depId.has(id);
        if (!has) {
            this.depId.add(id);
            // watcher存放dep
            this.deps.push(dep);
            // dep存放watcher
            dep.addSub(this);
        }
    }  
    // 更新页面方法，dep.notify执行时调用
    update() {
        this.get(); // 一修改数据就渲染更新
    }
}
function mountComponent(vm) {
    // 渲染更新页面
    let updateComponent = () => {
      let vnode = vm._render(); // 生成虚拟节点 vnode
      vm._update(vnode); // 将vnode转为真实节点
    };
    // 每个组件都要调用一个渲染 watcher
    new Watcher(vm, updateComponent);
}
mountComponent(vm)
```
 



## 发布订阅模式
基于一个事件中心，接收通知的对象是订阅者，需要 先订阅某个事件，触发事件的对象是发布者，发布者通过触发事件，通知各个订阅者。 js中事件绑定，就是发布订阅模式

发布订阅模式相比观察者模式多了个事件中心，订阅者和发布者不是直接关联的。

 

vue中的事件总线就是使用的发布订阅模式




```js
// 事件总线
class Bus {
  constructor() {
    // 用来记录事件和监听该事件的数组
    this.listeners = {};
  }
  // 添加指定事件的监听者
  $on(eventName, handler) {
    this.listeners[eventName].add(handler);
  }
  // 取消监听事件
  $off(eventName, handler) {
    this.listeners[eventName].delete(handler);
  }
  // 触发事件
  $emit(eventName, ...args) {
    this.listeners[eventName].forEach((fn) => fn(...args));
  }
}
```


 

观察者模式和发布订阅模式的区别
目标和观察者之间是互相依赖的。

发布订阅模式是由统一的调度中心调用，发布者和订阅者不知道对方的存在。
-----------------------------------
vue中的观察者模式和发布订阅者模式
https://blog.51cto.com/u_15127592/4336598