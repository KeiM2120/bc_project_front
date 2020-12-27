<template>
    <div class="top">
        <h1>Top page</h1>
        <div>
            <div>
                <h2> {{ status }} </h2>
            </div>
            <div>
                ユーザID(メールアドレス)<input type="text" v-model="email" placeholder="user_id" @keydown.enter="trigger_submit">
            </div>
            <div>
                パスワード<input type="password" v-model="pass" placeholder="password" @keydown.enter="trigger_submit">
            </div>
            <div v-if="mode === 'signup'">
                氏名<input type="text" v-model="name" placeholder="name"><br/>
                <input type="radio" v-model="profession" name="profession" value="student">学生
                <input type="radio" v-model="profession" name="profession" value="teacher">講師
            </div>
            
            <button id="submit" v-on:click="submitData">
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
    name: 'signin',
    data: ()=>{
        return {
        baseUrl: 'http://localhost/api',
        mode: "signin",
        status: "ログイン",
        toggleMode: "新規登録",

        email: null,
        pass: null,
        name: null,
        profession: null,
        errors:[],
    }
    },
    methods: {
        changeMode(){
            console.log("clicked changeMode");

            if(this.mode === "signin"){
                this.mode= "signup";
                this.status= "新規登録";
                this.toggleMode= "ログイン"
            }
            else if (this.mode === "signup"){
                this.mode= "signin";
                this.status= "ログイン";
                this.toggleMode= "新規登録"
            }
        },
        async submitData(){
            // モードに応じて贈り先とボディを変更
            if(this.mode === "signin"){
                console.log('signin')
                if(this.checkFormSignin){
                    await fetch(this.baseUrl+'/signin', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email: this.email,
                            password: this.pass
                        })
                    })
                    .then(response=>{
                        // TODO: レスポンス確認して、ログインできているなら/mypageへリダイレクト
                        // TODO: ログイン確認ができない場合は相応のエラーを返す&ページ再読み込み(リダイレクトで大丈夫そう?)
                            
                        if(response.ok){
                            location.href='/mypage'
                        } 
                        else{
                            alert('サインイン中にエラーが発生しました。')
                            location.href='/'
                        }
                        // console.log(response)
                    })
                }
            }
            else if (this.mode === 'signup'){
                console.log('signup')
                if(this.checkFormSignup){
                    await fetch(this.baseUrl+ '/signup', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email: this.email,
                            password: this.pass,
                            user_name: this.name,
                            profession: this.profession
                        })
                    })
                    .then(response=>{
                        if(response.ok){
                            location.href='/'
                        } 
                        else{
                            alert('サインアップ中にエラーが発生しました。')
                        }
                        // console.log(response)
                    })
                }
            }
        },
        checkFormSignin: function (e) {
            this.errors = [];
            if (!this.email) {
                this.errors.push('メールアドレスを入力してください');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('有効なメールアドレスを入力してください');
            }
            if(!this.pass){
                this.errors.push('パスワードを入力してください')
            }

            if (!this.errors.length) {
                console.log("form valid")
                return true;
            }
            e.preventDefault();
        },
        checkFormSignup: function (e) {
            this.errors = [];
            if (!this.name) {
                this.errors.push("名前を入力してください");
            }
            if (!this.email) {
                this.errors.push('メールアドレスを入力してください');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('有効なメールアドレスを入力してください');
            }
            if(!this.pass){
                this.errors.push('パスワードを入力してください')
            }
            if(!this.profession){
                this.errors.push('職業を選択してください')
            }

            if (!this.errors.length) {
                console.log("form valid")
                return true;
            }
            e.preventDefault();
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        trigger_submit: (event)=>{
            if(event.keyCode !== 13)return
            this.submitData;
        },
    },
    created: () => {
        
    },
    computed: {

    },
}
</script>