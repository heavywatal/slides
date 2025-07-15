+++
url = "makino2019r/5-git.html"
title = "File management with Git+GitHub — Hands-on R Lecture for Makino Lab"
linktitle = "File management with Git+GitHub"
date = 2019-10-30T14:00:00+09:00
type = "reveal"
draft = false
+++


# [Hands-on R Lecture for Makino Lab](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野
</div>

<ol start="0">
<li><a href="0-why-r.html">Why do we use R?</a>
<li><a href="1-basic-r.html">R basics</a>
<li><a href="2-ggplot.html">Visualization with R</a>
<li><a href="3-tidy-data.html">Tidying and transforming data with R</a>
<li><a href="4-statistics.html">Statistical analysis with R</a>
<li class="current-deck"><a href="5-git.html">File management with Git+GitHub</a>
</ol>

<div class="footnote">
資料作成協力: 石川由希 (名古屋大学 理学研究科 脳回路構造学 講師)<br>
2019-10-30 生物棟大会議室
</div>

---
## Reproducible Research (再現可能な研究)

### Programming!

### Backup!


---
## Source codes grow messy

Lots of unused codes, just in case...

```r
library(tidyverse)

# diamonds %>%
#   select(carat, price) %>%
#   filter(carat > 1)
#
#
# ... long long old code worked in the past ...
#
#

result = diamonds %>%
  select(carat, cut, price) %>%
  filter(carat > 2) %>%
  group_by(cut) %>%
  summarize_all(mean) %>%
  print()
```

---
## Directories grow messy

Lots of different versions. Which is the latest?

```
% ls
analysis.R
analysis2.R
analysis-20180129.R
analysis-20180129fix.R
analysis-kuma-edit.R
analysis-yoko-edit.R
analysis完全版.R
analysis最終.R
analysis最終2.R
analysis最終改.R
analysis決定版！.R
plot.R
plot2.R
plot最終.R
plot論文.R
```

---
## Timestamp in filename is not enough

You found a bug. How can you find its origin, and fix all the copies?

<figure>
<img src="/slides/image/messy/yuki-zawa.png" width="480"
     style="object-fit: cover; object-position: top; height: 500px;">
</figure>


---
## Version control with Git + GitHub

- Only the latest files are visible.
- You can easily browse and rollback the version history.

<figure>
<a href="https://github.com/heavywatal/tumopp">
<img src="/slides/image/messy/github-repository.png" height="500" class="screenshot">
</a>
&nbsp;
<a href="https://github.com/heavywatal/tumopp/commits/master">
<img src="/slides/image/messy/github-history.png" height="500" class="screenshot">
</a>
</figure>


---
## Online Storages and Time Machine are useful

