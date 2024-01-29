# new-app-crowd

builders.flash の [AWS Amplify と Amazon Rekognition を使って施設の混雑状況をモニタリングするアプリを作ってみよう !](https://aws.amazon.com/jp/builders-flash/202004/crowd-amplify-rekognition/?awsf.filter-name=*all)の改修版です。

## 動かし方
詳細は [AWS Amplify と Amazon Rekognition を使って施設の混雑状況をモニタリングするアプリを作ってみよう !](https://aws.amazon.com/jp/builders-flash/202004/crowd-amplify-rekognition/?awsf.filter-name=*all)をご確認ください。ただし、`amplify add` など一部手順については既に実装済みであることにご注意ください。

1. （必要であれば）Amplify CLI のインストール
2. `git clone https://github.com/unirt/new-app-crowd.git`
3. `npm install`
4. （必要であれば）`amplify configure`
5. `amplify init`（Amplify プロジェクトのセットアップ）
6. `amplify push`（バックエンドの環境構築）
7. `npm run dev`（ローカルで React アプリを起動）
8. ローカルアプリにてユーザを作成
9. マネジメントコンソールにて Cognito ユーザプールの管理者用グループ（`admin` グループ）を作成し、そこに作成したユーザを追加して管理者ユーザを作成
10. マネジメントコンソールにて AppSync のクエリタブから施設情報を登録し、施設情報 ID をフロントアプリにて置き換える
11. 別ブラウザなどで一般ユーザとして新しいユーザを作成する
12. 管理者画面でカメラをスタートし、動作を確認する
13. （必要であれば）`amplify publish` で React アプリを Amplify Hosting にデプロイする
14. `amplify delete` で環境を削除する
