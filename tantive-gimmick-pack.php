<?php
/*
Plugin Name: Tantive Gimmick Pack
Plufin UEI: https://tantive-sl.com/gimmickpack
Description: A plugin for WordPress that allows you to use various gimmicks, such as placing animations on page backgrounds.
Version: 1.1.2
Author: tantive
Author URI: https://tantive-sl.com
License: GPLv2
*/

defined( 'ABSPATH' )  || exit;   // 外部からのアクセス禁止

class tantiveGimmickPack {

    public $plugin_name = 'tantiveGimmickPack';
    public $plugin_version = '1.0';
    public $dbPrefix = 'wp_tantive_gimmick_pack_';
    public $action_control = 'tantive_gimmick_pack_action';

    function __construct() {

        require_once( plugin_dir_path( __FILE__ ) . 'lib/adminMenu/adminMenu.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'lib/database.php' );

        $this->tantiveGimmickPackDirPath = plugin_dir_path( __FILE__ );    // スラッシュまで入れたDIRパス

        // プラグインが有効化された時
        register_activation_hook( __FILE__, array($this, 'register_activation' ));

        // プラグインが削除された時
        register_deactivation_hook( __FILE__, array($this, 'register_deactivation' ));
    
        $this->adminMenu = new tantiveGimmickPackAdminMenu( $this->dbPrefix, $this->tantiveGimmickPackDirPath, $this->action_control );

        add_action('admin_menu', array($this, 'add_pages'));    // 管理画面

        add_action( 'wp_ajax_' . $this->action_control, array($this, 'ajaxReceive') );          // ajax通信用
        add_action( 'wp_ajax_nopriv_' . $this->action_control, array($this, 'ajaxReceive') );   // ajax通信用

        if(!is_admin()) {   // 管理画面以外ではショートコードの設定
            add_shortcode( 'particles', array( $this, 'drawParticles' ) );
            add_shortcode( 'bubbly', array( $this, 'drawBubbly' ) );
            add_shortCode( 'vanta', array( $this, 'drawVanta' ));

            add_action( 'wp_head', array( $this, 'mousStalkerDraw' ));  // マウスストーカーを画面表示する
        }

    }

    // プラグインが有効化された時
    function register_activation() {

        $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

        $database->create();    // データベースを作成する

        $database->createFirstBackgroundGimmickSetting();

    }

    // プラグインが削除された時
    function register_deactivation() {

        $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

        $database->drop();    // 全てのデータベースを削除する

    }

    // 管理画面でのメニュー表示
    function add_pages() {

        $adminMenu = $this->adminMenu;
        $plugin_name = $this->plugin_name;

        add_menu_page(
            $plugin_name,                           // ページタイトル  
            "ギミックパック設定",                   // メニュータイトル
            'manage_options',                       // 権限
            // 'tantive-gimmick-pack',                 // スラッグ
            __FILE__,                               // スラッグ
            array($this,'topSetting'),              // 関数
            'dashicons-admin-generic',              // アイコン
        );

        add_submenu_page(   
            // 'tantive-gimmick-pack',                 // 親メニューのスラッグ
            __FILE__,                               // 親メニューのスラッグ
            $plugin_name,                           // ページタイトル
            'ページ背景設定',                        // メニュータイトル
            'manage_options',                       // 権限
            'bodyBackgroundSetting',                // スラッグ
            array($this,'bodyBackgroundSetting'),   // 関数
        );

        add_submenu_page(   
            // 'tantive-gimmick-pack',                 // 親メニューのスラッグ
            __FILE__,                               // 親メニューのスラッグ
            $plugin_name,                           // ページタイトル
            'マウスストーカー設定',                  // メニュータイトル
            'manage_options',                       // 権限
            'mouseStalkerSetting',                  // スラッグ
            array($this,'mouseStalkerSetting'),   // 関数
        );

    }

    function topSetting() {

        $adminMenu = $this->adminMenu;

        $adminMenu->topSetting( $this->plugin_version );

    }

    function bodyBackgroundSetting() {

        $adminMenu = $this->adminMenu;

        $adminMenu->bodyBackgroundSetting($this->plugin_version);

    }

    function mouseStalkerSetting() {

        $adminMenu = $this->adminMenu;

        $adminMenu->mouseStalkerSetting($this->plugin_version);

    }

    function ajaxReceive() {

        $mode = $_POST['mode'];
        $action = $_POST['action'];
        $secret = $_POST['secret'];

        if (isset($secret) && check_ajax_referer($this->action_control . '_ajax', 'secret')) {

            if( $mode == 'updateDetailSettingParticles' ) {	// particles.js用詳細設定保存

                $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

                $settingData = $this->dataSanitize(json_decode( stripslashes(sanitize_text_field($_POST['settingData'])), true ));

                $resp = $database->updateDetailSettingParticles( $settingData, sanitize_text_field( $_POST['type'] ), sanitize_text_field( $_POST['name'] ) );

            } else if( $mode == 'getDetailSettingParticles' ) { // particles.js用詳細設定取得

                $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

                $resp = $database->getDetailSettingParticles( sanitize_text_field( $_POST['type'] ), sanitize_text_field( $_POST['name'] ) );

            } else if( $mode == 'updateMousStalkerSetting') {  // マウスストーカー設定保存
                
                $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

                $settingData = json_decode( stripslashes(sanitize_text_field($_POST['settingData'])), true );

                $resp = $database->updateMousStalkerSetting( $_POST['key'], $settingData );

            } else if( $mode == 'mouseStalkerSelectSetting' ){  // マウスストーカー選択設定

                $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

                $settingData = json_decode( stripslashes(sanitize_text_field($_POST['selectedRadio'])), true );

                $resp = $database->mouseStalkerSelectSetting( $settingData );
            
            }

            if ($this->getPhpVersion() <= 5.4) {

                print json_encode($resp);
                
            } else {

                print json_encode($resp, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
                
            }

        }

        die();

    }

    function getPhpVersion(){
		
        $v = explode('.', phpversion());
        $phpV = $v[0].".".$v[1];
        return floatval($phpV);
        
    }
    
    // particles.jsを描画する
    function drawParticles( $attr ) {

        $this->drawParticlesId = $attr['id'];

        $p_v = "?p_v=" . $this->plugin_version;

        add_action( 'wp_footer', array( $this, 'drawParticlesJs' ));    // フッター前にjs読み込み
        
        // cssを読み込む
        wp_enqueue_style( 'particle-css', plugin_dir_url( __FILE__ ) . 'css/particles/particles.css' . $p_v, array(), $this->plugin_version);

    }

    function drawParticlesJs() {

        // particles.jsのスクリプトを読み込む
        $p_v = "?p_v=" . $this->plugin_version;

        $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

        wp_enqueue_script(
            'particles-js',         // ハンドル
            plugin_dir_url( __FILE__ ) . '/js/particles/particles.min.js'  . $p_v,
        );
        wp_enqueue_script(
            'particles-app-js',
            plugin_dir_url( __FILE__ ) . '/js/particles/app.js'  . $p_v,
            array(),
            $this->plugin_version,
        );

        // particles.jsに渡す引数
        $localizeData['particles'] = $database->getDetailSettingParticles( 'particles', $this->drawParticlesId );    // particles.js用詳細設定値取得
        wp_localize_script( 'particles-app-js', 'localizeData', $localizeData );

    }

    // bubbly.jsを描画する
    function drawBubbly( $attr ) {

        $this->drawBubblyId = $attr['id'];

        $p_v = "?p_v=" . $this->plugin_version;

        add_action( 'wp_footer', array( $this, 'drawBubblyJs' ));    // フッター前にjs読み込み

    }

    function drawBubblyJs() {

        // bubbly.jsのスクリプトを読み込む
        $p_v = "?p_v=" . $this->plugin_version;

        $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

        wp_enqueue_script(
            'bubbly-bg-js',
            plugin_dir_url( __FILE__ ) . '/js/bubbly/bubbly-bg.js'  . $p_v,
        );
        wp_enqueue_script(
            'bubbly-js',         // ハンドル
            plugin_dir_url( __FILE__ ) . '/js/bubbly/bubbly.js'  . $p_v,
            array(),
            $this->plugin_version,
        );

        // bubbly.jsに渡す引数
        $localizeData['bubbly'] = $database->getDetailSettingParticles( 'bubbly', $this->drawBubblyId );    // particles.js用詳細設定値取得
        wp_localize_script( 'bubbly-js', 'localizeData', $localizeData );

    }

    // vanta.jsを描画する
    function drawVanta( $attr ) {

        $p_v = "?p_v=" . $this->plugin_version;

        $this->drawVantaId = $attr['id'];

        $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

        $this->vantaData = $database->getDetailSettingParticles( 'vanta', $this->drawVantaId , true );

        add_action( 'wp_footer', array( $this, 'drawVantaJs' ));    // フッター前にjs読み込み

        // $str =<<<EOS
        // <!-- 動かすエリア -->
        // <div class="wrap">
        //     <div id="vanta-js"></div>
        // </div>
        // <!-- 動かすエリアここまで -->
        // EOS;

        // cssを読み込む
        wp_enqueue_style( 'particle-css', plugin_dir_url( __FILE__ ) . 'css/particles/particles.css' . $p_v, array(), $this->plugin_version);

        // return $str;


    }

    function drawVantaJs () {

        $p_v = "?p_v=" . $this->plugin_version;

        $jsArray = array(
            'birds' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.birds.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/birdsApp.js'  . $p_v,
            ),
            'fogs' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.fog.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/fogsApp.js'  . $p_v,
            ),
            'waves' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.waves.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/wavesApp.js'  . $p_v,
            ),
            'clouds' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.clouds.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/cloudsApp.js'  . $p_v,
            ),
            'clouds2' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.clouds2.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/clouds2App.js'  . $p_v,
            ),
            'globe' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.globe.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/globeApp.js'  . $p_v,
            ),
            'net' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.net.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/netApp.js'  . $p_v,
            ),
            'cells' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.cells.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/cellsApp.js'  . $p_v,
            ),
            'trunk' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/p5.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.trunk.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/trunkApp.js'  . $p_v,
            ),
            'topology' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/p5.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.topology.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/topologyApp.js'  . $p_v,
            ),
            'dots' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.dots.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/dotsApp.js'  . $p_v,
            ),
            'rings' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.rings.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/ringsApp.js'  . $p_v,
            ),
            'halo' => array( 
                'core'=> plugin_dir_url( __FILE__ ) . '/js/vanta/three.r134.min.js'  . $p_v, 
                'vantaJs'=> plugin_dir_url( __FILE__ ) . '/js/vanta/vanta.halo.min.js'  . $p_v, 
                'appJs' => plugin_dir_url( __FILE__ ) . '/js/vanta/haloApp.js'  . $p_v,
            ),
        );

        wp_enqueue_script(
            'vantaBasis-js',         // ハンドル
            $jsArray[$this->vantaData['kind']]['core'],    // 3dのcoreJS
        );
        wp_enqueue_script(
            'vanta-js',         // ハンドル
            $jsArray[$this->vantaData['kind']]['vantaJs'],    // vantaの本体
        );
        wp_enqueue_script(
            'vanta-app-js',
            $jsArray[$this->vantaData['kind']]['appJs'],
            array(),
            $this->plugin_version,
        );

        // vanta.jsに渡す引数
        $localizeData['vanta'] = $this->vantaData['parameter'];
        $localizeData['noise'] = plugin_dir_url( __FILE__ ) . 'assets/noise.png';
        wp_localize_script( 'vanta-js', 'localizeData', $localizeData );

    }

    function dataSanitize( $data ) {    // データをチェック

        $typeArray = array (
            'ParticlesNumberValue'=> 'number',
            'ParticlesNumberDensityEnable'=> 'number',
            'ParticlesNumberDensityValueArea'=> 'number',
            'ParticlesColorValue'=> 'color',
            'ParticlesShapeStrokeStrokeWidth'=> 'number',
            'ParticlesShapeStrokeStrokeColor'=> 'color',
            'ParticlesShapePolygonPolygonNlbSides'=> 'number',
            'ParticlesShapeImageImageSrc'=> 'file',
            'ParticlesShapeImageImageWidth'=> 'number',
            'ParticlesShapeImageImageHeight'=> 'number',
            'ParticlesShapeType'=> 'text',
            'ParticlesSizeAnimAnimEnable'=> 'number',
            'ParticlesSizeAnimAnimSpeed'=> 'number',
            'ParticlesSizeAnimAnimSizeMin'=> 'number',
            'ParticlesSizeAnimAnimSync'=> 'number',
            'ParticlesSizeValue'=> 'number',
            'ParticlesSizeRandom'=> 'number',
            'ParticlesOpacityAnimAnimEnable'=> 'number',
            'ParticlesOpacityAnimAnimSpeed'=> 'number',
            'ParticlesOpacityAnimAnimOpacityMin'=> 'number',
            'ParticlesOpacityAnimAnimSync'=> 'number',
            'ParticlesOpacityValue'=> 'number',
            'ParticlesOpacityRandom'=> 'number',
            'ParticlesLineLinkedEnableAuto'=> 'number',
            'ParticlesLineLinkedDistance'=> 'number',
            'ParticlesLineLinkedColor'=> 'color',
            'ParticlesLineLinkedOpacity'=> 'number',
            'ParticlesLineLinkedWidth'=> 'number',
            'ParticlesMoveEnable'=> 'number',
            'ParticlesMoveDirection'=> 'text',
            'ParticlesMoveRandom'=> 'number',
            'ParticlesMoveStraight'=> 'number',
            'ParticlesMoveSpeed'=> 'number',
            'ParticlesMoveoutMode'=> 'text',
            'ParticlesMoveAttractEnable'=> 'number',
            'ParticlesMoveAttractRotateX'=> 'number',
            'ParticlesMoveAttractRotateY'=> 'number',
            'InteractivityOnhoverEnable'=> 'number',
            'InteractivityOnhoverMode'=> 'text',
            'InteractivityOnclickEnable'=> 'number',
            'InteractivityOnclickMode'=> 'text',
            'InteractivityModesGrabLineLinkedOpacity'=> 'number',
            'InteractivityModesGrabDistance'=> 'number',
            'InteractivityModesBubbleDistance'=> 'number',
            'InteractivityModesBubbleSize'=> 'number',
            'InteractivityModesBubbleOpacity'=> 'number',
            'InteractivityModesBubbleDuration'=> 'number',
            'InteractivityModesRepulseDistance'=> 'number',
            'InteractivityDetectOn'=> 'text',
            'pageBackgroundBackgroundColor'=> 'color',
            'pageBackgroundBackgroundImageUrl'=> 'file',
            'pageBackgroundBackgroundSize'=> 'text',
            'pageBackgroundBackgroundPosition'=> 'text',
            'pageBackgroundBackgroundRepeat'=> 'text',
            'pageBackgroundBackgroundHardCard'=> 'number',
            'retinaDetect'=> 'number',
            'BubblyAnimate' => 'text',
            'BubblyBlur' => 'number',
            'BubblyBubbleFunc' => 'text',
            'BubblyBubbles' => 'text',
            'BubblyCanvas' => 'text',
            'BubblyColorStart' => 'color',
            'BubblyColorStop' => 'color',
            'BubblyCompose' => 'text',
            'BubblyShadowColor' => 'color',
            'BubblyAngleFunc' => 'text',
            'BubblyVelocityFunc' => 'text',
            'BubblyRadiusFunc' => 'text',
            'vantaBirdsBackgroundColor' => 'color',
            'vantaBirdsBackgroundAlpha' => 'number',
            'vantaBirdsColor1' => 'color',
            'vantaBirdsColor2' => 'color',
            'vantaBirdsColorMode' => 'text',
            'vantaBirdsQuantity' => 'number',
            'vantaBirdsBirdSize' => 'number',
            'vantaBirdsWingSpan' => 'number',
            'vantaBirdSpeedLimit' => 'number',
            'vantaBirdSeparation' => 'number',
            'vantaBirdAlignment' => 'number',
            'vantaBirdCohesion' => 'number',
            'vantaFogsHighlightColor' => 'color',
            'vantaFogsMidtoneColor' => 'color',
            'vantaFogsLowlightColor' => 'color',
            'vantaFogsBaseColor' => 'color',
            'vantaFogsBlurFactor' => 'number',
            'vantaFogsZoom' => 'number',
            'vantaFogsSpeed' => 'number',
            'vantaWavesColor' => 'color',
            'vantaFogsShininess' => 'number',
            'vantaFogsWaveHeight' => 'number',
            'vantaFogsWaveSpeed' => 'number',
            'vantaFogsZoom' => 'number',
            'vantaCloudsBackgroundColor' => 'color',
            'vantaCloudsSkyColor' => 'color',
            'vantaCloudsCloudColor' => 'color',
            'vantaCloudsCloudShadowColor' => 'color',
            'vantaCloudsSunColor' => 'color',
            'vantaCloudsSunGlareColor' => 'color',
            'vantaCloudsSunlightColor' => 'color',
            'vantaCloudsSpeed' => 'number',
            'vantaClouds2BackgroundColor' => 'color',
            'vantaClouds2SkyColor' => 'color',
            'vantaClouds2CloudColor' => 'color',
            'vantaClouds2LightColor' => 'color',
            'vantaClouds2Speed' => 'number',
            'vantaGlobeBackgroundColor' => 'color',
            'vantaGlobeColor' => 'color',
            'vantaGlobeColor2' => 'color',
            'vantaGlobeSize' => 'number',
            'vantaNetColor' => 'colo',
            'vantaNetBackgroundColor' => 'color',
            'vantaNetPoints' => 'number',
            'vantaNetMaxDistance' => 'number',
            'vantaNetSpacing' => 'number',
            'vantaNetShowDots' => 'number',
            'vantaCellsColor1' => 'color',
            'vantaCellsColor2' => 'color',
            'vantaCellSize' => 'number',
            'vantaCellSpeed' => 'number',
            'vantaTrunkBackgroundColor' => 'color',
            'vantaTrunkColor' => 'color',
            'vantaTrunkSpacing' => 'number',
            'vantaTrunkChaos' => 'number',
            'vantaTopologyBackgroundColor' => 'color',
            'vantaTopologyColor' => 'color',
            'vantaDotsBackgroundColor' => 'color',
            'vantaDotsColor' => 'color',
            'vantaDotsColor2' => 'color',
            'vantaDotsSize' => 'number',
            'vantaDotsSpacing' => 'number',
            'vantaDotSShowLines' => 'number',
            'vantaRingsColor' => 'color',
            'vantaRingsBackgroundColor' => 'color',
            'vantaRingsBackgroundAlpha' => 'number',
            'vantaHaloBackgroundColor' => 'color',
            'vantaHaloBaseColor' => 'color',
            'vantaHaloSize' => 'number',
            'vantaHaloAmplitudeFactor' => 'number',
            'vantaHaloXOffset' => 'number',
            'vantaHaloYOffset' => 'number',
        );

        foreach( (array) $data as $key => $value ) {
            
            sanitize_text_field( $data[$key] );
            if ( $typeArray[$key] == 'number' ) {
                $data[$key] = floatval( $data[$key] );
            } else if ( $typeArray[$key] == 'text' ) {

            } else if ( $typeArray[$key] == 'color' ) {
                $data[$key] = sanitize_hex_color($data[$key]);
            } else if ( $typeArray[$key] == 'file' ) {
                $data[$key] = sanitize_file_name($data[$key]);
            } 
        }

        return $data;

    }

    function mousStalkerDraw() {

        $database = new tantiveGimmickPackDatabase( $this->dbPrefix, $this->tantiveGimmickPackDirPath );

        // 設定がオンになっているものを拾ってくる
        $mouseStalkerSetting = $database->getMsouseStalkerON();

        if( $mouseStalkerSetting >= 0 ){ // オンになっているものがあるのでCSSとJSとlocalizedataを作る

            $p_v = "?p_v=" . $this->plugin_version;

            wp_enqueue_style(
                'mouseStalker.css',                                                // ハンドラ
                plugin_dir_url( __FILE__ ) . '/css/mouseStalker/mouseStalker.css' . $p_v,  // CSS実体
                array(),                                                        // 依存するCSS
                $this->plugin_version,                                                // バージョン
            );
    
            wp_enqueue_script(
                'mouseStalker_js',                                      // ハンドル名
                plugin_dir_url( __FILE__ ) . '/js/mouseStalker/mouseStalker.js' . $p_v, // JS実体
                array(),                                                // 依存するスクリプト
                $this->plugin_version,                                        // プラグインバージョン
            );

            $localizeData['mouseStalkerSetting'] = $mouseStalkerSetting;
            wp_localize_script('mouseStalker_js', 'localizeData', $localizeData);

        }


    }

}

new tantiveGimmickPack();
