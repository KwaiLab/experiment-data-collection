実装した機能

写真撮影機能: カメラを起動して写真を撮影し、街景を記録します。

タグ選択機能: タグを選択して評価ポイントを記録します。

コメント入力機能: ユーザーの感じたことや追加情報をコメントとして記録します。

使用方法

1.依存パッケージのインストール：

git clone git@github.com:KwaiLab/experiment-data-collection.git

cd experiment-data-collection

npm install

2.サーバーを起動

backend ディレクトリに移動し、以下のコマンドを実行：

cd backend

node server.js

3.サーバーが起動すると、以下のURLでアクセス：

http://localhost:3000/html/index.html

プロジェクト構成

experiment-data-collection/

├── backend/

│   ├── server.js           # バックエンドサーバーファイル

│   ├── uploads/            # 保存された写真とデータ

│   ├── data.json           # タグとコメントデータ

│   └── experiment_data.csv # 保存された評価データ

├── frontend/

│   ├── html/               # HTMLファイル

│   ├── css/                # スタイルシート

│   └── js/                 # フロントエンドJavaScriptファイル

├── package.json            # プロジェクト設定ファイル

├── README.md               # プロジェクトの説明（このファイル）

└── .gitignore              # Git追跡除外設定
