# css元素水平垂直居中 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-08 01:36:25
> LastEditTime: 2022-12-08 02:44:36
> Description: NO Desc

## 1. 前言

一般常用水平或垂直居中主要使用的属性为[margin](https://so.csdn.net/so/search?q=margin&spm=1001.2101.3001.7020)、`position:absolute;`、`transform`、`flex`、`vertical-align`、`ext-align`、`line-height`…

## 2. 水平居中

1. 若是行内元素, 给其父元素设置 `text-align:center`,即可实现行内元素水平居中.

2. 若是块级元素, 该元素设置 `margin:0 auto`即可.

3. 使用CSS3中新增的`transform`属性, 子元素设置如下:

   ```css
   .child {
     position: absolute;
     left: 50%;
     transform: translate(-50%,0);
   }
   ```

4. 使用flex弹性布局的`justify-content`属性, 父元素设置如下:

   ```css
   .parent {
     display: flex;
     justify-content: center;
     /* place-content: center; */
   }
   ```

5. 使用绝对定位方式, 以及`left:0;right:0;margin:0 auto; `子元素设置如下:

   ```css
   .son{
       position:absolute;
       left:0;
       right:0;
       margin:0 auto;
   }
   ```

6. 使用绝对定位方式, 以及负值的 `margin-left` , 子元素设置如下:

   ```css
   .child {
       position:absolute;
       width:固定;
       left:50%;
       margin-left:-0.5宽度;
   }
   ```

7. 若子元素包含 `float:left` 属性, 为了让子元素水平居中, 则可让父元素宽度设置为 `fit-content`,并且配合 `margin`, 作如下设置:

   ```css
   .parent{
       width: -moz-fit-content;
       width: -webkit-fit-content;
       width:fit-content;
       margin:0 auto;
   }
   ```

## 3. 垂直居中

1. 若元素是单行文本, 则可设置 `line-height`等于父元素高度

2. 可用 `transform` , 设置父元素相对定位(`position:relative`), 子元素样式:

   ```css
   .child {
       position:absolute;
       top:50%;
       transform: translate(0,-50%);
   }
   ```

3. flex 弹性布局

   ```css
   .parent{
     display: flex;
     align-items: center;
   }
   ```

4. 设置父元素相对定位(`position:relative`), 子元素如下css样式:

   ```css
   .son{
       position:absolute;
       top:0;
       bottom:0;
       margin:auto 0;
   }
   ```

5. 元素高度固定,设置父元素相对定位(`position:relative`), 子元素如下css样式:

   ```css
   .child {
       position:absolute;
       top:50%;
       height:固定;
       margin-top:-0.5x高度;
   }
   ```

6. 可用 `vertical-align` 属性, 而 `vertical-align` 只有在父层为 td 或者 th 时, 才会生效, 对于其他块级元素, 例如 div、p 等, 默认情况是不支持的. 为了使用 `vertical-align` , 我们需要设置父元素`display:table` , 子元素 `display:table-cell;vertical-align:middle;`

## 4. 水平垂直居中

1. 利用position和transform，设置父元素相对定位(`position:relative`)

   ```css
   .child {
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-50%,-50%);
   }
   ```

2. 利用position和margin，设置父元素相对定位(`position:relative`)

   ```css
   .child {
     position: absolute;
     left: 0;
     right: 0;
     top: 0;
     bottom: 0;
     margin: auto;
   }
   ```

3. 使用flex弹性布局

   ```css
   .parent {
     display: flex;
     align-items: center;
     justify-content: center;
    /* place-content: center;
       place-items: center; */
   }
   ```

4. 使用 `display: table-cell;`

   ```css
   .parent {
     width: 300px;
     height: 300px;
     background-color: #cccccc;
     display: table-cell;
     vertical-align: middle;
     /* 水平居中： 行内块元素用这个 */
     /* text-align: center;  */
   }
   .child {
     height: 100px;
     width: 50%;
     background-color: blue;
     /* 块级元素 要同这个 */
     margin: 0 auto;
     /* display: inline-block; */
   }
   ```

   > 如果你不给display:table-cell的父亲或祖先节点设置display:table，浏览器会创建匿名的table-row框和table块框/table内联框出来。[display：table 和 display:table-cell 需要一起用吗？](http://www.imooc.com/wenda/detail/538545)

## 5. 参考资料

- [x] [css元素水平垂直居中详解](https://blog.csdn.net/tinfengyee/article/details/105671049)