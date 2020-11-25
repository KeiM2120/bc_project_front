<template>
    <div id="evaluate">
        <div>
            params<br/>
            eventId: {{ $route.params.event_id }}<br/>
            targetId: {{ $route.params.target_id }}<br/>
        </div>
        <h2>評価送信ページ</h2>
        <div><h4>評価対象</h4><h3> {{ target_name }}</h3></div>
        <div id="evaluateinput">
            <ul>
                <li>アクション力:{{ evaluations.action }} <input type="range" name="act" max="5" min="1" step="1" v-model="evaluations.action"></li>
                <li>思考力: {{ evaluations.think }}<input type="range" name="think" max="5" min="1" step="1" v-model="evaluations.think"></li>
                <li>チーム力: {{ evaluations.team }}<input type="range" name="team" max="5" min="1" step="1" v-model="evaluations.team"></li>
            </ul>
            <!--TODO 自由軸評価の部分 -->
            コメント(特に印象に残った姿など)
            <input type="text" name="comment"><br/>

            <button id="submit">送信</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
    name: 'evaluate',
    data: ()=>{
        return{
            target_name: "近大太郎",
            evaluations: {
                action: 3,
                think: 3,
                team: 3,
            }
        }
    }
}
</script>