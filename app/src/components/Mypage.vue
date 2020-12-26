<template>
    <div id="mypage">
        <h2>マイページ</h2>
        <div>
            <!-- ユーザのアイコン(実装できれば) -->
            <div>ユーザ名 <b>{{ userData.username }}</b></div>
            <div>職業 {{ userData.profession }}</div>
        </div>
        
        <div>
            <h4>評価</h4>
            <div>
                <h6>固定軸評価</h6>
                <ul>
                    <li>前に踏み出す力: {{ avgAct }}</li>
                    <li>考え抜く力: {{ avgThink }}</li>
                    <li>チームで働く力: {{ avgTeam }}</li>
                </ul>
            </div>
        </div>

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
    created: function(){
        let self= this;
        fetch('/api/mypage')
        .then(function(response){return response.json()})
        .then(function(jData){
            console.log(jData)
            self.userData= jData
        })
    },
    computed: {
        avgAct: function(){
            return ( this.userData.ts[0].action+ this.userData.ss[0].action)/2
        },
        avgThink: function(){
            return ( this.userData.ts[1].think + this.userData.ss[1].think)/2
        },
        avgTeam: function(){
            return ( this.userData.ts[2].team+ this.userData.ss[2].team)/2
        }
    }
}
</script>