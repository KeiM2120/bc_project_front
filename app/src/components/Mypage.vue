<template>
    <div id="mypage">
        <h2>マイページ</h2>
        <div>
            <!-- ユーザのアイコン(実装できれば) -->
            <div>ユーザ名 <b>{{ userData.username }}</b></div>
            <div>職業 {{ userData.profession }}</div>
        </div>
        
        <div v-if="userData.profession == 'student'">
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
            <div>
                <a v-bind:href="'/checkevaluate/u/'+userData.email">自身の評価を共有</a>
            </div>
        </div>
        <div v-if="!(userData.profession == 'school')">
            <h4>参加予定のイベント</h4>
            <div>
                <ul>
                    <li v-for="event in userData.eventlist" v-bind:key="event.id">
                        
                        <router-link v-bind:to="{name:'Event', params:{id: event.id}}">
                            <div>
                                {{ event.event_name }}<br/>
                                開催: {{event.start_day}}
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="userData.profession == 'school'">
            <a href="createevent">イベント新規作成</a><br/>
        </div>
        <a href="/eventlist">イベント一覧</a><br/>

        <!-- <div>
            参加イベント
            <div id="eventlist">
                <ul>
                    <li v-for="event in events" v-bind:key="event.id">
                        {{ event.id }}<br/>
                        {{ event.name}}<br/>
                        {{ event.date }}
                    </li>
                </ul>
            </div>
        </div> -->
        <a href="./">top</a>
    </div>
</template>

<style lang="scss"></style>

<script>
export default{
    name: 'mypage',
    data: function(){
        return{
            userData: {},
            username: "ユーザ名",
            occupation: "学生",
            events: [
                {id: "001",name: "イベントA", date: "2020/11/11"},
                {id: "003",name: "イベントB", date: "2020/11/22"},
                {id: "005",name: "イベントC", date: "2020/12/01"},
                ]
        }
    },
    // createdにてユーザ情報をfetchで取得
    created: function(){
        let self= this;
        fetch('/api/mypage')
        .then(function(response){return response.json()})
        .then(function(jData){
            console.log(jData)
            self.userData= jData
        })
    },
    // 評価はここで学生評価と講師評価の平均を算出
    computed: {
        avgAct: function(){
            if(this.userData.ts === undefined){return -1}
            return ( this.userData.ts[0].action+ this.userData.ss[0].action)/2
        },
        avgThink: function(){
            if(this.userData.ts === undefined){return -1}
            return ( this.userData.ts[1].think + this.userData.ss[1].think)/2
        },
        avgTeam: function(){
            if(this.userData.ts === undefined){return -1}
            return ( this.userData.ts[2].team+ this.userData.ss[2].team)/2
        },
        // 自由軸評価が12種の前提
        freeEval: function(){ 
            let total={};
            for(let i= 0; i< 12; i++){
                total[this.userData.social[i].name]= (this.userData.social[i].count+ this.userData.social2[i].count);
            }
            return total;
        }
    }
}
</script>