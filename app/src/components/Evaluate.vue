<template>
    <div id="evaluate" v-if="evaluations">
        <div>
            params<br/>
            eventId: {{ $route.params.event_id }}<br/>
            targetId: {{ $route.params.target_id }}<br/>
        </div>
        <h2>評価送信ページ</h2>
        <div>イベント名: <b>{{ event_name }}</b></div>
        <div>評価対象: <b>{{ target_name }}</b></div>
        <div id="evaluateinput">
            <ul>
                <li>アクション力:{{ evaluations.action }} <input type="range" name="act" max="5" min="1" step="1" v-model="evaluations.action"></li>
                <li>思考力: {{ evaluations.think }}<input type="range" name="think" max="5" min="1" step="1" v-model="evaluations.think"></li>
                <li>チーム力: {{ evaluations.team }}<input type="range" name="team" max="5" min="1" step="1" v-model="evaluations.team"></li>
            </ul>
            <div>
                評価対象の人に当てはまると思う項目を <b>最大3つ</b> 選んでください
                <div>
                    <input type="checkbox"  id="free1" value="1" v-model="evaluations.free"><label for="free1">主体性(物事に進んで取り組む力)</label><br/>
                    <input type="checkbox"  id="free2" value="2" v-model="evaluations.free"><label for="free2">働きかけ力(他人に働きかけ巻き込む力)</label><br/>
                    <input type="checkbox"  id="free3" value="3" v-model="evaluations.free"><label for="free3">実行力(目標を設定し確実に行動する力)</label><br/>
                    <input type="checkbox"  id="free4" value="4" v-model="evaluations.free"><label for="free4">課題発見力(現状を分析し目的や課題を明らかにする力)</label><br/>
                    <input type="checkbox"  id="free5" value="5" v-model="evaluations.free"><label for="free5">計画力(課題の解決に向けたプロセスを明らかにし準備する力)</label><br/>
                    <input type="checkbox"  id="free6" value="6" v-model="evaluations.free"><label for="free6">創造力(新しい価値を生み出す力)</label><br/>
                    <input type="checkbox"  id="free7" value="7" v-model="evaluations.free"><label for="free7">発信力(自分の意見を分かりやすく伝える力)</label><br/>
                    <input type="checkbox"  id="free8" value="8" v-model="evaluations.free"><label for="free8">傾聴力(相手の意見を丁寧に聴く力)</label><br/>
                    <input type="checkbox"  id="free9" value="9" v-model="evaluations.free"><label for="free9">柔軟性(意見の違いや立場の違いを理解する力)</label><br/>
                    <input type="checkbox"  id="free10" value="10" v-model="evaluations.free"><label for="free10">状況把握力(自分と周囲の人々や物事との関係性を理解する力)</label><br/>
                    <input type="checkbox"  id="free11" value="11" v-model="evaluations.free"><label for="free11">規律性(社会のルールや人との約束を守る力)</label><br/>
                    <input type="checkbox"  id="free12" value="12" v-model="evaluations.free"><label for="free12">ストレスコントロール力(ストレスの発生源に対応する力)</label><br/>
                </div>
                <div v-if="checkCountFree"><b>チェックボックスの選択数は3つまでにしてください</b></div>
                <span>DEBUG: {{evaluations.free}} </span>
            </div>

            <!--TODO 自由軸評価の部分 -->
            コメント(特に印象に残った姿など)<br/>
            <textarea name="comment" v-model="evaluations.comments"></textarea><br/>

            <button id="submit" @click="submitEvaluation">送信</button>
        </div>
    </div>
</template>

<style lang="scss"></style>

<script>
export default {
    name: 'evaluate',
    data: ()=>{
        return{
            target_name: "近大太郎",
            event_name: "イベント名",
            evaluations: {
                action: 3,
                think: 3,
                team: 3,
                free:[],
                comments: "",
                event_id: -1,
                receiver_id: -1,
            },
        }
    },
    methods:{
        submitEvaluation: async function(){
            if(this.checkCountFree){
                alert("チェックボックスの選択個数を3つ以下にしてください")
            }
            else{
                const event_id= this.evaluations.event_id
                await fetch('/api/evaluate', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.evaluations),
                    })
                .then(response=>{
                    if(response.ok){
                        alert('評価の送信が完了しました \n 参加者一覧へ戻ります')
                        location.href='/attendance/'+event_id
                    }
                    else{
                        alert('評価の送信でエラーが発生しました')
                        location.reload(false)
                    }
                })
            }
        },
        
    },
    computed:{
        checkCountFree: function(){
            return (this.evaluations.free.length > 3);
        },
    },
    created: async function(){ 	
        let resData= await fetch('/api/evaluate?event_id='+ this.$route.params.event_id+'&receiver_id='+ this.$route.params.target_id).then(response=>response.json()) 	
        this.target_name= resData.receiver.user_name 	
        this.event_name= resData.eventlist[0].event_name 	
        this.$set(this.evaluations, 'event_id' , this.$route.params.event_id ) 	
        this.$set(this.evaluations, 'receiver_id' ,this.$route.params.target_id )
    }
}
</script>