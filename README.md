# 2020年 ブロックチェーンプロジェクト

## 詳細

docker-vue環境でのフロントエンドのページ実装

## 起動
- #### 前提
Docker起動環境

- #### 準備
1. `docker-compose up -d --build` (2回目以降は `docker-compose up -d`だけで良し)
2. `docker-compose exec app ash`
3. appコンテナ内で`npm install`

- #### 実行
1. appコンテナ内で`npm run serve`を実行
2. [http://localhost:8080](http://localhost:8080)でトップページヘ


- #### コンテナを閉じる
`docker-compose down`

## 参考記事

[【Vue.js】Docker-composeでVue.jsの環境を整えてみた](https://gangannikki.hatenadiary.jp/entry/2020/01/03/235700)
- なお、記事の中のDockerfileと同じnodeのバージョンだと'npm run serve'にてエラーを吐くので上げておくと良い。本リポジトリでは14.15.0

[Vue.js SPAの作りを理解したい](https://note.com/kanoemon145/n/nc830b9763868)

[Vue-CLI3でbuildすると画面が真っ白になる](https://qiita.com/heyheyww/items/5d06936745118045a308)
