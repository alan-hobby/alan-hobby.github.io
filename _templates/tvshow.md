---
# 复制到 _tvshows/ 文件夹，文件名就用剧名，例如 _tvshows/漫长的季节.md
title: 剧名                        # 例如 黑镜第七季
series:                          # 同一部剧的多季填同一个名字，左侧目录会把它们放在一组，例如 黑镜
short_title:                     # 在组里显示的短名，例如 第七季
order:                           # 排序：数字越小越靠前，不填排在最后
year:                            # 首播年份
status:                          # 在看 / 看完 / 想看
creator:                         # 主创
episodes:                        # 例如 6 集
watched:                         # 看完的日期，例如 "2025-03-01"
where:                           # 在哪看
rating:
cover: /images/tvs/文件名.jpg

info:
  主创:
  主演:
  集数:
  首播:

likes:
  - 喜欢的地方
dislikes:
  - 遗憾的地方

log:
  - date: "2025-03-01"
    text: 看完
---

## 一句话短评

> “一句话”

## 观后感

{% include likes.html %}
