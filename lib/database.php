<?php

if(!defined('ABSPATH')){
    exit;
}

class tantiveGimmickPackDatabase {

    public function __construct( $dbPrefix , $tantiveGimmickPackDirPath ) {

        global $wpdb;

        $this->dbPrefix = $dbPrefix;

        $this->tantiveGimmickPackDirPath = $tantiveGimmickPackDirPath;

        $charset_collate = $wpdb->get_charset_collate();

        $table_name = $dbPrefix . 'background_gimmick_setting_particles';
        $this->db_object[$table_name] = array(
            "table" => $table_name,
            "sql" => 'CREATE TABLE ' .$table_name. ' (%s %s) ' . $charset_collate . ';',
            "uniqueKey" => ",  PRIMARY KEY (`id`)",
            "columns" => array(
                "id"			=> "`id`			INT(11) NOT NULL",
                "image"         => "`image`			TEXT DEFAULT NULL",             // サンプル画像のURL
                "name"          => "`name`			VARCHAR(255) DEFAULT NULL",     // 表示される名称
                "description"   => "`description`	TEXT DEFAULT NULL",             // 内容説明
                "type"          => "`type`			VARCHAR(255) DEFAULT NULL",     // ギミックタイプ
                "kind"          => "`kind`			VARCHAR(255) DEFAULT NULL",     // 未使用
                "demo"          => "`demo`			VARCHAR(255) DEFAULT NULL",     // デモページURL
                "shortcode"     => "`shortcode`		VARCHAR(255) DEFAULT NULL",
                "parameter"     => "`parameter`	    TEXT DEFAULT NULL",             // 設定値（JSON）
            ),
        );

        $table_name = $dbPrefix . 'background_gimmick_setting_bubbly';
        $this->db_object[$table_name] = array(
            "table" => $table_name,
            "sql" => 'CREATE TABLE ' .$table_name. ' (%s %s) ' . $charset_collate . ';',
            "uniqueKey" => ",  PRIMARY KEY (`id`)",
            "columns" => array(
                "id"			=> "`id`			INT(11) NOT NULL",
                "image"         => "`image`			TEXT DEFAULT NULL",             // サンプル画像のURL
                "name"          => "`name`			VARCHAR(255) DEFAULT NULL",     // 表示される名称
                "description"   => "`description`	TEXT DEFAULT NULL",             // 内容説明
                "type"          => "`type`			VARCHAR(255) DEFAULT NULL",     // ギミックタイプ
                "kind"          => "`kind`			VARCHAR(255) DEFAULT NULL",     // 未使用
                "demo"          => "`demo`			VARCHAR(255) DEFAULT NULL",     // デモページURL
                "shortcode"     => "`shortcode`		VARCHAR(255) DEFAULT NULL",
                "parameter"     => "`parameter`	    TEXT DEFAULT NULL",             // 設定値（JSON）
            ),
        );

        $table_name = $dbPrefix . 'background_gimmick_setting_vanta';
        $this->db_object[$table_name] = array(
            "table" => $table_name,
            "sql" => 'CREATE TABLE ' .$table_name. ' (%s %s) ' . $charset_collate . ';',
            "uniqueKey" => ",  PRIMARY KEY (`id`)",
            "columns" => array(
                "id"			=> "`id`			INT(11) NOT NULL",
                "image"         => "`image`			TEXT DEFAULT NULL",             // サンプル画像のURL
                "name"          => "`name`			VARCHAR(255) DEFAULT NULL",     // 表示される名称
                "description"   => "`description`	TEXT DEFAULT NULL",             // 内容説明
                "type"          => "`type`			VARCHAR(255) DEFAULT NULL",     // ギミックタイプ
                "kind"          => "`kind`			VARCHAR(255) DEFAULT NULL",     // vanta種別
                "demo"          => "`demo`			VARCHAR(255) DEFAULT NULL",     // デモページURL
                "shortcode"     => "`shortcode`		VARCHAR(255) DEFAULT NULL",
                "parameter"     => "`parameter`	    TEXT DEFAULT NULL",             // 設定値（JSON）
            ),
        );

        $table_name = $dbPrefix . 'mouse_stalker_gimmick_setting';
        $this->db_object[$table_name] = array (
            "table" => $table_name,
            "sql" => 'CREATE TABLE ' . $table_name . ' ( %s %s ) ' . $charset_collate . ';',
            "uniqueKey" => ", PRIMARY KEY (`id`)",
            "columns" => array (
                "id"            => "`id`            INT(11) NOT NULL AUTO_INCREMENT",
                "description"   => "`description`   VARCHAR(255) DEFAULT NULL",
                "selected"      => "`selected`      INT(1) DEFAULT 0",  // 選択されたかどうか
                "parameters"    => "`parameters`    TEXT DEFAULT NULL", // 設定値の配列
            ),
        );
    }

