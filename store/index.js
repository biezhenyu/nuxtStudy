import Vue from 'vue'
import Vuex from 'vuex';
import student from './modules/student';

Vue.use(Vuex);

export const store = () => new Vuex.Store({
  modules: {
    student
  },
  actions: {

  }
})
