( function( blocks, element ){
    let  el = element.createElement;

    let blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px'
    };

    // ブロックを登録
    blocks.registerBlockType(
        // namespaceを含むブロックの名前 namespace/block-name
        'tantive-gimmick-pack/test',
        {
            title: 'My First Block Sample',
            icon: 'smiley',
            category: 'layout',
            edit: function(props) {
                return el(
                    'p',
                    {className: props.className},
                    'Hello World, sample 02 (edit/エディタ用）.'
                );
            },
            save: function() {
                return el(
                    'p',
                    {},
                    'Hello World, sample 02 (save/フロントエンド用)).'
                )
            },
        }
    );

})(
    window.wp.blocks,
    window.wp.element
);