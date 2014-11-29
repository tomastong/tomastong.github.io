---
layout: post
title: 响应式web设计
category: css
tags: [css, 响应式]
---

响应式Web设计(Responsive Web design)的理念是：集中创建页面的图片排版大小，可以智能地根据用户行为以及使用的设备环境（系统平台、屏幕尺寸、屏幕定向等）进行相对应的布局。
![]({{ site.imgs_url }}response-type.jpg)

## 1、Viewport
响应式设计第一件需要做的事情就是在head标签里指定viewport meta属性，以下是语法  
{% highlight css %}
<meta name="viewport"
03	    content="
04	        height = [pixel_value | device-height] ,
05	        width = [pixel_value | device-width ] ,
06	        initial-scale = float_value ,
07	        minimum-scale = float_value ,
08	        maximum-scale = float_value ,
09	        user-scalable = [yes | no] ,
10	        target-densitydpi = [dpi_value | device-dpi | high-dpi | medium-dpi | low-dpi]
11	    "
12	/> 
{% endhighlight %} 
**width**

控制 viewport 的大小，可以指定的一个值或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。

**height**

和 width 相对应，指定高度。

**target-densitydpi**

一个屏幕像素密度是由屏幕分辨率决定的，通常定义为每英寸点的数量（dpi）。Android支持三种屏幕像素密度：低像素密度，中像素密度，高像素密度。一个低像素密度的屏幕每英寸上的像素点更少，而一个高像素密度的屏幕每英寸上的像素点更多。Android Browser和WebView默认屏幕为中像素密度。

下面是 target-densitydpi 属性的 取值范围

device-dpi –使用设备原本的 dpi 作为目标 dp。 不会发生默认缩放。

high-dpi – 使用hdpi 作为目标 dpi。 中等像素密度和低像素密度设备相应缩小。

medium-dpi – 使用mdpi作为目标 dpi。 高像素密度设备相应放大， 像素密度设备相应缩小。 这是默认的target density.

low-dpi -使用mdpi作为目标 dpi。中等像素密度和高像素密度设备相应放大。

value – 指定一个具体的dpi 值作为target dpi. 这个值的范围必须在70–400之间。

为了防止Android Browser和WebView 根据不同屏幕的像素密度对你的页面进行缩放，你可以将viewport的target-densitydpi 设置为 device-dpi。当你这么做了，页面将不会缩放。相反，页面会根据当前屏幕的像素密度进行展示。在这种情形下，你还需要将viewport的width定义为与设备的width匹配，这样你的页面就可以和屏幕相适应。

**initial-scale**

初始缩放。即页面初始缩放程度。这是一个浮点值，是页面大小的一个乘数。例如，如果你设置初始缩放为“1.0”，那么，web页面在展现的时候就会以target density分辨率的1:1来展现。如果你设置为“2.0”，那么这个页面就会放大为2倍。

**maximum-scale**

最大缩放。即允许的最大缩放程度。这也是一个浮点值，用以指出页面大小与屏幕大小相比的最大乘数。例如，如果你将这个值设置为“2.0”，那么这个页面与target size相比，最多能放大2倍。

**user-scalable**

用户调整缩放。即用户是否能改变页面缩放程度。如果设置为yes则是允许用户对其进行改变，反之为no。默认值是yes。如果你将其设置为no，那么minimum-scale 和 maximum-scale都将被忽略，因为根本不可能缩放。

所有的缩放值都必须在0.01–10的范围之内。

(设置屏幕宽度为设备宽度，禁止用户手动调整缩放)

{% highlight css%} 
 <meta name="viewport" content="width=device-width,user-scalable=no" />
{% endhighlight %} 

(设置屏幕密度为高频，中频，低频自动缩放，禁止用户手动调整缩放)

{% highlight css%} 
<meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
{% endhighlight %} 

## 2、Media
通过在引入样式表时使用media属性可以控制什么尺寸的屏幕使用哪个样式表，于是我们可以实现手机访问时下载手机版样式，电脑访问时下载正常样式。
有以下两种引用方式
{% highlight css %}
<link rel="stylesheet" href="style.css" media="screen and (min-width:400px)">
{% endhighlight %}
 
{% highlight css %}
<style>
@media screen and (min-width:400px){
	#page{
		width:100px;
		font-size:12px;
	}
}
</style>
{% endhighlight %}

media是关键字，(min-width: 400px)媒体特性，其被放置在一对圆括号中，
screen是媒体类型，在css2.1中，一共有十种

  * all	用于所有的媒介设备。
  * aural	用于语音和音频合成器。
  * braille	用于盲人用点字法触觉回馈设备。
  * embossed	用于分页的盲人用点字法打印机。
  * handheld	用于小的手持的设备。
  * print	用于打印机。
  * projection	用于方案展示，比如幻灯片。
  * screen	用于电脑显示器。
  * tty	用于使用固定密度字母栅格的媒介，比如电传打字机和终端。
  * tv	用于电视机类型的设备。
  
###not关键字
{% highlight css %}
  <link rel="stylesheet" media="not print and (max-width: 1200px)" href="print.css" type="text/css" />
{% endhighlight %}
  not关键字是用来排除某种制定的媒体类型，换句话来说就是用于排除符合表达式的设备。

###only关键字
{% highlight css %}
  <link rel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" type="text/css" />
{% endhighlight %}
  only用来定某种特定的媒体类型，可以用来排除不支持媒体查询的浏览器。其实only很多时候是用来对那些不支持Media Query但却支持Media Type的设备隐藏样式表的。
其主要有：支持媒体特性（Media Queries）的设备，正常调用样式，此时就当only不存在；对于不支持媒体特性(Media Queries)但又支持媒体类型(Media Type)的设备，这样就会不读了样式，
因为其先读only而不是screen；另外不支持Media Qqueries的浏览器，不论是否支持only，样式都不会被采用。

###其他

在Media Query中如果没有明确指定Media Type，那么其默认为all，如：
{% highlight css %}
  <link rel="stylesheet" media="(min-width: 701px) and (max-width: 900px)" href="medium.css" type="text/css" />
{% endhighlight %}
  另外还有使用逗号（，）被用来表示并列或者表示或，如下
{% highlight css %}
  <link rel="stylesheet" type="text/css" href="style.css" media="handheld and (max-width:480px), screen and (min-width:960px)" />
{% endhighlight %}
  上面代码中style.css样式被用在宽度小于或等于480px的手持设备上，或者被用于屏幕宽度大于或等于960px的设备上。
关于Media Query的使用这一节就介绍到此，最后总体规纳一下其功能，个人认为就是一句话：Media Queries能在不同的条件下使用不同的样式，使用页面达到不同的渲染效果。  
  
