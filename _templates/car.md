---
# 复制到 _cars/ 文件夹，文件名用英文小写加连字符（会变成网址），例如 _cars/pagani-zonda-r.md
title: 车型全名                   # 例如 Pagani Zonda R
short_title: 短名                 # 左侧目录里显示，例如 Zonda R
subtitle: 中文名 · 年份            # 例如 帕加尼 Zonda R · 2009
order:                           # 排序：数字越小越靠前，不填排在最后
number:                          # 藏品编号，例如 "019"（加引号）
status: 在藏                      # 在藏 / 想要 / 已出
brand: 品牌                       # 例如 Pagani，左侧目录按它分组
scale: "1:18"                    # 比例一定要加引号
maker:                           # 模型厂商，例如 AUTOart
material:                        # 例如 合金压铸 / 树脂
item_no:                         # 货号，加引号
acquired:                        # 入藏日期，例如 "2025-03-01"
source:                          # 渠道

photos: /images/cars/文件夹名/      # 照片直接放进这个文件夹，放几张显示几张，按文件名排序

specs:                           # 右侧“规格”，空着的行不显示
  原型车:
    年份:
    设计:
    发动机:
    功率:
  模型:
    厂商:
    比例: "1:18"
    材质:
    可开部件:

notes:                           # “收藏笔记”里并排的几块，空着的不显示
  入手经过:
  第一印象:
  展示方式:

likes:
  - 喜欢的地方
dislikes:
  - 遗憾的地方

log:                             # 收藏日志，以后有新动作就往下加
  - date: "2025-03-01"
    text: 入藏
---

## 原型车

这一段写原型车。

## 模型

这一段写模型本身。

{% include gallery.html photos="/images/cars/文件夹名/细节/" %}

## 收藏笔记

{% include notes.html %}

{% include likes.html %}
