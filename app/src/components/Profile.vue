<template>
    <div class="profile">
        <h2>プロフィール編集</h2> <button>完了</button>
        <div id="form">
            <input type="text" name="username" placeholder="ユーザ名"><br/>
            <input type="text" name="mailadress" placeholder="メールアドレス"><br/>
            <input type="password" name="password" placeholder="パスワード"><br/>
            <input type="text" name="introduction" placeholder="自己紹介"><br/>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script>
// 読み込み時動作として変更前の情報を取得して出すのもアリかも
export default {
    
}
