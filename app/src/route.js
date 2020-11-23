import Vue from 'vue'
// vue router
import VueRouter from 'vue-router'
// 各種コンポーネント
import Top from './components/Top.vue'
import Mypage from './components/Mypage.vue'

Vue.config.productionTip = false

// プラグインとして登録
Vue.use(VueRouter)

// ルーティング定義
const router = new VueRouter({
    routes: [
        // $BASE_URL$/のときはIndexコンポーネントを呼び出す
        { path: '/', component: Top },
        { path: '/mypage', component: Mypage },

    ]
});

export default router