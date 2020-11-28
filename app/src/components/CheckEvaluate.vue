<template>
    <div id="checkevaluate">
        <div>{{ $route.path }} </div>
        <dir>mode: {{ mode }} </dir>
        <div v-if="!$route.path.indexOf('/checkevaluate/u/')"><h2>ユーザ評価画面</h2></div>
        <div v-if="!$route.path.indexOf('/checkevaluate/e/')"><h2>イベント評価画面</h2></div>
        
        <h2>評価確認</h2>
        <div id="evaluation">
            <div id="fixed_axis">
                固定軸評価
                <ul>
                    <li>アクション力 {{ evaluation.act }} </li>
                    <li>思考力 {{ evaluation.think }}</li>
                    <li>チーム力 {{ evaluation.team }} </li>
                </ul>
            </div>
            <div id="free_axis">
                自由軸評価
                <!-- 自由軸評価の出力方法も考えなきゃ -->
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>

<script>
// TODO イベントごとの評価と個人の評価を取得するモードで切り替える
export default {
    name: 'checkevaluate',
    // アロー関数だとthisが機能しないためここではfunctionで返す
    data: function(){
        return{
            mode: '',
            name: 'イベント名 or ユーザ名',
            evaluation: {
                act: 5,
                think: 3,
                team: 4,
                // 自由軸評価も
                comments: [
                    'ここがすごい',
                    'あれがよかった',
                    'リードしてくれた',
                ]
            },
            
        }
    },
    created: function(){
        if(!this.$route.path.indexOf('/checkevaluate/u/')){this.mode= 'u'}
        else if (!this.$route.path.indexOf('/checkevaluate/e/')){this.mode= 'e'}

    }
    
}
</script>