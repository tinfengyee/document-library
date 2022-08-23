# requestAnimFrame <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-08-24 01:18:11
> LastEditTime: 2022-08-24 04:27:50
> Description: NO Desc

# 1. `setInterval`或者`setTimeout`

我们平时实现JavaScript动画效果时离不开`setInterval`或者`setTimeout`函数，这两个函数本质上相同的。

```javascript
function testFn() {
  console.log('fn');
}

function makeSetInterver(fn, wait = 1000) {
  function step() {
    fn();
    setTimeout(step, wait);
  }

  setTimeout(step, wait);
}

makeSetInterver(testFn, 1000);

// ----- 
/*
function testFn() {
  console.log('fn');
}

function makeSetInterver(fn, wait = 1000) {
  function step(fn) {
    return function() {
      fn()
      setTimeout(step(fn), wait)
    }
  }
  
  setTimeout(step(fn), wait)
}

makeSetInterver(testFn, 1000)

*/
```

以`setInterval`为例，他的作用是以相同的时间间隔执行某个操作，这个时间可以自定义，利用这个特性我们就可以让然也元素跑起来。

可是这个函数有个毛病，他和显示器的刷新频率无法对应。比如说显示器每100毫秒刷新一次，`setInterval`函数设置的间隔执行也是100毫秒，可是我们没有办法保证显示频率刷新的时候`setInterval`的操作正好被执行，虽然它们的相对执行时间相同，可绝对时间不一定一致，所以`setInterval`制作动画的时候会出现丢帧和动画效果生硬不连贯等情况。

# 2. requestAnimFrame 说明

`requestAnimFrame`是H5新标准上的东西，在PC浏览器上会出现兼容问题，在移动端浏览器中可以任意使用。 

要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。按照屏幕刷新率执行动画间隔。如刷新率为60Hz，则是1000/60=16.66ms执行一次函数。

`requestAnimationFrame` 比起 `setTimeout、setInterval`的优势主要有两点：

1、`requestAnimationFrame`会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。

2、在隐藏或不可见的元素中，`requestAnimationFrame`将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

```javascript
window.requestAnimationFrame(function (DOMHighResTimeStamp) {});
```

回调函数有一个参数，是一个相对的时间毫秒值，表示当前的刷新时间。

`requestAnimationFrame`的回调函数并不能被重复调用，这点和`setInterval`不同，它和`setTimeout`类似，回调函数只能被调用一次，只不过`setTimeout`可以自定义调用时间， `requestAnimationFrame`的调用时间则是跟着系统的刷新频率走的，所以在实现动画的时候，`setTimeout`比`requestAnimationFrame`更加灵活，` requestAnimationFrame`比`setTimeout`表现效果更加优秀。

# 3. 例子 - 两种动画对比

以在3000毫秒内移动1500px距离的动画为例

## 3.1. `setTimeout`的实现方式

```javascript
<div id="div" style="width:100px; height:100px; background-color:#000; position: absolute;left:0; top:0;">
    
</div>

<script type="text/javascript">
let divEle = document.getElementById("div");

const distance = 1500;
const timeCount = 3000;

const intervalTime = 10;
let runCount = timeCount / intervalTime;
let moveValue = distance / runCount;

function handler() {
    let left = parseInt(divEle.style.left);
    if(left >= distance) {
        return;
    }
    divEle.style.left = left + moveValue;
    window.setTimeout(handler, intervalTime);
}

window.setTimeout(handler, intervalTime);
</script>
```

以上代码通过`setTimeout`每10毫秒为间隔时间改变一次元素的位置以实现元素的动画效果， 当然， 可以通过改变这个间隔时间来微调动画效果，可是你永远没有办法确定最优方案，因为它总会和刷新频率存在交叉。

## 3.2. 通过`requestAnimationFrame`我们可以给出更好的解决方案

```javascript
<div id="div" style="width:100px; height:100px; background-color:#000; position: absolute;left:0; top:0;">
    
</div>

<script type="text/javascript">

let divEle = document.getElementById("div");

const distance = 1500;
const timeCount = 3000;

function handler( time ) {
    if(time > timeCount) {
        time = timeCount;
    }
    divEle.style.left = time * distance / timeCount;  
    window.requestAnimationFrame( handler );
}

 window.requestAnimationFrame( handler );
</script>
```

如同`setTimeout`，`handler`函数也会被递归的重复调用，只是它的调用和显示的刷新频率是一致的，因此动画效果更加顺滑自然，也能找到性能和效果的最佳均衡点，得到最有的解决方案。

# 4. 例子 - MDN 上的例子

## 4.1. MDN 上的例子

```javascript
const element = document.getElementById('some-element-you-want-to-animate');
let start, previousTimeStamp;
let done = false

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // 这里使用 `Math.min()` 确保元素刚好停在 200px 的位置。
    const count = Math.min(0.1 * elapsed, 200);
    element.style.transform = 'translateX(' + count + 'px)';
    if (count === 200) done = true;
  }

  if (elapsed < 2000) { // 在两秒后停止动画
    previousTimeStamp = timestamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);

```

## 4.2. 往复动画

