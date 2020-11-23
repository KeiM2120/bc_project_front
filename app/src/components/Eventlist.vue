<template>
    <div class="eventlist">
        <h2>イベント一覧</h2>
        <div>
            <!-- 検索フォーム -->
        </div>
        <div id="list">
            イベント一覧 <br/>
            <div>
                <ul>
                    <li v-for="event in events" v-bind:key="event.id">
                        {{ event.id }}<br/>
                        {{ event.name}}<br/>
                        {{ event.date }}
                        <!-- イベント詳細へのリンクもつける -->
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
                {id: "001",name: "イベントA", date: "2020/11/11"},
                {id: "003",name: "イベントB", date: "2020/11/22"},
                {id: "005",name: "イベントC", date: "2020/12/01"},
                ]
        }
    }
}
</script>
