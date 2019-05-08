import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
Vue.use(Vant);


// options 为可选参数，无则不传
Vue.use(Lazyload, {});
