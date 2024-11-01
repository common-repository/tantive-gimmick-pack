(function(blocks, element, blockEditor) {
    let el = element.createElement;

    let richText = blockEditor.RichText;

    blocks.registerBlockType(
        'tantive-gimmick-pack/richtext',
        {
            title: 'tantive rich text',
            icon: 'smiley',
            category: 'layout',
            example: {},
            attributes: {
                myRichText: {
                    type: 'string',
                    default: '',
                }
            },
            edit: function(props){
                function onChangeContent(newText){
                    props.setAttributes({myRichText: newText});    // myRich Textの値を更新
                }
                return el(
                    richText,
                    {
                        onChange: onChangeContent,  // onChangeハンドラ(コールバック関数)の指定
                        value: props.attributes.myRichText,
                    }
                );
            },
            save: function(props){
                return el(
                    richText.Content,
                    {
                        value: props.attributes.myRichText,
                    }
                );
            },
        }
    );

})(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor,
);