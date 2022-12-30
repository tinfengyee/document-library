通过FileReader将文件转成Base64编码

新建img，将其 src 指向刚刚的Base64

新建 canvas ，将 img 画到 canvas上(调用ctx.drawImage(img, 0, 0,w,h))

通过 canvas （toDataURL(mimeType,quality)）输出压缩后的图片

最后 base64 数据转换成 Blob 或者 File 文件流



上传图片可能会出出现旋转90度问题，使用exif库获取旋转信息，使用ctx.rotate 旋转