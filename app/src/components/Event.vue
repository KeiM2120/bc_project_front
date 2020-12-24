<template>
    <div id="Event">
        param: {{ $route.params.id }}
        <div>
            <h2> {{ details.name }}</h2>
            {{ details.date }}

            <h5>担当講師: {{ details.teacher }} </h5>
            <div>
                {{ details.desc }}
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
            details: {
                // id: "001",
                // name: "イベントA",
                // date: "2020/11/11",
                // teacher: "近大 弘一",
                // desc: "本イベントは〇〇をして△△を目指すものになります。"
            }
        }
    },
    created: async function(){ 
        this.details = await fetch('/api/eventpage?event_id='+this.$route.params.id).then(response=>response.json())    
    }
}
</script>