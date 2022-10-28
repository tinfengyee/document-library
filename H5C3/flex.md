# flex <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-09-16 11:05:58
> LastEditTime: 2022-09-16 11:34:08
> Description: NO Desc

> [Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

# 容器的属性

```css
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
---
place-items: center;
place-content: center;
```

## `flex-direction`

`flex-direction`属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row(default) | row-reverse | column | column-reverse;
}
```

## `flex-wrap`

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap(default) | wrap | wrap-reverse;
}
```

## `flex-flow`

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

## `justify-content`

`justify-content`属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start(default) | flex-end | center | space-between | space-around | space-evenly;
}
```

可能取值

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
- space-evenly：均匀排列每个元素,'auto'-sized 的元素会被拉伸以适应容器

## `align-items`

`align-items`属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

## `align-content`

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch(default);
}
```

## `place-items`

[`place-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-items) 是一个简写属性 ，它允许你在相关的布局（如 Grid 或 Flexbox）中可以同时沿着块级和内联方向对齐元素 (例如：`align-items` 和 `justify-items` 属性)。。是`justify-items`。。。如果未提供第二个值，则第一个值作为第二个值的默认值。

```css
place-items : <'align-items'> <'justify-items'>
place-items: center;
```


## `place-content`

[`place-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-content) 属性是`align-content` 和 `justify-content`的简写。使用这两个属性的值可以用于任何的布局情况。

```css
place-content:<'align-content'> <'justify-content'>
```

用于与`place-items`配合使用

```css
place-items: center;
place-content: center;
```

# 项目的属性

以下6个属性设置在项目上。

```css
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

## `order`

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为`0`。

```css
.item {
  order: <integer>;
}
```

## `flex-grow`

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## `flex-shrink`

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

## `flex-basis`

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

## `flex`

flex属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

## `align-self`

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为auto，表示继承父元素的`align-items`属性，如果没有父元素，则等同于stretch。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```