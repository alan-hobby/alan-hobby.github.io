---
# 复制到 _films/ 文件夹，文件名用英文小写加连字符，例如 _films/rashomon.md
title: 片名原名
short_title: 中文片名             # 左侧目录里显示
subtitle: 中文片名 · 年份
year: 1950                       # 上映年份，左侧“年代”筛选按它自动计算
order:                           # 排序：数字越小越靠前，不填排在最后
number:
status: 看过                      # 看过 / 想看，左侧目录按它分组
genre:                           # 类型，例如 悬疑
director:
runtime:                         # 例如 88 分钟
watched:                         # 观看日期，例如 "2025-03-01"
where:                           # 影院 / 流媒体
rating:
cover: /images/movies/文件名.jpg

info:
  导演:
  主演:
  片长:
  上映:

likes:
  - 喜欢的地方
dislikes:
  - 遗憾的地方

log:
  - date: "2025-03-01"
    text: 第一次看
---

## 一句话短评

> “一句话”

## 剧情（无剧透）

{% include figure.html src="/images/movies/文件名.jpg" caption="剧照说明" %}

## 观后感

{% include likes.html %}
