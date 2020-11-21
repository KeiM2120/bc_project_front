<template>
    <div class="top">
        <h1>Top page</h1>
        <div>
            <div>
                <h2> {{ status }} </h2>
            </div>
            <div>
                ユーザID(メールアドレス)<input type="text" placeholder="user_id">
            </div>
            <div>
                パスワード<input type="text" placeholder="password">
            </div>
            <div v-if="mode === 'signup'">
                氏名<input type="text" placeholder="name"><br/>
                <input type="radio" name="occupation" value="学生">学生
                <input type="radio" name="occupation" value="講師">講師
            </div>
            
            <button>
                {{ status }}
            </button>
        </div>
        <div>
            <button v-on:click="changeMode">
                {{ toggleMode }}
            </button>
        </div>
    </div>
</template>

<style lang="scss"></style>

<script>
export default{
    name: 'login',
    data: ()=>{
        return {
        mode: "login",
        status: "ログイン",
        toggleMode: "新規登録",
    }
    },
    methods: {
        changeMode(){
            console.log("clicked changeMode");

            if(this.mode === "login"){
                this.mode= "signup";
                this.status= "新規登録";
                this.toggleMode= "ログイン"
            }
            else if (this.mode === "signup"){
                this.mode= "login";
                this.status= "ログイン";
                this.toggleMode= "新規登録"
            }
        }
    },
    created: () => {
        
    },
    computed: {

    },
}
</script>