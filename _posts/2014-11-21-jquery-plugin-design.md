---
layout: post
title: jQuery插件开发之extend函数
category: jQuery
tags: [jQuery, plugin]
---

偶然间看到jQuery插件开发，只看懂了一部分，不过觉得蛮有用的，八个字，“相同‘覆盖’，不同合并”的原理
![]({{ site.imgs_url }}jquery-extend.jpg)
## 1、jQuery.extend()
把两个或者更多的对象合并到第一个当中，扩展jQuery方法

* jQuery.extend( target, object1, objectN )

接收多个对象作为参数，如果只有一个参数，则把这个对象的属性方法附加到jQuery上，如果含有多个参数，则把后面的对象的属性和方法附加到第一个对象上。