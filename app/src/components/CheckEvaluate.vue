<template>
    <div id="checkevaluate">
        <div>{{ $route.path }} </div>
        <dir>mode: {{ mode }} </dir>
        <div v-if="!$route.path.indexOf('/checkevaluate/u/')"><h2>ユーザ評価画面</h2></div>
        <div v-if="!$route.path.indexOf('/checkevaluate/e/')"><h2>イベント評価画面</h2></div>
        
        <h2>評価確認</h2>
        <div id="evaluation">
            <div v-if="mode == 'e'">
                <h3>イベント名: {{ evaluation.eventlist[0].event_name }} </h3>
                <h4>評価</h4>
                <div>
                    <h6>固定軸評価</h6>
                    <ul>
                        <li>前に踏み出す力: {{ avgAct }}</li>
                        <li>考え抜く力: {{ avgThink }}</li>
                        <li>チームで働く力: {{ avgTeam }}</li>
                    </ul>
                </div>
                <div>
                    <h6>自由軸評価</h6>
                    <ul>
                        <li v-for="(v, k) in freeEval" v-bind:key="k">
                            {{ k }} : {{ v }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else-if="mode == 'u'">
                <h3>氏名: {{ evaluation.username }} </h3>
                <h4>評価</h4>
                <div>
                    <h6>固定軸評価</h6>
                    <ul>
                        <li>前に踏み出す力: {{ avgAct }}</li>
                        <li>考え抜く力: {{ avgThink }}</li>
                        <li>チームで働く力: {{ avgTeam }}</li>
                    </ul>
                </div>
                <div>
                    <h6>自由軸評価</h6>
                    <ul>
                        <li v-for="(v, k) in freeEval" v-bind:key="k">
                            {{ k }} : {{ v }}
                        </li>
                    </ul>
                </div>
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
            evaluation: {},
            
        }
    },
    created: async function(){
        let m= this.$route.params.mode
        if( m === 'u'){this.mode= m}
        else if ( m === 'e'){this.mode= m}
        else {location.href= '/mypage'}

        let edata;
        if(m === 'e'){
            edata=  await fetch('/api/eConfirmation?event_id='+ this.$route.params.id).then(response=>response.json())
        }
        else if(m === 'u'){
            edata= await fetch('/api/saiyoumypage?email='+ this.$route.params.id).then(response=> response.json())
        }
        this.evaluation= edata
    },
    computed: {
        avgAct: function(){
            if(this.evaluation.ts === undefined){return -1}
            return ( this.evaluation.ts[0].action+ this.evaluation.ss[0].action)/2
        },
        avgThink: function(){
            if(this.evaluation.ts === undefined){return -1}
            return ( this.evaluation.ts[1].think + this.evaluation.ss[1].think)/2
        },
        avgTeam: function(){
            if(this.evaluation.ts === undefined){return -1}
            return ( this.evaluation.ts[2].team+ this.evaluation.ss[2].team)/2
        },
        // 自由軸評価が12種の前提
        freeEval: function(){ 
            let total={};
            for(let i= 0; i< 12; i++){
                total[this.evaluation.social[i].name]= (this.evaluation.social[i].count+ this.evaluation.social2[i].count);
            }
            return total;
        }
    }
}
</script>