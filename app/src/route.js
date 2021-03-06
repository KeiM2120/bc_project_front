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
import Evaluate from './components/Evaluate.vue'
import CreateEvent from './components/CreateEvent.vue'
import CheckEvaluate from './components/CheckEvaluate.vue'

Vue.config.productionTip = false

// プラグインとして登録
Vue.use(VueRouter)

// ルーティング定義
const router = new VueRouter({
    mode: 'history',
    routes: [
        // $BASE_URL$/のときはIndexコンポーネントを呼び出す
        { path: '/', component: Top },
        { path: '/mypage', component: Mypage },
        { path: '/eventlist', component: Eventlist },
        { path: '/event/:id', component: Eventpage, name: 'Event' },
        { path: '/event', redirect: '/eventlist' },
        { path: '/profile', component: Profile },
        { path: '/attendance/:event_id', component: Attendance },
        { path: '/attendance', redirect: '/eventlist' },
        { path: '/evaluate/:event_id/:target_id', component: Evaluate },
        { path: '/createevent', component: CreateEvent },
        { path: '/checkevaluate/:mode/:id', component: CheckEvaluate },

        { path: '*', redirect: '/' },
    ]
});

export default router