<template>
    <div id="mypage">
        <h2>マイページ</h2>
        <div>
            <!-- ユーザのアイコン(実装できれば) -->
            {{username}}<br/>
            {{occupation}}
        </div>
        <div>
            参加イベント
            <div id="eventlist">
                <!-- v-forでの列挙 -->
                <ul>
                    <li v-for="event in events" v-bind:key="event.id">
                        {{ event.id }}<br/>
                        {{ event.name}}<br/>
                        {{ event.date }}
                    </li>
                </ul>
            </div>
        </div>
        <a href="./">top</a>
    </div>
</template>

<style lang="scss"></style>

<script>
export default{
    name: 'mypage',
    data: ()=>{
        return{
            username: "ユーザ名",
            occupation: "学生",
            events: [
                {id: "001",name: "イベントA", date: "2020/11/11"},
                {id: "003",name: "イベントB", date: "2020/11/22"},
                {id: "005",name: "イベントC", date: "2020/12/01"},
                ]
        }
    }
}
</script>