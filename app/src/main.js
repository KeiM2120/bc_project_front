import Vue from 'vue'
import App from './App.vue'
// vue router
import VueRouter from 'vue-router'
// 各種コンポーネント(一回サンプルソースに従って実装)
import Index from './components/Index.vue'
import BookList from './components/BookList.vue'
// import Book from './components/Book.vue'
// import BookReview from './components/BookReview.vue'

Vue.config.productionTip = false

// プラグインとして登録
Vue.use(VueRouter)

// ルーティング定義
const router = new VueRouter({
    routes: [
        // $BASE_URL$/のときはIndexコンポーネントを呼び出す
        { path: '/', component: Index },
        { path: '/book-list', component: BookList },

        /*        
                // $BASE_URL$/book/123のときは、Bookのコンポーネントを呼び出し、123をパラメータとして取得
                {
                    path: '/book/:id',
                    name: 'book',
                    component: Book,
                    // パラメータを数値型へキャストしてコンポーネントへ渡す
                    props: route => ({
                        id: Number(route.params.id)
                    }),
                    // $BASE_URL$/book/123/* のURL定義
                    /children: [{
                        path: 'review/:review_id',
                        name: 'book-review',
                        component: BookReview,
                        props: route => ({
                            review_id: Number(route.params.review_id)
                        })
                    }]
                },
        */
    ]
});



new Vue({
    router, //定義したrouterを読み込んでもらう
    render: h => h(App),
}).$mount('#app')