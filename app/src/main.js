import Vue from 'vue'
import App from './App.vue'
// ルーティング読み込み
import router from './route.js'

Vue.config.productionTip = false

new Vue({
    router, //定義したrouterを読み込んでもらう
    render: h => h(App),
}).$mount('#app')