    // 全データベースを作成する
    public function create() {

        global $wpdb;
        $createTables = array();
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // 現在のテーブルを全て取得して、テーブル作成するか判断する
        $rows = $wpdb->get_results( 'SHOW TABLES;', ARRAY_N );
        for( $i = 0; $i < count( $rows ); $i++ ) {

            array_push( $createTables, $rows[$i][0] );

        }

        foreach( (array) $this->db_object as $key => $value ) {

            if( array_search( $key, $createTables ) === false ) {   // テーブルが存在しない時

                $columns = implode( ',', array_values($value['columns'] ));
                $sql = sprintf( $value['sql'], $columns, $value['uniqueKey'] );
                dbDelta( $sql );    // テーブル作成

            } else {    // テーブルが存在する時

                $columns = $this->getUncreateColumnsInTable( $key, $value['columns'] ); // 存在しない列の有無を取得
                if( count($columns) > 0 ) { // テーブルは存在するが、存在しない列がある場合
                    for ( $i = 0; $i < count($columns); $i++ ) {
                        
                        $sql = sprintf( $value['sql'], $columns[$i], "" );
                        dbDelta($sql);  // テーブルに列追加
            
                    }
                }
            }
        }
    }

    public function createFirstBackgroundGimmickSetting() {

        $this->createFirstBackgroundGimmickSettingType('particles');
        $this->createFirstBackgroundGimmickSettingType('bubbly');
        $this->createFirstBackgroundGimmickSettingType('vanta');

    }

