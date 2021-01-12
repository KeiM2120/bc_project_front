<template>
    <div id="createevent">
        <h2>イベント新規作成</h2>
        <div id="eventform">
        イベント名:{{ events.event_name }}
        <input type="text" name="eventname" placeholder="イベント名" v-model="events.event_name" /><br />
        開催日:{{ events.start_day }}
        <input type="date" name="startday" v-model="events.start_day" /><br />
        終了日:{{ events.last_day }}
        <input type="date" name="lastday" v-model="events.last_day" /><br />
        申し込み締め切り日:{{ events.deadline }}
        <input type="date" name="deadline" v-model="events.deadline" /><br />
        イベント説明:{{ events.comments }}
        <input type="text" name="comments" placeholder="イベント説明" v-model="events.comments" /><br />
        </div>
        <div id="tag">
        <!-- タグ入力・選択 -->
        <ul>
            <li v-for="tag in tags" v-bind:key="tag.id">
                    <input type="checkbox"  v-bind:id="tag.id" v-bind:value="tag.id" v-model="events.tags"><label v-bind:for="tag.id">{{ tag.tag }}</label>
            </li>
        </ul>
        </div>
        <div id="teacher">
            <ul>
                <li v-for="teacher in teachers" v-bind:key="teacher.id">
                    <input type="checkbox"   v-bind:id="teacher.id" v-bind:value="teacher.id" v-model="events.teachers"><label v-bind:for="teacher.id">{{teacher.user_name}}</label>
                </li>
            </ul>
        </div>
        <button id="submit" @click="submitEvent">送信</button>
    </div>
</template>

<style lang="scss">
</style>

<script>

export default {
    name: 'createevent',
    data: ()=>{
        return{
            events: {
                event_name: "",
                start_day: 2021-10-12,
                last_day: 2021-11-12,
                deadline: 2021-10-20,
                tags: [],
                teachers:[],
                comments: "",
            },
            tags: [],
            teachers: [],
        }
    },
    methods:{
        submitEvent: async function(){
            await fetch('/api/eventcreate', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.events),
                })
            .then(response=>{
                if(response.ok){
                    alert('イベント作成が完了しました \n マイページへ戻ります')
                    location.href='/mypage/'
                }
                else{
                    alert('イベント作成でエラーが発生しました')
                    location.reload(false)
                }
            })
        },
        
    },
    computed:{
    },
    created: async function(){ 	
        let resData= await fetch('/api/eventcreate').then(response=>response.json())
        resData.tags.forEach(tag => {
            this.tags.push(tag);
        });
        resData.teachers.forEach(teacher =>{
            this.teachers.push(teacher);
        })
    },

}
</script>