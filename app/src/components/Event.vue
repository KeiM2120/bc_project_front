<template>
    <div id="Event">
        param: {{ $route.params.id }}
        <div>
            <h2> {{ details.event_name }}</h2>
            {{ details.start_day }}
            <h5>担当講師: {{ details.teachers }} </h5>
            <div>
                {{ details.comments }}
            </div>
        </div>
        <div>
            DEBUG:mode: {{ mode }}
            <div v-if="mode == 0">
                このイベントに <button @click="attendEvent">参加する!</button>
            </div>
            <div v-else-if="mode == 1">
                本イベントは実施期間などの理由により参加できません
            </div>
            <div v-else-if="mode == 2">
                あなたは本イベントの参加者です<br/>
                <button @click="checkAttendees">参加者を確認する</button>
            </div>
            <div v-else-if="mode == 3">
                本イベントは開催終了しております<br/>
                <button @click="checkEvaluation">自身の評価を確認する</button>
            </div>
        </div>
    </div>
    <!-- 参加ボタンどうしよう -->
</template>

<style lang="scss">
</style>

<script>
// $route.params.id でイベントidを取得して該当する情報をバックから引き出す
export default {
    name: 'event',
    data: ()=> {
        return{
            details: {},
            mode: -1,
        }
    },
    methods: {
        attendEvent: async function(){
            await fetch('/api/eventpage',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({event_id:this.$route.params.id})
                })
            .then(response => response.json())
            .then(data => {
                if(data.status == 200){
                    alert('イベント参加登録が完了しました')
                    location.reload(true);
                }
                else{
                    alert('ERROR [STATUS: '+ data.status+ '] イベント一覧ページに戻ります')
                    location.href= '/eventlist';
                }
            })
        },
        checkAttendees: function(){
            location.href= '/attendance/'+ this.$route.params.id
        },
        checkEvaluation: function(){
            alert('本機能は未実装です')
        }
    },
    created: async function(){ 
        let resData= await fetch('/api/eventpage?event_id='+this.$route.params.id).then(response=>response.json())
        this.details= resData.eventlist[0]
        // 取得したdetailsのbranchの値で動作を変える。0:未参加+参加可能, 1:未参加+参加不可, 2:参加済+参加者リストを見たい, 3:参加済+イベント終了済+評価確認ページへのリンク
        this.mode= resData.branch
        console.log('mode:'+this.mode)
    }
}
</script>

