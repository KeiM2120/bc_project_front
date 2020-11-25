<template>
    <div id="attendance">
        param: {{ $route.params.event_id }}
        <h2> {{ eventname }} </h2>
        <div id="attendancelist">
            <h4>イベント参加者</h4>
            <div>
                <ul>
                    <li v-for="user in attendance" v-bind:key="user.id">
                        {{ user.name }} <button name="button_evaluate">評価</button>
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
            eventname: 'イベントA',
            attendance: [
                {id: "001",name: "近大太郎"},
                {id: "003",name: "近大次郎"},
                {id: "005",name: "近大三郎"},
                {id: "011",name: "john"},
                {id: "014",name: "lis"},

            ],
        }
    }
}
</script>