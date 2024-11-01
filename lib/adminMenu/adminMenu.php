<?php

if(!defined('ABSPATH')){
    exit;
}

class tantiveGimmickPackAdminMenu {

    public function __construct( $dbPrefix , $tantiveGimmickPackDirPath, $action_control ) {

        require_once( $tantiveGimmickPackDirPath . 'lib/database.php' );

        $this->dbPrefix = $dbPrefix;
        $this->tantiveGimmickPackDirPath = $tantiveGimmickPackDirPath;
        $this->action_control = $action_control;

        $this->database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

    }

    public function topSetting($plugin_version) {

        $p_v = "?p_v=" . $plugin_version;

        // CSS読み込み
        wp_enqueue_style(
            'adminMenu.css',                                                // ハンドラ
            plugin_dir_url( __FILE__ ) . '../../css/adminMenu.css' . $p_v,  // CSS実体
            array(),                                                        // 依存するCSS
            $plugin_version,                                                // バージョン
        );
        
        ?>
        <div class='greetingBox'>
            <p>ギミックパックのご利用ありがとうございます。</p>
            <p>ページ背景へのアニメーション設置など、様々なギミックを簡単に利用できるプラグインです。</p>
            <p>ギミックは随時追加予定です。</p>
            <p>ご期待ください。<p>
            <p>詳細は<a href="https://tantive-sl.com/gimmickpack">公式サポートページ</a>をご覧ください。</p>
        </div>
        <?php
    }

    // 全体背景に関する設定画面
    public function bodyBackgroundSetting($plugin_version) {

        $p_v = "?p_v=" . $plugin_version;

        // CSS読み込み
        wp_enqueue_style(
            'adminMenu.css',                                                // ハンドラ
            plugin_dir_url( __FILE__ ) . '../../css/adminMenu.css' . $p_v,  // CSS実体
            array(),                                                        // 依存するCSS
            $plugin_version,                                                // バージョン
        );

        // javascript読み込み
        wp_enqueue_script(
            'ajax_js',                                              // ハンドル名
            plugin_dir_url( __FILE__ ) . '../../js/ajax.js' . $p_v, // JS実体
            array(),                                                // 依存するスクリプト
            $plugin_version,                                        // プラグインバージョン
        );
        wp_enqueue_script(
            'bodyBackgroundSetting.js',                                                         // ハンドラ
            plugin_dir_url( __FILE__ ) . '../../js/adminMenu/bodyBackgroundSetting.js' . $p_v,   // JS実体
            array(),                                                                            // 依存するスクリプト
            $plugin_version                                                                     // バージョン
        );

        // DBから各ギミックに関するデータを取得
        $backgroundGimmickData = $this->database->getBackgroundSetting();

        // javascriptに渡すデータ
        $localizeData['plugin_dir_url'] = plugin_dir_url( __FILE__ ) . '../../';
        $localizeData['backgroundGimmickData'] = $backgroundGimmickData;
        $localizeData['secret'] = wp_create_nonce( $this->action_control . '_ajax' );
        $localizeData['action'] = $this->action_control;
        $localizeData['ajaxUrl'] = admin_url('admin-ajax.php');
        wp_localize_script('bodyBackgroundSetting.js', 'localizeData', $localizeData);
        ?>
        <div id="backgroundSettingPanel">
            <div>
                <p>描画したいギミックのショートコードを固定ページや投稿ページの任意の場所に挿入してください。</p>
                <p>各ギミックの設定値等については<a href="https://tantive-sl.com/gimmickpack">公式サポートページ</a>をご覧ください</p>
            </div>
        </div>
        <div class="backgroundSettingModalPanel hiddenPanel"></div>
        <?php
    }

    // マウスストーカーに関する設定画面
    public function mouseStalkerSetting ( $plugin_version ) {

        $this->database->msouseStalkerDataCreate();  // DBがなかったら作る

        $p_v = "?p_v=" . $plugin_version;
       
        // CSS読み込み
        wp_enqueue_style(
            'adminMenu.css',                                                // ハンドラ
            plugin_dir_url( __FILE__ ) . '../../css/adminMenu.css' . $p_v,  // CSS実体
            array(),                                                        // 依存するCSS
            $plugin_version,                                                // バージョン
        );

        // javascript読み込み
        wp_enqueue_script(
            'ajax_js',                                              // ハンドル名
            plugin_dir_url( __FILE__ ) . '../../js/ajax.js' . $p_v, // JS実体
            array(),                                                // 依存するスクリプト
            $plugin_version,                                        // プラグインバージョン
        );
        wp_enqueue_script(
            'mouseStalkerSetting.js',                                                         // ハンドラ
            plugin_dir_url( __FILE__ ) . '../../js/adminMenu/mouseStalkerSetting.js' . $p_v,   // JS実体
            array(),                                                                            // 依存するスクリプト
            $plugin_version                                                                     // バージョン
        );

        // DBから各マウスストーカーに関するデータを取得
        $mouseStalkerGimmickData = $this->database->getMsouseStalkerSetting();

        // javascriptに渡すデータ
        $localizeData['plugin_dir_url'] = plugin_dir_url( __FILE__ ) . '../../';
        $localizeData['mouseStalkerGimmickData'] = $mouseStalkerGimmickData;
        $localizeData['secret'] = wp_create_nonce( $this->action_control . '_ajax' );
        $localizeData['action'] = $this->action_control;
        $localizeData['ajaxUrl'] = admin_url('admin-ajax.php');
        wp_localize_script('mouseStalkerSetting.js', 'localizeData', $localizeData);
        ?>
        <div id="mouseStalkerSettingPanel">
        </div>
        <div id="mouseStalkerSettingModalPanel" class="hiddenPanel"></div>
        <?php

    }
}