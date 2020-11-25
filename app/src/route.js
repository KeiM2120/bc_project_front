import Vue from 'vue'
// vue router
import VueRouter from 'vue-router'
// 各種コンポーネント
import Top from './components/Top.vue'
import Mypage from './components/Mypage.vue'
import Eventlist from './components/Eventlist.vue'
import Eventpage from './components/Event.vue'
import Profile from './components/Profile.vue'
import Attendance from './components/Attendance.vue'

Vue.config.productionTip = false

// プラグインとして登録
Vue.use(VueRouter)

// ルーティング定義
const router = new VueRouter({
    routes: [
        // $BASE_URL$/のときはIndexコンポーネントを呼び出す
        { path: '/', component: Top },
        { path: '/mypage', component: Mypage },
        { path: '/eventlist', component: Eventlist },
        { path: '/event/:id', component: Eventpage },
        { path: '/event', redirect: '/eventlist' },
        { path: '/profile', component: Profile },
        { path: '/attendance/:event_id', component: Attendance },
        { path: '/attendance', redirect: '/eventlist' },
        { path: '*', redirect: '/' },
    ]
});

export default router