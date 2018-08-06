// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import 'element-ui/lib/theme-chalk/carousel.css';
import 'element-ui/lib/theme-chalk/carousel-item.css';


import { Carousel, CarouselItem } from 'element-ui';

Vue.config.productionTip = false

Vue.use(Carousel);
Vue.use(CarouselItem);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
