(function(blocks, element, components) {
    let el = element.createElement;

    let textControl = components.TextControl;

    blocks.registerBlockType(
        'tantive-gimmick-pack/textcontrol',
        {
            title: 'tantive text TextControl',
            icon: 'smiley',
            category: 'layout',
            example: {},
            attributes: {
                exampleText: {
                    type: 'string',
                    default: '',
                }
            },
            edit: function(props){
                function onChangeContent(newText){
                    props.setAttributes({exampleText: newText});    // example Textの値を更新
                }
                return el(
                    textControl,
                    {
                        onChange: onChangeContent,  // onChangeハンドラ(コールバック関数)の指定
                        value: props.attributes.exampleText
                    }
                );
            },
            save: function(props){
                return el(
                    'div',
                    {},
                    props.attributes.exampleText,
                );
            },
        }
    );

})(
    window.wp.blocks,
    window.wp.element,
    window.wp.components,
);