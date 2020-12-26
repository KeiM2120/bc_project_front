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
    created: async function(){ 
        let resData= await fetch('/api/eventpage?event_id='+this.$route.params.id).then(response=>response.json())
        this.details= resData.eventlist[0]
        // 取得したdetailsのbranchの値で動作を変える。0:未参加+参加可能, 1:未参加+参加不可, 2:参加済+参加者リストを見たい, 3:参加済+イベント終了済+評価確認ページへのリンク
        this.mode= resData.branch
        console.log('mode:'+this.mode)
    }
}
</script>