```javascript
<!doctype html>
<html lang="en">

<head>
  <title>Document</title>
  <style>
    #e {
      width: 100px;
      height: 100px;
      background: red;
      position: absolute;
      left: 0;
      top: 0;
      zoom: 1;
    }
  </style>
</head>

<body>
  <div id="e"></div>

  <script>
    const element = document.getElementById('e');
    let start, previousTimeStamp;
    let [goTo, backFrom] = [true, false]
    let animateTime = 2000

    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      if (goTo) {
        const count = Math.min(0.1 * elapsed, 200);
        element.style.transform = 'translateX(' + count + 'px)';
        if (count === 200) {
          goTo = false;
          backFrom = true;
          start = timestamp;
        }
      }
      if (backFrom) {
        const elapsed = timestamp - start
        const count = Math.max(200 - 0.1 * elapsed, 0)
        element.style.transform = 'translateX(' + count + 'px)';
        if (count === 0) {
          goTo = true;
          backFrom = false;
          start = timestamp;
        }
      }
      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step);

  </script>
</body>

</html>
```

# 5. 取消 rAF 

怎么停止`requestAnimationFrame`？是否有类似`clearInterval`这样的类似方法？

第一个问题：答案是确定的 必须有：`cancelAnimationFrame()`接收一个参数 `requestAnimationFrame`默认返回一个id，`cancelAnimationFrame`只需要传入这个id就可以停止了。

```javascript
<body>
  <div id="div" style="transform: translateX();width:100px; height:100px; background-color:#000; position: absolute;left:0; top:0;">

  </div>

  <script>

    let divEle = document.getElementById("div");
    let flag = true;
    let left = 0;

    let rafId = undefined;

    function render() {
      if (flag) {
        if (left > 200) {
          flag = false
        }
        divEle.style.transform = `translateX(${left++}px)`
      } else {
        if (left < 0) {
          flag = true
        }
        divEle.style.transform = `translateX(${left--}px)`
      }
    }

    // 其实这里用 IIFE 立即调用函数表达式 不太好，这样第一个time是undefined，可能有特地需求需要取time值
    (function animloop(time) {
      console.log(time);
      // setInterval(render, 1000/90); // setInterval 方法
      render()
      // setTimeout(animloop, 1000/90) // setTimeout 方法
      rafId = window.requestAnimationFrame(animloop) // RAF 方法
      if (left === 50) {
        cancelAnimationFrame(rafId);
      }
      // RAF 基本 setTimeout 用法是一样的
    })()


  </script>
</body>

```

# 6. 降低 rAF 动画频率

默认情况下，`requestAnimationFrame`执行频率是1000/60,大概是16ms多执一次。

如果我们想每50ms执行一次怎么办呢？

`requestAnimationFrame`执行条件类似递归调用 （说的是类似）别咬我，既然这样的话我们能否自定一个时间间隔再执行呢？当然定时器这么low的东西我们就不考虑了，都已经抛弃它用rAF了（都快结束了我才想起写简写太他妈长了），
这个思路来源于我几年前搞IM的一个项目，服务端推送消息为了减小包的大小不给时间戳，这个我们做前端的都知道，我们虽然很牛逼 不过用户更牛逼，万一改了时间就不好玩了。

解决方案是 当和服务端通信时 记录下一个时间差，（时间差等于服务端时间-本地时间）不管正负我们只要这个时间差。这样每当我们接受到消息 或者发送消息的时候我们就拿本地时间和是价差相加。这样就可以保证和服务端时间是一致的了，思路是不是很牛逼哈哈。

撤了半天我们通过以上思路来解决下rAF改变间隔的问题


```javascript
<!doctype html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        #e{
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            left: 0;
            top: 0;
            zoom: 1;
        }
    </style>
</head>
<body>
<div id="e"></div>
<script>


    var e = document.getElementById("e");
    var flag = true;
    var left = 0;
    //当前执行时间
    var nowTime = 0;
    //记录每次动画执行结束的时间
    var lastTime = Date.now();
    //我们自己定义的动画时间差值
    var diffTime = 40;

    function render() {
        if(flag == true){
            if(left>=100){
                flag = false
            }
            e.style.left = ` ${left++}px`
        }else{
            if(left<=0){
                flag = true
            }
            e.style.left = ` ${left--}px`
        }
    }
    
    // 其实这里用 IIFE 立即调用函数表达式 不太好，这样第一个time是undefined，可能有特地需求需要取time值
    //requestAnimationFrame效果
    (function animloop() {
        //记录当前时间
        nowTime = Date.now()
        // 当前时间-上次执行时间如果大于diffTime，那么执行动画，并更新上次执行时间
        if(nowTime-lastTime > diffTime){
            lastTime = nowTime
            render();
        }
        requestAnimationFrame(animloop);

    })()
</script>
</body>
</html>
```

# 7. 改进一下上面例子的代码

1. 用 IIFE 立即调用函数表达式可能不太好，这样第一个time是undefined，可能有特地需求需要取time值
2. 不用使用额外代码获取时间戳，因为回调函数就有time了。

```javascript
    var e = document.getElementById("e");
    var flag = true;
    var left = 0;
    //我们自己定义的动画时间差值
    var diffTime = 10;

    let prevTime = undefined;

    /**
     * 省略
     */

    //requestAnimationFrame效果
    function animloop(time) {
      if (prevTime === undefined) {
        prevTime = time;
      }
      // 当前时间-上次执行时间如果大于diffTime，那么执行动画，并更新上次执行时间
      if (time - prevTime> diffTime) {
        prevTime = time
        render();
      }
      requestAnimationFrame(animloop);
    }

    requestAnimationFrame(animloop)
```


# 8. 参考

- [window.requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
- [requestAnimationFrame详解](https://www.jianshu.com/p/fa5512dfb4f5)
- [requestAnimationFrame的作用及使用](https://www.jianshu.com/p/a4edf06b2f19)