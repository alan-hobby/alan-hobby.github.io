---
# 复制到 _films/ 文件夹，文件名就用中文片名，例如 _films/罗生门.md
title: 羅生門                      # 片名用原版名字（哪国电影就用哪国语言）
zh_title: 罗生门                   # 中文名，只用于搜索
year: 1950                       # 上映年份，左侧“年代”筛选按它自动计算
director: [黒澤明]                 # 导演原名，多个用逗号隔开
writer: [橋本忍, 黒澤明]            # 编剧
cast: [三船敏郎, 京マチ子, 森雅之]     # 主演
order:                           # 排序：数字越小越靠前，不填排在最后
number:
status: 看过                      # 看过 / 想看，左侧目录按它分组
genre:                           # 类型，例如 悬疑
runtime:                         # 例如 88 分钟
watched:                         # 观看日期，例如 "2025-03-01"
where:                           # 影院 / 流媒体
rating:
cover: /images/movies/文件名.jpg

info:
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
