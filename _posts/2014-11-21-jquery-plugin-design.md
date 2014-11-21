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

* jQuery.extend( target, [ object1 ] [, objectN ] )

接收多个对象作为参数，如果只有一个参数，则把这个对象的属性方法附加到jQuery上，如果含有多个参数，则把后面的对象的属性和方法附加到第一个对象上。
{% highlight js %}
var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"})
{% endhighlight %}
那么合并后
{% highlight js %}
result={name:"Jerry",age:21,sex:"Boy"}
{% endhighlight %}
* jQuery.extend( [deep ], target, object1 [, objectN ] )

第一个参数为boolean类型，细说的话，分为深复制（true），浅复制（false）
####深层复制（一层一层往下复制直到最底层）
{% highlight js %}
var result=$.extend( true,  {},  
    { name: "John", location: {city: "Boston",county:"USA"} },  
    { last: "Resig", location: {state: "MA",county:"China"} } ); 
{% endhighlight %}
结果是
{% highlight js %}
result={name:"John",last:"Resig",location:{city:"Boston",state:"MA",county:"China"}}
{% endhighlight %}

####浅层复制（只复制顶层的非object元素）
{% highlight js %}
var result=$.extend( false,  {},  
    { name: "John", location: {city: "Boston",county:"USA"} },  
    { last: "Resig", location: {state: "MA",county:"China"} } ); 
{% endhighlight %}
结果是
{% highlight js %}
result={name:"John",last:"Resig",location:{state:"MA",county:"China"}}
{% endhighlight %}

## 2、jQuery.fn.extend()
把对象挂载到jQuery的prototype属性，来扩展一个新的jQuery实例方法

* jQuery.fn.extend( object )


**HTML代码**
{% highlight html %}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery.fn.extend demo</title>
  <style>
  label {
    display: block;
    margin: .5em;
  }
  </style>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
 
<label><input type="checkbox" name="foo"> Foo</label>
<label><input type="checkbox" name="bar"> Bar</label>
 
</body>
</html>
{% endhighlight %}
**Javascript代码**
{% highlight js %} 
<script>
jQuery.fn.extend({
  check: function() {
	// this.each()返回一个jQuery对象，
    return this.each(function() {	
      this.checked = true;			// 这儿this指的是一个dom对象	
    });
  },
  uncheck: function() {
    return this.each(function() {
      this.checked = false;
    });
  }
});
 
// Use the newly created .check() method
$( "input[type='checkbox']" ).check();    // 你可以理解为‘dom对象的集合’
</script>
{% endhighlight %}

通常我们在调用的时候，常见的写法是这样的
{% highlight js %}
(function( $ ){
	// 为扩展jQuery类本身.为类添加新的方法
	$.extend(object);	
	// 给jQuery对象添加方法
	$.fn.extend(object);
})(jQuery)


{% endhighlight %}




