<?php
	// if uninstall.php is not called by WordPress, die
	if(!defined('WP_UNINSTALL_PLUGIN')){
		die;
	}

    class BOOKING_EASY_UNINSTALL {


        function __construct() {

            require_once( plugin_dir_path( __FILE__ ) . 'lib/database.php' );

            $dbPrefix = 'wp_tantive_gimmick_pack_';

            $tantiveGimmickPackDirPath = plugin_dir_path( __FILE__ );    // スラッシュまで入れたDIRパス
    
            $database = new tantiveGimmickPackDatabase( $dbPrefix, $tantiveGimmickPackDirPath );
    
            $database->allDrop();   // データベースを全て削除する

        }

    }

    $uninstall = new BOOKING_EASY_UNINSTALL();
?>