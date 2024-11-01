=== Tantive Gimmick Pack ===
Contributors: tantive
Donate link: https://tantive-sl.com
Tags: particle, particle background, particles.js, bubbly-gb, bubbly-bg background, bubbly-bg.js, vanta, vanta background, vanta.jsbackground, backgrounds, mouse stalker, mouse,
Requires at least: 6.0
Tested up to: 6.6.1
Requires PHP: 7.4
Stable tag: 1.1.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

背景へのアニメーション設置、マウスストーカーなど、様々なギミックが利用できるプラグイン。

== Description ==

・ページ全体の背景へのアニメーション設置ができます。
　アニメーションの実現は、paraticle.js、bubbly-bg.js、vanta.jsなどのライブラリを利用しています。
・マウスストーカーの設置ができます。

= 仕様 =

【ページ背景】
　<設定>
　　ダッシュボードのギミックパック設定メニューからページ背景設定を選択します。
　　利用したいアニメーションの「設定」ボタンをクリックすると、詳細設定画面が表示されます。
　　設定値については、各ライブラリのデモページなどを参考にしてください。
　　デモページで設定できるのと同じ内容を設定できるようにしていますが、bubbly-bgについては、一部設定方法に注意が必要です。
　　ーbubbleFunc、bubbles、angleFunc、velocityFunc、radiusFuncについては、変数を使用しないでください。
　　　例えば、bubblesのデフォルト値は「Math.floor((canvas.width + canvas.height) * 0.02)」ですが、
　　　canvas.widthは変数なのでこのプラグインでは設定できません。
　　　Math.floorは変数ではないので使用可能です。
　　ーbubbleFunc、angleFunc、velocityFunc、radiusFuncについては、「()=>」の右に入る返り値のみを設定してください。
　　　「()=>」は不要です。
　　　例えば、angleFuncのデフォルト値は「() => Math.random() * Math.PI * 2」ですが、
　　　この場合は「Math.random() * Math.PI * 2」のみを設定してください。
　　ーbubbleFunc、angleFunc、velocityFunc、radiusFuncのデフォルト値を設定する場合は、何も入力せず保存してください。
　
　<ショートコード>
　　固定ページ、投稿ページの設定したいページに、設定画面のお好みのギミックに記載したショートコードを記述してください。
　　場所はどこでも構いません。
　　（注意）ページに背景ギミックを設定する際は、必ず最初にそのギミックの設定値を保存してください。
　　　　　　初期は何も設定値が登録されていない状態となり、正常に描画されません。

【マウスストーカー】
　<設定>
　　数種類のマウスストーカーから設定できます。
　　設定したいマウスストーカーのオンオフスイッチをオンにします。
　　各マウスストーカーに関する設定値は設定ボタンを押すことで設定できます。
　　設定した内容は、四角で区切ったエリアで動作を確認することができます。
　　設定したマウスストーカーの種類および、設定値は全てのページに反映されます。

== Installation ==

= 自動インストール =
1. プラグインの検索フィールドより「gimmick pack」と入力し、"プラグインの検索"をクリックします。
1. 当プラグインを見つけたら、"今すぐインストール"をクリックしてインストールし、プラグインを有効化してください。

= 手動インストール =
1. プラグインをダウンロードします。
1. プラグインフォルダ内にアップロードし、管理画面よりプラグインを有効化してください。

== Frequently Asked Questions ==
No information

== Screenshots ==

1. /assets/backgroundGimmickParticle01.png
2. /assets/backgroundGimmickBubbly01.png
3. /assets/backgroundGimmickVantaBirds.png
4. /assets/mouseStalker01.png
5. /assets/mouseStalker02.png

== Changelog ==
= 1.1.2 =
Compatible with WordPress Ver. 6.6.1


= 1.1.1 =
Compatible with WordPress Ver. 6.3.1

= 1.1.0 =
Add mouse stalker.

= 1.0.1 =
Compatible with WordPress Ver. 6.1

= 1.0.0 =
Initial working version.

== Upgrade Notice ==
No information
