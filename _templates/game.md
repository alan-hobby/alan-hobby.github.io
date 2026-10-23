---
# 复制到 _games/ 文件夹，文件名用英文小写加连字符，例如 _games/outer-wilds.md
title: 游戏原名
short_title: 中文名               # 左侧目录里显示
subtitle: 中文名 · 年份
year: 2019                       # 发行年份
order:                           # 排序：数字越小越靠前，不填排在最后
number:                          # 编号（可空）
status: 在玩                      # 在玩 / 已通关 / 想玩，左侧目录按它分组
genre:                           # 类型，例如 解谜
developer:
platform:                        # 你玩的平台，例如 PC，左侧可以按它筛选
hours:                           # 例如 20 小时
finished:                        # 通关日期，例如 "2025-03-01"
rating:                          # 例如 ★★★★☆
cover: /images/games/文件名.jpg

info:                            # 右侧“信息”，空着的行不显示
  开发:
  首发:
  类型:

likes:
  - 喜欢的地方
dislikes:
  - 遗憾的地方
recommend: 什么样的玩家会喜欢它

log:
  - date: "2025-03-01"
    text: 开始
---

## 关于这款游戏

{% include figure.html src="/images/games/文件名.jpg" caption="截图说明" %}

## 游玩体验

> “印象最深的一幕”

## 笔记

{% include likes.html %}
