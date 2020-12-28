<template>
    <div id="attendance">
        param: {{ $route.params.event_id }}
        <h2> {{ eventdata.event_name }} </h2>
        <div id="attendancelist">
            <h4>イベント参加者</h4>
            <div>
                <ul>
                    <li v-for="user in attendance" v-bind:key="user.id">
                        <!-- 参加者リスト出力. 利用しているユーザid(self_id)と一致するユーザには評価を送れないようにしている. -->
                        {{ user.user_name }} <button v-if="(mode==0)&&(user.id!=self_id)" name="button_evaluate" @click="evaluateUser(user.id)">評価</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script>
// 評価提出済みかを確認できるなにかあるといいな
export default {
    name: 'attendance',
    data: ()=>{
        return{
            eventdata:{},
            mode: -1,
            self_id: -1,
            attendance: [
                // {id: "001",name: "近大太郎"},
                // {id: "003",name: "近大次郎"},
                // {id: "005",name: "近大三郎"},
                // {id: "011",name: "john"},
                // {id: "014",name: "lis"},

            ],
        }
    },
    methods: {
        evaluateUser: function(user_id){
            location.href='/evaluate/'+ this.$route.params.event_id+ '/'+ user_id
        }
    },
    created: async function(){
        let resData= await fetch('/api/participates?event_id='+ this.$route.params.event_id).then(response=>response.json())
        this.mode= resData.branch
        this.attendance= resData.students
        this.eventdata= resData.eventlist[0]
        this.self_id= resData.self_id
    },
}
</script>