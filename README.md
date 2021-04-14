# Lister
### cloud vision apiを使用したスマホ向けWEBアプリ
## 撮影した画像のテキストをOCR機能で読み取りチェックリスト化します
https://lister-424b3.web.app/  
`スマートフォンでアクセスください`
1. URLにアクセスするとWEBカメラが起動します
1. ログインをしてください
1. ログインした状態で「createList」ボタンを押すと、撮影した画像をサーバーに送り画像内のテキストを読み取ります
1. 読み取ったテキストをチェックリスト化して表示します
1. チェックリストは保存、呼び出しが自由にできます
1. チェックリストは自由に編集できます
1. 未ログイン状態でもチェックリスト機能は使用できます
1. 未ログイン状態ではOCR機能、保存機能が使用できません
1. 登録は無料です
### 使用技術
- **vue cli**  
  vue2-touch-events
- **node.js**  
  express  
  urlsafe-base64
- **firebase**  
  hosting  
  realtimedatabase  
  authentication  
  functions

### 概要
- シングルページアプリケーション
- スマートフォンサイズ対応( iPhone8 )
- PCサイズ未対応

### 作成した機能
- ログイン機能
- メールリンク認証機能
- リスト保存機能
- リスト読み出し機能
- リストタイトル変更機能
- リスト削除機能
- リスト内容編集機能
- フリック操作対応
- webカメラ使用
- OCR機能
- ローディングの演出

### 作った経緯
- vuecliの学習
- node.jsの学習
- なにかアプリケーションをつくりたかった
- firebaseを使ってみたかった
- cloud visin apiを使ってみたかった
- 我が家ではホワイトボードに主に生活必需品の買い物リストを書き込む習慣があります。休日に買い物に行く際には、妻がホワイトボードを写真にとり、それを見ながら買い物をして買い漏れを防止しています。チェックリスト化することで買ったもののチェックができるため、写真をみながら買ったものを記憶しておくストレスを軽減し、買い物がしやすくできるのではと思い作成しました。

### やり残していること
- リファクタリング
- ロゴ作成
- password見える化ボタン設置
- usernameのDB照合（現状登録時にのみ必要）
- バリデーションエラー表示