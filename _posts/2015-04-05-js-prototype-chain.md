---
layout: post
title: Javascript原型链
category: js
tags: [js,继承]
---

学习Javascript中，最难又最相似的两点，恐怕就是`原型链`和`作用域链`了，这里主要谈论一下原型链，[作用域链]({{ BASE_PATH }}/archive/2015/02/05/js-scope-chain)见之前的文章。

###1,原型模式

了解原型模式，就得先理解原型这个概念，“无论什么情况，只要创建一个函数，根据相应规则，就会为该函数创建一个prototype属性。默认，所有的prototype属性都会自动获得1个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。”<br/><br/>下面通过代码来理解一下：

{% highlight js %}
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
	alert(this.name);
};
var person1 = new Person();
person1.sayName();             // Nicholas
var person1 = new Person();
person1.sayName();             // Nicholas          
alert(person1.sayName == person2.sayName);      // true
{% endhighlight %}

这里，我们将属性和sayName函数直接添加在Person的prototype属性上，构造函数为空，依然可以创建新对象。从上面的运行结果可以看出，person1和person2访问的都是同一组属性和同一个sayName函数。<br/><br/>
当调用构造函数创建一个实例，该实例的内部将包含一个指针（内部属性），指向构造函数的原型属性，名字是`_proto_`。重要的是，连接存在于实例和构造函数的原型属性之间，而不是实例和构造函数之间。图6-1所示：Person.prototype指向了原型对象，Person.prototype.constructor又指向了Person。原型对象除了包含constructor属性，还包含后来添加属性。
![]({{ site.imgs_url }}prototype-model.jpg)

###2,原型链继承

基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。<br/>
实现原型链有一种基本模式，代码如下：
{% highlight js %}
function SuperType(){
	this.property = true;
}
SuperType.prototype.getSuperValue = function(){
	alert(this.property);
}
function SubType(){
	this.subproperty = true;
}
// 继承了SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
	alert(this.subproperty);
}
var instance = new SubType();
console.dir(instance);
{% endhighlight %}

以上代码定义了SuperType和SubType两个类型，每个类型有自己的一个方法和属性，主要区别是通过将SuperType的一个实例赋给SubType.prototype来实现继承的。实现的本质是以一个新类型的实例重写原型对象，其实SuperType类也是继承Object类，这样完整的实例、构造函数和原型的关系如图6-4所示：
![]({{ site.imgs_url }}prototype-chain.jpg)
控制台打印SubType函数的实例instance，得到结果如下，与上图一一对应：

![]({{ site.imgs_url }}print-result.jpg)
其中，上面的有一部分，instance的原型中，会存在有property属性，是因为父类的`对象实例`赋给子类原型，所以才可以查看属性，而函数是属于`父类原型`中的，所以在上一层可以看到，应该是这样。

