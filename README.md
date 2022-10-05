# add-assignmentList-extension

阪大の CLE の UI 変更に伴って TOP ページに表示されなくなった課題一覧を表示する拡張機能

# 動作環境

Google Chrome version 106.0.5249.91

（動作確認済み） Ubuntu 20.04 LTS

PC でのみ動作します

# 使い方

- https://reviews.f-tools.net/Add-On/Jisaku-Tuika.html
  を参考にインストール

- トップページ
  https://www.cle.osaka-u.ac.jp/ultra/institution-page
  にアクセス

- 課題一覧と授業一覧が表示される
  - 表示されなければリロードしてください
  
<strong><h2>注意</h2>春学期のみ、秋学期のみなど、通期で行われない授業は今の所表示されません</strong>

# プレビュー
![Screenshot from 2022-10-05 02-11-18](https://user-images.githubusercontent.com/74486926/193956836-742ac99f-59ed-4d65-bbc1-df3bc1bf2177.png)
# 使用言語

JavaScript


# 動作の中身

- calendar に自動登録されている課題締切を API を用いて取得

```
https://www.cle.osaka-u.ac.jp/learn/api/v1/calendars/dueDateCalendarItems
```

- トップページに課題一覧表を追加し、取得した課題締切を追加する

# 最後に

この拡張機能による損害に関して一切責任を負いません。自己責任で使用してください。バグなどがあれば PR お願いします。
