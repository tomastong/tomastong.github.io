---
layout: post
title: Js作用域链
category: js
tags: [js,闭包]
---

谈到js作用域链，必然离不开闭包，闭包是js一大难点，偶然在《js权威指南》上看到讲的比较详细，顺手总结一下

## 闭包（Closure）

闭包是指有权访问另一个函数作用域中的变量中的函数。创建闭包的常用方式，就是在一个函数内部创建另一个函数。注意与匿名函数的区别。

## 作用域链（The Scope Chain）

函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性是作用域，包含了函数被创建的作用域中对象的集合，称为函数的作用域链，它决定了哪些数据能被函数访问。当一个函数创建后，它的作用域链会被创建此函数的作用域中可访问的数据对象填充。[来自百度百科](http://baike.baidu.com/link?url=YPMJ2i1yawCqxt1BcjrWqF7aijhqkbdXeZ1oxUF-dhHj1phMZX8C04IOO56b9C1G65Vc5AJ5kCsULsXhFdprtq)

### EG.1
这是一个简单的例子，作用域链如7-1所示，记得在知乎上有位网友这么回答，印象非常深刻。<br/>每个函数在创建完成时，他有3个重要的内置属性（property）也同时被创建。<br/>
{<br/>
AO //活动对象，记录function内的变量，参数等信息<br/>
this // 当前对象指针，就是在调用this.xx的时候的this<br/>
scope // 指向外层函数AO的一个链(在实现的时候，可能通过数组来实现).<br/>
}<br/>
这里全局环境的变量对象一直存在，而局部环境的变量对象只有在执行的时候才存在，一般函数访问一个变量会依照作用域链去寻找，当函数执行完毕，活动对象就会被销毁，内存在仅剩全局作用域。对于这个compare()函数执行环境而言，其作用域链中包含两个变量对象，本地活动对象和全局变量对象。
显然，作用域链的本质是一个指向变量对象的指针列表，它只引用但并不包含实际变量对象。
{% highlight js %}
function compare(value1, value2){
	if(value1 < value2){
		return -1;
	}else(value1 > value2){
		return 1;
	}else{
		return 0;
	}
}
var result = compare(5, 10);
{% endhighlight %} 
![]({{ site.imgs_url }}scope-chain1.png)
### EG.2
这是一个含有匿名函数闭包的例子,作用域链如图7-2所示，这种情况和上面又有所不同，在另一个函数内部定义的函数会将包含函数（即外部函数）的活动对象添加到它的作用域链中。在匿名函数从createComparisonFunction返回后，它的作用域链被初始化为包含createComparisonFunction函数的活动对象和全局变量对象，这样，匿名函数就可以访问createComparisonFunction中定义的所有变量。更有意思的是，createComparisonFunction执行完毕，它执行环境的作用域链被销毁，但由于匿名函数的作用域链还在引用这个活动对象，其活动对象仍会留在内存中，直到匿名函数被销毁。
{% highlight js %}
function createComparisonFunction(propertyName){
	return function(object1, object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if(value1 < value2){
			return -1;
		}else(value1 > value2){
			return 1;
		}else{
			return 0;
		}
	}
}
var compare = createComparisonFunction('name');
var result = compare({ name : 'Nicholas'}, { name : 'Greg'});
{% endhighlight %} 
![]({{ site.imgs_url }}scope-chain2.png)

由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多内存，过度使用闭包导致内存占用过多，建议在绝对必要时再使用闭包。