    public function createFirstBackgroundGimmickSettingType( $type ){

        global $wpdb;

        $backgroundGimmickSetting = array(
            'particles' => array(
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickParticle01.png',
                    'name'          => 'particles',
                    'description'   => 'particles.jsを利用した背景',
                    'type'          => 'particles',
                    'demo'          => 'https://vincentgarreau.com/particles.js/',
                    'shortcode'     => 'particles',
                ),
            ),
            'bubbly' => array(
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickBubbly01.png',
                    'name'          => 'bubbly',
                    'description'   => 'bubbly.jsを利用した背景',
                    'type'          => 'bubbly',
                    'demo'          => 'https://tipsy.github.io/bubbly-bg/',
                    'shortcode'     => 'bubbly',
                ),
            ),
            'vanta' => array(
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaBirds.png',
                    'name'          => 'vanta birds',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'birds',
                    'demo'          => 'https://www.vantajs.com/?effect=birds',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaFogs.png',
                    'name'          => 'vanta fogs',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'fogs',
                    'demo'          => 'https://www.vantajs.com/?effect=fog',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaWaves.png',
                    'name'          => 'vanta waves',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'waves',
                    'demo'          => 'https://www.vantajs.com/?effect=waves',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaClouds.png',
                    'name'          => 'vanta clouds',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'clouds',
                    'demo'          => 'https://www.vantajs.com/?effect=clouds',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaClouds2.png',
                    'name'          => 'vanta cluds2',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'clouds2',
                    'demo'          => 'https://www.vantajs.com/?effect=clouds2',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaGlobe.png',
                    'name'          => 'vanta globe',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'globe',
                    'demo'          => 'https://www.vantajs.com/?effect=globe',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaNet.png',
                    'name'          => 'vanta net',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'net',
                    'demo'          => 'https://www.vantajs.com/?effect=net',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaCells.png',
                    'name'          => 'vanta cells',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'cells',
                    'demo'          => 'https://www.vantajs.com/?effect=cells',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaTrunk.png',
                    'name'          => 'vanta trunk',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'trunk',
                    'demo'          => 'https://www.vantajs.com/?effect=trunk',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaTopology.png',
                    'name'          => 'vanta topology',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'topology',
                    'demo'          => 'https://www.vantajs.com/?effect=topology',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaDots.png',
                    'name'          => 'vanta dots',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'dots',
                    'demo'          => 'https://www.vantajs.com/?effect=dots',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaRings.png',
                    'name'          => 'vanta rings',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'rings',
                    'demo'          => 'https://www.vantajs.com/?effect=rings',
                    'shortcode'     => 'vanta',
                ),
                array(
                    'image'         => 'assets/adminMenu/backgroundGimmickVantaHalo.png',
                    'name'          => 'vanta halo',
                    'description'   => 'vanta.jsを利用した背景',
                    'type'          => 'vanta',
                    'kind'          => 'halo',
                    'demo'          => 'https://www.vantajs.com/?effect=halo',
                    'shortcode'     => 'vanta',
                ),
            ),
        );

        $table_name = $this->dbPrefix . 'background_gimmick_setting_' . $type;
        for( $i = 0; $i < count($backgroundGimmickSetting[$type]); $i++ ) {
            $dbKeys = array_keys( $backgroundGimmickSetting[$type][$i] );
            $dbValues = array_values( $backgroundGimmickSetting[$type][$i] );
            $dbKeysStr = implode( ',', $dbKeys );
            $dbValuesStr = '"' . implode( '","', $dbValues ) . '"';
            $dbDuplicates = array();
            for ( $j = 0; $j < count($dbKeys); $j++ ){
                $dbDuplicate = $dbKeys[$j] . ' = "' . $dbValues[$j] . '"';
                array_push( $dbDuplicates, $dbDuplicate );
            }
            $dbDuplicatesStr = implode( ',', $dbDuplicates);


            $sql = $wpdb->prepare('INSERT INTO %s (id,%s) VALUES (%d,%s) ON DUPLICATE KEY UPDATE %s;',
                        $table_name, $dbKeysStr, $i + 1, $dbValuesStr, $dbDuplicatesStr
                    );
            $sql = str_replace( "\\", "", str_replace( "'", "", $sql ));

            $wpdb->query( $sql );
        }
    }

    // 全データベースを削除する
    public function drop() {

    }

    // テーブルから既存の列を検索して、存在しない列だけ返す
    public function getUncreateColumnsInTable( $table_name, $columns ) {

        global $wpdb;
        $createdColumns = array();
        $rows = $wpdb->get_results('SHOW COLUMNS FROM `' .$table_name. '`;', ARRAY_N);

        for($i = 0; $i < count($rows); $i++){
				
            $key = $rows[$i][0];
            array_push($createdColumns, $key);
            if(isset($columns[$key])){	// 列が存在する場合は・・・
                
                unset($columns[$key]);	// 列を次々消していく
                
            }
            
        }

        return array_values($columns);

    }

    // DBから各ギミックに関するデータを取得
    public function getBackgroundSetting() {
    
        global $wpdb;

        $table_array = array( 'particles', 'bubbly', 'vanta' );

        $rtnRows = array();

        for ( $i = 0; $i < count( $table_array ); $i++ ) {
            
            $table_name = $this->dbPrefix . 'background_gimmick_setting_' . $table_array[$i];

            $sql = $wpdb->prepare('SELECT * FROM %s;', array( $table_name) );
            $sql = str_replace( "'", "", $sql );

            $rows = $wpdb->get_results( $sql, ARRAY_A );

            $rtnRows = array_merge( $rtnRows, $rows );
        }
        
        return $rtnRows;

    }

    // particles.jsの設定値保存
    public function updateDetailSettingParticles( $settingData , $type, $name ) {

        global $wpdb;

        $table_name = $this->dbPrefix . 'background_gimmick_setting_' . $type;

        $wpdb->update(
            $table_name,
            array(
                'parameter' => json_encode($settingData),
            ),
            array(
                'id' => $name,
            ),
            array(
                '%s',
            ),
            array(
                '%d',
            ),
        );

    }

    // particles.js用詳細設定値取得
    public function getDetailSettingParticles( $type, $id , $all = false ){

        global $wpdb;

        $table_name = $this->dbPrefix . 'background_gimmick_setting_' . $type;

        $sql = $wpdb->prepare(
            'SELECT * FROM `%s` WHERE `id` = %d;',
            array( $table_name, $id, )
        );
        $sql = str_replace( "'", "", $sql );
        $row = $wpdb->get_row( $sql, ARRAY_A );
        
        if($all){

            return $row;

        } else {

            return $row['parameter'];

        }
        
    }

    // マウスストーカーのDBがなかったら作る
    public function MsouseStalkerDataCreate() {

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        global $wpdb;

        $table_name = $this->dbPrefix . 'mouse_stalker_gimmick_setting';

        $rows = $wpdb->get_results( 'SHOW TABLES LIKE"' . $table_name . '";');
        if( count($rows) < 1 ) {
            $columns = implode( ',', $this->db_object[$table_name]['columns']);
            $sql = sprintf( $this->db_object[$table_name]['sql'], $columns, $this->db_object[$table_name]['uniqueKey']);
            dbDelta( $sql );
        }

        $dbObject = array (
            array(
                'description'   => '基本形',
                'parameters'    => 
                    json_encode(
                        array(
                            'size'          => 20,
                            'red'           => 0,
                            'green'         => 165,
                            'blue'          => 160,
                            'opacity'       => 0.5,
                            'transition'    => 0.2
                        )
                ),
            ),
            array(
                'description'   => 'ホバーで変化',
                'parameters'    =>
                    json_encode(
                        array(
                            'size'              => 20,
                            'red'               => 0,
                            'green'             => 165,
                            'blue'              => 160,
                            'opacity'           => 0.5,
                            'transition'        => 0.2,
                            'activeSize'        => 80,
                            'activeRed'         => 255,
                            'activeGreen'       => 90,
                            'activeBlue'        => 95,
                            'activeOpacity'     => 0.5,
                            'activeTransition'  => 0.5
                        ),
                    ),
            ),
            array(
                'description'   => 'ホバーで色反転',
                'parameters'    =>
                    json_encode(
                        array(
                            'size'              => 20,
                            'transition'        => 0.2,
                            'activeSize'        => 80,
                            'activeTransition'  => 0.5
                        ),
                    ),
            ),
            array(
                'description'   => 'カーソル変更',
                'parameters'    => 
                    json_encode(
                        array(
                            'cursorSize'        => 5,
                            'cursorRed'         => 0,
                            'cursorGreen'       => 0,
                            'cursorBlue'        => 0,
                            'cursorOpacity'     => 1,
                            'stalkerSize'       => 40,
                            'stalkerRed'        => 0,
                            'stalkerGreen'      => 0,
                            'stalkerBlue'       => 0,
                            'transition'        => 0.2,
                        )
                    ),
            ),
            array(
                'description'   => 'カーソル変更＋ホバーで色変化',
                'parameters'    => 
                    json_encode(
                        array(
                            'cursorSize'        => 5,
                            'cursorRed'         => 0,
                            'cursorGreen'       => 0,
                            'cursorBlue'        => 0,
                            'cursorOpacity'     => 1,
                            'stalkerSize'       => 40,
                            'stalkerRed'        => 0,
                            'stalkerGreen'      => 0,
                            'stalkerBlue'       => 0,
                            'transition'        => 0.2,
                            'activeSize'        => 40,
                            'activeRed'         => 255,
                            'activeGreen'       => 90,
                            'activeBlue'        => 95,
                            'activeTransition'  => 0.5
                        )
                    ),
            ),
        );

        $sql = 'SELECT * FROM ' . $table_name;
        $rows = $wpdb->get_results( $sql , ARRAY_N );

        for($i = count($rows); $i < count($dbObject); $i++){
            $sql = "INSERT INTO " . $table_name . "(description,parameters) VALUE ('" . $dbObject[$i]['description'] . "','" . $dbObject[$i]['parameters'] . "');";
            $wpdb->query( $sql );
        }
    }

    // マウスストーカーのデータを全て取得する
    public function getMsouseStalkerSetting(){
    
        global $wpdb;

        $table_name = $this->dbPrefix . 'mouse_stalker_gimmick_setting';
        $sql = $wpdb->prepare('SELECT * FROM %s;' , array( $table_name ));
        $sql = str_replace( "'", "", $sql );

        $rows = $wpdb->get_results( $sql, ARRAY_A );

        return $rows;

    }

    // マウスストーカー設定保存
    public function updateMousStalkerSetting( $id, $settingData ) {

        global $wpdb;

        $table_name = $this->dbPrefix . 'mouse_stalker_gimmick_setting';

        $wpdb->update(
            $table_name,
            array(
                'parameters' => json_encode( $settingData ),
                // 'parameters' => $settingData,
            ),
            array(
                'id' => $id,
            ),
            array(
                '%s',
            ),
            array(
                '%s',
            ),
        );

        $response['mouseStalkerGimmickData'] = $this->getMsouseStalkerSetting();
        $response['status'] = 'succeeded';
        $response['message'] = '保存しました';

        return $response;

    }

    // マウスストーカー選択設定
    public function mouseStalkerSelectSetting( $settingData ){

        global $wpdb;

        $table_name = $this->dbPrefix . 'mouse_stalker_gimmick_setting';

        foreach( $settingData as $id => $selected ){

            $wpdb->update(
                $table_name,
                array(
                    'selected' => $selected,
                ),
                array(
                    'id' => $id + 1,
                ),
                array(
                    '%d',
                ),
                array(
                    '%d',
                ),
            );
        }

        $response['mouseStalkerGimmickData'] = $this->getMsouseStalkerSetting();
        $response['status'] = 'succeeded';

        return $response;

    }

    // マウスストーカー設定がオンになっているレコードを返す
    public function getMsouseStalkerON() {

        $response = -1;

        global $wpdb;

        $table_name = $this->dbPrefix . 'mouse_stalker_gimmick_setting';

        $sql = 'SELECT * FROM ' . $table_name . ' WHERE `selected` = 1;';

        $row = $wpdb->get_row( $sql, ARRAY_A );

        if( $row != null ){
            $response = $row;
        }

        return $response;

    }

    // データベースを全て削除する
    public function allDrop() {

        global $wpdb;

        $table_list = $this->db_object;

        foreach ((array) $table_list as $key => $value) {
				
            $wpdb->query("DROP TABLE `" .$key. "`;");
            
        }

    }

}
    