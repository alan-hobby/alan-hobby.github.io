# Riveldell · 我的小屋

我的兴趣爱好网站：车模、游戏、电影、电视剧、推理小说。用 GitHub Pages 自带的 Jekyll 生成：每个条目是一个 Markdown 文件，推送到 GitHub 后一两分钟网页就会更新。

网址：<https://alan-hobby.github.io/>

## 目录结构

```
_cars/      车模，一台一个 .md
_prototypes/ 原型车介绍，同一款车的不同比例共用一份（见下面“车模”一节）
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

- 车模图集：条目里写 `photos: /images/cars/文件夹名/`，再把照片传进这个文件夹。传几张就显示几张，不限张数，按文件名排序。大图两侧有箭头可以左右翻，手机上可以左右滑；缩略图多了也能左右滑动。
- 正文里还想再放一个可以左右翻的图集：在 md 正文里需要的位置单独写一行（上下各空一行），再把照片传进这一行写的文件夹：

  ```
  {% include gallery.html photos="/images/cars/ferrari-250gto/细节/" %}
  ```

  一篇文章里可以放好几个，每个用不同的文件夹。每个图集只显示自己那个文件夹里的图片，不含子文件夹，所以 `细节` 里的照片不会跑到最上面的图集里。
- 想给每张图配说明文字，就改用 `images` 列表一张张写 `src` 和 `caption`。文件夹里有照片时优先用文件夹。
- 其他图片放进 `images/` 下对应的文件夹，引用时写 `/images/...`。
- iPhone 原图太大，先压到长边 2000 像素左右的 JPG 或 WebP（几百 KB）。iPhone 默认的 HEIC 格式浏览器显示不了，要先转成 JPG。

## 名字的写法

- 作品名和人名都用原名：哪国的作品 / 哪国的人，就用哪国的语言。日本用日文写法（綾辻行人、十角館の殺人），韩国用韩文，港台用繁体，中国大陆用简体，欧美用英文等原文。
- 电视剧每一季单独一个文件，季数也用原语言：美剧 Season 1，英剧 Series 1，德剧 Staffel 1，韩剧 시즌 1，日剧 シーズン1；国产剧用正式剧名（例如 爱情公寓2）。
- `zh_title` 填中文名。它不显示在页面上，只用于搜索：在右上角搜中文名也能找到。
- 电影和电视剧的导演、编剧、主演写在 `director`、`writer`、`cast`，游戏的作者写在 `author`，格式是 `[名字1, 名字2]`。
- 推理小说作者旁边的“链接”按钮：在那本书的 `link:` 后面填网址就会跳到那里；空着时默认跳到豆瓣搜索这本书。

## 首页大图

首页是一张铺满屏幕的大图，现在用的是 `images/rivendell.jpg`。想换图：把新图片放进 `images/`，再把 `_config.yml` 里 `home_image` 那一行改成新图片的路径。横图效果最好，宽 2500 像素以上在大屏幕上也清楚。

图在不同屏幕上会自动裁切。想让它多保留上半部分或左半部分，改 `assets/css/site.css` 里 `.hero-img` 的 `object-position`。

## 车模：同一款车的不同比例、合影

- 一台模型一个 md 文件、一个照片文件夹，文件名后面带比例，例如 `_cars/ferrari-250gto_18.md` 和 `_cars/ferrari-250gto_43.md`。
- 每个车模文件里写一行 `car: 代号`，例如 `car: 250gto`。同一款车的不同比例填一样的代号，这样：
  - 页面标题下面会自动出现“同款其他比例”，点一下就跳过去。
  - 原型车介绍只写一份，放在 `_prototypes/代号.md`（照 `_templates/prototype.md` 写）。各个比例的页面会在正文最前面显示它，右侧“规格”里的“原型车”一栏也从这里来。车模文件里就不用再写“## 原型车”，规格里也不用再写“原型车”。
- 合影都放进 `images/cars/合影/`。文件名 = 照片里每台车的“代号-比例”，用下划线连起来，最后加序号，例如 `250gto-18_330p4-18_01.jpg`。这张照片会出现在这两台车页面最下面的“合影”图集里，没有合影的车不显示这一块。
- 代号只用小写字母、数字和连字符（例如 `zonda-r`），不要用下划线，因为下划线是用来隔开合影里的各台车的。

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