- [Dropbox<img height=22 width=22 src="https://cdn.simpleicons.org/dropbox">](https://dropbox.com) や
  [Google Drive<img height=22 width=22 src="https://cdn.simpleicons.org/googledrive">](https://drive.google.com/)
  では、保存のたびに履歴が残る。
- [Time Machine](https://support.apple.com/HT201250)
  では、一定時間間隔で履歴が残る。

<br>
But they are not designed for version control or collaborative work.

- 履歴の保持期間が限られている。 (e.g., <180 days on Dropbox)
- オフラインだったりバッテリー駆動だったりすると保存漏れが起きる。
- いつのバージョンに戻したらいいのか、日時以外の手掛かりが無い。
- ファイル変更の競合・衝突に対処しにくい。


---
## Git<img height=22 width=22 src="https://cdn.simpleicons.org/git"> and GitHub<img height=22 width=22 src="https://cdn.simpleicons.org/github">

- いつでも好きなところに戻れる安心感
    - 履歴を残すタイミングは任意 = 手動。
    - バージョン(リビジョン)ごとにメッセージを残せる。
    - 差分を簡単に見られる。
- 複数マシンや複数人での並列作業にも使える
    - オフラインでも作業できる。
    - ブランチを作ることで競合・衝突の影響を抑えられる。
    - もし競合・衝突が起きてもうまく対処する機能がある。
    - 課題を管理する機能もある。
- 読み方はギット、ギットハブ。(ちなみに画像のGIFはジフ)

e.g., https://github.com/tidyverse/stringr/commits/master


---
## Git<img height=22 width=22 src="https://cdn.simpleicons.org/git"> and GitHub<img height=22 width=22 src="https://cdn.simpleicons.org/github">

[Git<img height=22 width=22 src="https://cdn.simpleicons.org/git">](https://git-scm.com/)
: 分散型バージョン管理システムとして最も広く使われるオープンソース・ソフトウェア。
: 手元のコンピュータ上でこれを操作して、変更履歴を記録・閲覧したり送受信したりする。

[GitHub<img height=22 width=22 src="https://cdn.simpleicons.org/github">](https://github.com)
: Gitをより便利に使うためのオンラインサービス。
: それを運営する会社の名前でもある。
: 多人数でプロジェクトを共有するプラットフォームとしても有用。

---
## Alternative tools and services

- Version Control System (VCS)
    - [Git<img height=22 width=22 src="https://cdn.simpleicons.org/git"> `git`](https://git-scm.com/)
    - [Mercurial<img height=22 width=22 src="https://cdn.simpleicons.org/mercurial"> `hg`](https://www.mercurial-scm.org/)
    - その他 svn, cvs, rcs など。
- Hosting Service
    - [GitHub<img height=22 width=22 src="https://cdn.simpleicons.org/github">](https://github.com):
      公開リポジトリは無料。教職員・学生なら非公開も無料。
    - [Bitbucket<img height=22 width=22 src="https://cdn.simpleicons.org/bitbucket">](https://bitbucket.org/):
      非公開リポジトリも無料。
    - [GitLab<img height=22 width=22 src="https://cdn.simpleicons.org/gitlab">](https://about.gitlab.com/):
      非公開リポジトリも無料。ローカル版もあり。
    - [Gitea<img height=22 width=22 src="https://cdn.simpleicons.org/gitea">](https://gitea.io/en-us/):
      ローカル版のみ。
    - その他 SourceForge, Google Code など。

VCSは基本的にGit一択。<br>
ホスティングサービスは、使い方や予算などに応じて選択。


---
## Git<img height=22 width=22 src="https://cdn.simpleicons.org/git"> basics: Export local changes

📁 working directory (working tree)
: 手元のファイルの変更はまだリポジトリに登録されていない
: ↓ `git add`

<img height=22 width=22 src="https://cdn.simpleicons.org/git"> staging area (index)
: 次のコミットに含めるファイルをマークする段階
: ↓ `git commit`

<img height=22 width=22 src="https://cdn.simpleicons.org/git"> local repository
: 変更履歴が `.git/` 内に記録されている
: ↓ `git push`

<img height=22 width=22 src="https://cdn.simpleicons.org/github"> remote repository
: GitHubなど別マシンのリポジトリに反映


---
## Git<img height=22 width=22 src="https://cdn.simpleicons.org/git"> basics: Import changes

<img height=22 width=22 src="https://cdn.simpleicons.org/github"> remote repository
: ↓ `git fetch`

<img height=22 width=22 src="https://cdn.simpleicons.org/git"> local repository
: 変更が `.git/` に取り込まれたが、見えてるファイルには反映されてない
: ↓ `git checkout` or `git merge`

📁 working directory
: 手元のファイルが最新版に同期されている


---
## GitHub<img height=22 width=22 src="https://cdn.simpleicons.org/github"> functions

- Basic: version control of plain texts
    - Source code:
      e.g., [ggplot2](https://github.com/tidyverse/ggplot2), [rstan](https://github.com/stan-dev/rstan)
    - Manuscript and supplementary information:
      e.g., [R4DS](https://github.com/hadley/r4ds), [Advanced R programming](https://github.com/hadley/adv-r/)

- GitHub Pages: hosting websites
    - Website: https://heavywatal.github.io/rtumopp/
    - Source code: https://github.com/heavywatal/rtumopp/tree/master/docs


---
## GitHub<img height=22 width=22 src="https://cdn.simpleicons.org/github"> functions

- Issues:
  バグ報告、機能要望、課題の列挙などに使われる。
  タグを付けたり、特定の人にassignすることもできる。<br>
  e.g., https://github.com/gohugoio/hugo/issues, https://github.com/nlohmann/json/issues

- Projects:
  プロジェクトのタスク管理のためのツール。
  もちろんissueとも連携可能。<br>
  e.g., https://github.com/r-lib/pillar/projects/1

- Wiki:
  チーム内のちょっとした情報共有などに。
  でもできればそういう文書もちゃんとGitで管理したほうがいい。<br>
  e.g., https://github.com/gnab/remark/wiki


---
## <a href="/lectures/git2019makino.html">Let's start using!</a>
