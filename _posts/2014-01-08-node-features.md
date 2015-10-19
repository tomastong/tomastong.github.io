---
layout: post
title: "Node 特性"
description: ""
category: "Node"
tags: [Node]
---

{% include JB/setup %}

## 单线程

我们先来回顾一下进程与线程的相关概念。

进程是程序运行的实例。

线程是操作系统能够进行运算调度的最小单位，它被包含于进程中，是进程中的实际运作单位，一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程并行执行不同的任务。

例如：当你启动QQ时，会生成一个QQ进程，再启动Word，会生成一个Word进程。一个QQ进程中有负责接受消息的线程、发送消息的线程、渲染显示界面的线程等。同理Word进程中也有多个线程。假设你的电脑是单核CPU，那么在同一时刻，只能有一个进程中的一个线程在CPU上运行。但为什么我们感觉所有的程序在同时运行呢？那是因为操作系统负责调度进程与线程的运行，使得CPU在不同的进程与线程中快速轮流切换执行(实际上并不是公平的轮流执行)，从而让用户感觉所有的程序都在同时运行一样。

Node是单线程的，也就是说一个Node进程中只有一个线程，在同一时间内，只能执行我们写的一句代码。

但对于异步操作，是由Node在其它线程中完成的，所以不会阻塞我们主线程的执行，Node本身是事件驱动，一个异步操作完成会被放到一个事件队列中，Node通过事件轮训(Event Loop)这个队列，然后在主线程中执行响应的回调函数。

那么Node单线程又是如何实现并行的呢？其实上一段已近给出了答案，那就是事件轮训(Event Loop)，只要每个回调函数中没有阻塞操作，那么这种快速的轮训，就可实现多个异步操作的并发，因此单线程执行和并行操作并不冲突，“我们的Node代码始终在一个线程里，然而除了我们的代码一切都是并行的”。

所以我们要避免在主线程中出现阻塞操作，否则会影响并发、降低响应速度。

例如，某个事件的回调函数中要进行复杂的计算，占用CPU200毫秒，那么事件循环中所有的请求都要等待200毫秒。为了提高响应速度，你需要把这个计算密集的部分拆成若干个逻辑或改为异步。

单进程，单线程，只支持单核CPU，不能充分的利用多核CPU服务器，必须通过多进程的方法才能充分利用多核资源。


## 异步、回调函数、非阻塞I/O、事件驱动

我们先来看两个小例子：

<script src="https://gist.github.com/KJlmfe/8346301.js"></script>

fs.readFileSync执行时，是同步I/O请求，需要等待文件读取结束后，才能执行后面的语句，属于阻塞I/O。

<script src="https://gist.github.com/KJlmfe/8346174.js"></script>

fs.readFile执行时，只是将异步I/O请求发送给了操作系统，然后会立即返回执行后面的语句，属于非阻塞I/O，当异步I/O执行结束后，会触发I/O完成事件，Node通过事件轮训机制检测到有事件完成时，执行对应的回调函数。

在Node中，大量API都是这种异步风格，通过事件驱动调用回调函数。


## 高并发

Node基于事件驱动的编程模型以及异步、非阻塞I/O等特性，使得Node适用于高并发的场景，但由于单线程模型，Node不适用于运算密集的业务。

推荐阅读：[http://www.cnblogs.com/sysuys/p/3460614.html](http://www.cnblogs.com/sysuys/p/3460614.html)


## NPM

Node本身只提供一些精简[API](http://nodejs.org/api/)集合，而真正让Node提供强大的功能的是Ryan提出了[NPM (Node Packaged Module) ](https://npmjs.org/)（暂且称作“模块”）的概念，并创建了一整套的模块发布、安装、依赖管理机制，从而Node具有了可扩展性，这使得全世界更多的Node爱好者可以通过NPM为Node贡献更多的模块。

目前知名的模块有：[express](https://npmjs.org/package/express)、[async](https://npmjs.org/package/async)、[grunt](https://npmjs.org/package/grunt)、[connect](https://npmjs.org/package/connect)等，为了避免重复制造轮子，模块之间还可以相互依赖，例如：[express](https://npmjs.org/package/express)依赖于[connect](https://npmjs.org/package/connect)。[NPM](https://npmjs.org/)为Node的成功起到了不可磨灭的作用。

## 模块

[NPM](https://npmjs.org/)通过模块的形式为Node带来了更多的API，其实Node原生API也是通过模块的形式提供给开发者使用的。Node中模块可分为核心模块和第三方模块，核心模块是Node内置模块，通常存在于Node安装路径中的lib目录下，第三方模块则是通过[NPM](https://npmjs.org/)发布、管理、安装。

核心模块与第三方模块使用举例：

<script src="https://gist.github.com/KJlmfe/8311946.js"></script>

上例中出现的`require`是Node中加载模块的全局函数，那么Node是如何寻找到对应模块的呢？大致规则如下：

在路径Y中使用`require(X)`：

1.如果X是核心模块，命中结束

2.如果X以`./ or / or ../`开头，加载相对目录下的第三方模块

3.加载node_module目录下的第三方模块

4.抛出异常`"not found"`

[点击查看详细的规则描述](http://nodejs.org/api/modules.html#modules_all_together)


## Google V8引擎 

Node本身运行于V8 JavaScript。V8 JavaScript引擎是Google用于其Chrome浏览器的底层JavaScript引擎。Google使用V8创建了一个用C++编写的超快解释器，V8 会编译/执行 JavaScript 代码，管理内存，负责垃圾回收，与宿主语言的交互等，该解释器拥有另一个独特特征：您可以下载该引擎并将其嵌入任何应用程序。V8 JavaScript引擎并不仅限于在一个浏览器中运行。因此，Node实际上使用Google编写的V8 JavaScript引擎，并将其重建为可在服务器上使用。
