# add-assignmentList-extension

阪大の CLE の UI 変更に伴って TOP ページに表示されなくなった課題一覧を表示する拡張機能

# 動作環境

Google Chrome version 106.0.5249.91

（動作確認済み） Ubuntu 20.04 LTS

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