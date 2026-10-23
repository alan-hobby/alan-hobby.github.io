# Riveldell · 我的小屋

我的兴趣爱好网站：车模、游戏、电影、电视剧、推理小说。用 GitHub Pages 自带的 Jekyll 生成：每个条目是一个 Markdown 文件，推送到 GitHub 后一两分钟网页就会更新。

网址：<https://alan-hobby.github.io/>

## 目录结构

```
_cars/      车模，一台一个 .md
_games/     游戏
_films/     电影
_tvshows/   电视剧
_mystery/   推理小说
_templates/ 空白模板和完整示例（这个文件夹不会出现在网站上）
images/     图片：cars/ games/ movies/ tvs/ novels/
files/      其他文件（原样保留）
_data/modules.yml  五个模块的显示设置（筛选项、标题卡字段等）
```

`_layouts`、`_includes`、`assets/` 是页面模板、样式和脚本，平时不用动。

## 新增一个条目

1. 从 `_templates/` 复制对应的模板到模块文件夹，文件名用作品名，例如 `_mystery/水车馆事件.md`。
2. 改顶部 `---` 之间的字段，再在下面写正文。
3. 提交到 GitHub。左侧目录、模块首页、搜索都会自动更新。

`_templates/examples/` 里有四个写满了的示例，可以照着写。

几条容易踩的坑：

- **比例和日期要加引号**：`scale: "1:18"`、`acquired: "2025-03-01"`。不加引号，`1:18` 会被当成数字。
- 字段空着就不显示，不用删掉那一行。
- `order` 决定排序，数字越小越靠前；不填的排在最后。
- 正文里的标题用 `##`，小标题用 `###`。

## 图片

- 放进 `images/` 下对应的文件夹，例如 `images/cars/f40-front.jpg`，引用时写 `/images/cars/f40-front.jpg`。
- iPhone 原图太大，先压到长边 2000 像素左右的 JPG 或 WebP（几百 KB）。
- 车模的 `images` 列表第一张是主图，其余是缩略图，点缩略图会切换主图。

## 正文里能用的几个写法

插一张图：

```
{% include figure.html src="/images/games/锈湖悖论.jpg" caption="截图说明" %}
```

两张图并排：

```
<div class="figs">
{% include figure.html src="/images/cars/a.jpg" caption="说明" %}
{% include figure.html src="/images/cars/b.jpg" caption="说明" %}
</div>
```

“喜欢 / 遗憾”两个小框（内容写在顶部的 `likes`、`dislikes` 里）：

```
{% include likes.html %}
```

默认折叠的剧透：

```
<details class="spoiler" markdown="1">
<summary>剧透</summary>

剧透内容

</details>
```

## 亮色 / 暗色

右上角的按钮一键切换，选择会记在浏览器里；没切换过时跟随系统设置。颜色在 `assets/css/site.css` 开头的两组变量里。

## 本地预览（可选）

1. 装 Ruby（Windows 用 RubyInstaller，选带 Devkit 的版本）。
2. 在仓库根目录运行 `bundle install`，然后运行 `bundle exec jekyll serve`。
3. 打开 <http://127.0.0.1:4000/>。
