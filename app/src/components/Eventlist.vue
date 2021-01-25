<template>
    <div class="eventlist">
        <h2>イベント一覧</h2>
        <div>
            <!-- 検索フォーム -->
        </div>
        <div id="list">
            イベント一覧 <br/>
            <div v-if="events">
                <ul>
                    <li v-for="event in events" v-bind:key="event.id">
                    <router-link v-bind:to="{name: 'Event', params: { id: event.id}}">
                        {{ event.id }}<br/>
                        {{ event.event_name}}<br/>
                        {{ event.start_day }}
                        <!-- イベント詳細へのリンクもつける -->
                    </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>

<script>
export default {
    name: 'eventlist',
    data: ()=>{
        return{
            events: [
                // {id: "001",name: "イベントA", date: "2020/11/11"},
                // {id: "003",name: "イベントB", date: "2020/11/22"},
                // {id: "005",name: "イベントC", date: "2020/12/01"},
                ]
        }
    },
    created: async function(){ //作成時にバックからイベント一覧の取得
        let resData = await fetch('/api/eventall').then(response=>response.json())
        resData.eventlist.forEach(e =>{
            this.events.push(e);
        })
    }
}
</script>
