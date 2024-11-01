window.addEventListener( 'load', function(){

    object = this;

    elmBackgroundSettingPanel = document.getElementById('backgroundSettingPanel');

    const idPrefix = 'tantiveGimmickPack' + 'BBS';

    let elmWrapper = document.createElement('div'); // 説明のブロックを並べる親のdiv
    elmBackgroundSettingPanel.appendChild(elmWrapper);
    elmWrapper.id = idPrefix + 'Wrapper';

    // 個々の説明ボックスを順に作ってWrapperに追加(appendChildする)
    localizeData['backgroundGimmickData'].forEach(backgroundGimmickData => {
        let elmBox = document.createElement('div');
        elmBox.classList.add(idPrefix + 'Box');
        {   // イメージ画像
            let elmImg = document.createElement('img');
            elmImg.src = localizeData['plugin_dir_url'] + backgroundGimmickData['image'];
            elmImg.classList.add(idPrefix + 'Img');
            elmBox.appendChild(elmImg);
        }
        {   // 名前
            let elmDiv = document.createElement('div');
            elmDiv.textContent = backgroundGimmickData['name'];
            elmBox.appendChild(elmDiv);
        }
        {   // 説明
            let elmDiv = document.createElement('div');
            elmDiv.textContent = backgroundGimmickData['description'];
            elmBox.appendChild(elmDiv);
        }
        {   // デモページ
            if(backgroundGimmickData['demo'] != null) {
                let elmA = document.createElement('a');
                elmA.href = backgroundGimmickData['demo'];
                elmA.target = '_blank';
                let elmDiv = document.createElement('div');
                let elmSpan = document.createElement('span');
                elmSpan.textContent = 'デモページ';
                elmA.appendChild(elmSpan);
                elmDiv.appendChild(elmA);
                elmBox.appendChild(elmDiv);
            }
        }
        {   // ショートコード
            let elmSpan = document.createElement('span');
            elmSpan.textContent = 'ショートコード；';
            elmBox.appendChild(elmSpan);
            let elmInput = document.createElement('input');
            elmInput.type = 'text';
            elmInput.value = '[' + backgroundGimmickData['shortcode'] + ' id=' + backgroundGimmickData['id'] + ']';
            elmInput.classList.add(idPrefix + 'Input');
            elmBox.appendChild(elmInput);
        }
        elmWrapper.appendChild(elmBox);

        {   // 設定ボタン
            let elmDiv = document.createElement('div');
            elmDiv.textContent = '設定';
            elmDiv.classList.add(idPrefix + 'SettingButton');
            elmDiv.dataset.name = backgroundGimmickData['id'];
            elmDiv.dataset.type = backgroundGimmickData['type'];
            elmDiv.dataset.kind = backgroundGimmickData['kind'];
            elmDiv.onclick = function (obj) {   // 「設定ボタンが押された時
                let elm = document.getElementsByClassName('backgroundSettingModalPanel');
                elm[0].classList.remove('hiddenPanel');
                object.createDetailSettingArea(obj.target.dataset.type, obj.target.dataset.kind, obj.target.dataset.name, elm[0]);
            }
            elmBox.appendChild(elmDiv);
        }
    });

    this.createDetailSettingArea = function(type, kind, name, elmParentDiv) {

        object = this;

        let post = {
            'mode': 'getDetailSettingParticles',
            'secret': localizeData['secret'],
            'action': localizeData['action'],
            'type': type,
            'name': name,
        }
        new ajax(post, localizeData['ajaxUrl'], function(responseText){
            localizeData['backgroundGimmickData'][0]['parameter'] = responseText;
            switch(type) {
                case 'particles':   // particles.js
                case 'bubbly':      // bubbly.js
                case 'vanta':       // vanta.js
                    elmDiv = object.createDetailSettingAreaParticles(type, kind, name);
                    elmParentDiv.appendChild(elmDiv);
                    break;
            }

        });

    }

    this.createDetailSettingAreaParticles = function(type, kind, name) {

        object = this;

        paramArray = {
            'particles': [
                [
                    {
                        'parentName': {'id': 'accordion1-1', 'symbol' : 'particles', 'title': 'particles'},
                        'value': [
                            {
                                'parentName': {'id': 'accordion1-1-1', 'symbol': 'number', 'title': 'number'},
                                'value': [
                                    {
                                        'number': {'symbol': 'ParticlesNumberValue', 'title': 'value', 'type': 'range', 'min': 1, 'max':600, 'default': '80'},
                                        'densityEnable': {'symbol': 'ParticlesNumberDensityEnable', 'title': 'densityEnable', 'type': 'checkbox', 'default': 'checked'},
                                        'densityValueArea' : {'symbol': 'ParticlesNumberDensityValueArea', 'title': 'densityValueArea', 'type': 'number', 'min': 1, 'max': 10000, 'default': '800'},
                                    }
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-1-2', 'symbol': 'color', 'title': 'color'},
                                'value': [
                                    {'colorValue': {'symbol': 'ParticlesColorValue', 'title': 'colorValue', 'type': 'color', 'default': '#000000'}}
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-1-3', 'symbol': 'shape', 'title': 'shape'},
                                'value': [
                                    {
                                        'parentName': {'id': 'accordion1-1-3-1', 'symbol': 'stroke', 'title': 'stroke'},
                                        'value': [
                                            {'strokeWidth': {'symbol': 'ParticlesShapeStrokeStrokeWidth', 'title': 'strokeWidth', 'type': 'range', 'min': 0, 'max': 20, 'default': '0'}},
                                            {'strokeColor': {'symbol': 'ParticlesShapeStrokeStrokeColor','title': 'strokeColor', 'type': 'color','default': '#000000'}},
                                        ]
                                    },
                                    {
                                        'parentName': {'id': 'accordion1-1-3-2', 'symbol': 'polygon', 'title': 'polygon'},
                                        'value': [
                                            {'poligonNlbSides': {'symbol': 'ParticlesShapePolygonPolygonNlbSides','title': 'poligonNlbSides', 'type': 'range', 'min': 3, 'max': 12,  'default': '5'}}
                                        ]
                                    },
                                    {
                                        'parentName': {'id': 'accordion1-1-3-3', 'symbol': 'image', 'title': 'image'},
                                        'value': [
                                            {'imageSrc': {'symbol': 'ParticlesShapeImageImageSrc','title': 'imageSrc', 'type': 'text', 'default': 'img/github.svg',}},
                                            {'imageWidth': {'symbol': 'ParticlesShapeImageImageWidth','title': 'imageWidth', 'type': 'number', 'default': '100',}},
                                            {'imageHeight': {'symbol': 'ParticlesShapeImageImageHeight','title': 'imageHeight', 'type': 'number','default': '100',}}
                                        ]
                                    },
                                    {
                                        'type': {
                                            'symbol': 'ParticlesShapeType',
                                            'title': 'type', 
                                            'type': 'select',
                                            'option': [
                                                {'value': 'circle', 'caption': 'circle'},
                                                {'value': 'edge', 'caption': 'edge'},
                                                {'value': 'triangle', 'caption': 'triangle'},
                                                {'value': 'polygon', 'caption': 'polygon'},
                                                {'value': 'star', 'caption': 'star'},
                                                {'value': 'image', 'caption': 'image'},
                                            ],
                                            'default': 'circle',
                                        }
                                    }
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-1-4', 'symbol': 'size', 'title': 'size'},
                                'value': [
                                    {
                                        'parentName': {'id': 'accordion1-1-4-1', 'symbol': 'anim', 'title': 'anim'},
                                        'value': [
                                            {'animEnable': {'symbol': 'ParticlesSizeAnimAnimEnable','title': 'animEnable', 'type': 'checkbox', 'default': 'nochecked',}},
                                            {'animSpeed': {'symbol': 'ParticlesSizeAnimAnimSpeed','title': 'animSpeed', 'type': 'range', 'min': 0, 'max': 300, 'default': '40', }},
                                            {'animSizeMin': {'symbol': 'ParticlesSizeAnimAnimSizeMin','title': 'animSizeMin', 'type': 'range', 'min':0, 'max': 100, 'default': '0.1', }},
                                            {'animSync': {'symbol': 'ParticlesSizeAnimAnimSync','title': 'animSync', 'type': 'checkbox' , 'default': 'nochecked', }}
                                        ]
                                    },
                                    {'animValue': {'symbol': 'ParticlesSizeValue','title': 'animValue', 'type': 'range', 'min': 0, 'max': 500, 'default': '3', }},
                                    {'random': {'symbol': 'ParticlesSizeRandom','title': 'random', 'type': 'checkbox', 'default': 'checked', }}
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-1-5', 'symbol': 'opacity', 'title': 'opacity'},
                                'value': [
                                    {
                                        'parentName': {'id': 'accordion1-1-5-1', 'symbol': 'anim', 'title': 'anim'},
                                        'value': [
                                            {'animEnable': {'symbol': 'ParticlesOpacityAnimAnimEnable', 'title': 'animEnable', 'type': 'checkbox', 'default': 'nochecked', }},
                                            {'animSpeed': {'symbol': 'ParticlesOpacityAnimAnimSpeed', 'title': 'animSpeed', 'type': 'range', 'min': 0, 'max': 10, 'default': '1', }},
                                            {'animOpacityMin': {'symbol': 'ParticlesOpacityAnimAnimOpacityMin', 'title': 'animOpacityMin', 'type': 'range', 'min': 0, 'max': 1, 'default': '0.1', }},
                                            {'animSync': {'symbol': 'ParticlesOpacityAnimAnimSync', 'title': 'animSync', 'type': 'checkbox', 'default': 'nochecked', }}
                                        ]
                                    },
                                    {
                                        'animValue': {'symbol': 'ParticlesOpacityValue', 'title': 'animValue', 'type': 'text', 'default': '0.5', },
                                    },
                                    {
                                        'random': {'symbol': 'ParticlesOpacityRandom', 'title': 'random', 'type': 'checkbox', 'default': 'nochecked',},
                                    }
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-1-6',' symbol': 'line_linked', 'title': 'line_linked'},
                                'value': [
                                    {'enableAuto': {'symbol': 'ParticlesLineLinkedEnableAuto', 'title': 'enableAuto', 'type': 'checkbox', 'default': 'checked', }},
                                    {'distance': {'symbol': 'ParticlesLineLinkedDistance','title': 'distance', 'type': 'range', 'min': 0, 'max': 2000, 'default': '150', }},
                                    {'color': {'symbol': 'ParticlesLineLinkedColor','title': 'color', 'type': 'color', 'default': '#000000', }},
                                    {'opacity': {'symbol': 'ParticlesLineLinkedOpacity', 'title': 'opacity', 'type': 'range', 'min': 0, 'max': 1, 'default': '0.4', }},
                                    {'width': {'symbol': 'ParticlesLineLinkedWidth', 'title': 'width', 'type': 'range', 'min': 0, 'max': 20, 'default': '1', }}
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-1-7', 'symbol': 'move', 'title': 'move'},
                                'value': [
                                    {'enable': {'symbol': 'ParticlesMoveEnable', 'title': 'enable', 'type': 'checkbox', 'default': 'checked', }},
                                    {
                                        'direction': {
                                            'symbol': 'ParticlesMoveDirection', 
                                            'title': 'direction', 
                                            'type': 'select', 
                                            'option': [
                                                {'value': 'none', 'caption': 'none'},
                                                {'value': 'top', 'caption': 'top'},
                                                {'value': 'top', 'caption': 'top-right'},
                                                {'value': 'bottom-right', 'caption': 'bottom-right'},
                                                {'value': 'bottom', 'caption': 'bottom'},
                                                {'value': 'bottom-left', 'caption': 'bottom-left'},
                                                {'value': 'left', 'caption': 'left'},
                                                {'value': 'top-left', 'caption': 'top-left'},
                                            ],
                                            'default': 'none',
                                        }
                                    },
                                    {'random': {'symbol': 'ParticlesMoveRandom', 'title': 'random', 'type': 'checkbox', 'default': 'nochecked', }},
                                    {'straight': {'symbol': 'ParticlesMoveStraight', 'title': 'straight', 'type': 'checkbox', 'default': 'nochecked', }},
                                    {'speed': {'symbol': 'ParticlesMoveSpeed', 'title': 'speed', 'type': 'range', 'min': 0, 'max': 200, 'default': '6', }},
                                    {
                                        'outMode': {
                                            'symbol': 'ParticlesMoveoutMode', 
                                            'title': 'outMode', 
                                            'type': 'select', 
                                            'option': [
                                                {'value': 'out', 'caption': 'out'}, 
                                                {'value': 'bounce', 'caption': 'bounce'}
                                            ],
                                            'default': 'out',
                                        }
                                    },
                                    {'attractEnable': {'symbol': 'ParticlesMoveAttractEnable', 'title': 'attractEnable', 'type': 'checkbox', 'default': 'checked', }},
                                    {'attractRotateX': {'symbol': 'ParticlesMoveAttractRotateX', 'title': 'attractRottateX', 'type': 'range', 'min': 0, 'max': 10000, 'default': '600', }},
                                    {'attractRotateY': {'symbol': 'ParticlesMoveAttractRotateY', 'title': 'attractRotateY', 'type': 'range', 'min': 0, 'max': 10000, 'default': '1200', }}
                                ]
                            },
                        ]
                    },
                    {
                        'parentName': {'id': 'accordion1-2', 'symbol': 'interactivity', 'title': 'interactivity'},
                        'value': [
                            {
                                'parentName': {'id': 'accordion1-2-1', 'symbol': 'onhover', 'title': 'onhover'},
                                'value': [
                                    {'enable': {'symbol': 'InteractivityOnhoverEnable', 'title': 'enable', 'type': 'checkbox', 'default': 'checked', }},
                                    {
                                        'mode': {
                                            'symbol': 'InteractivityOnhoverMode', 
                                            'title': 'mode', 
                                            'type': 'select',
                                            'option': [
                                                {'value': 'grab', 'caption': 'grab'},
                                                {'value': 'bubble', 'caption': 'bubble'},
                                                {'value': 'repulse', 'caption': 'repulse'},
                                            ],
                                            'default': 'repulse',
                                        }
                                    }
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-2-2', 'symbol': 'onclick', 'title': 'onclick'},
                                'value': [
                                    {'enable': {'symbol': 'InteractivityOnclickEnable', 'title': 'enable', 'type': 'checkbox' , 'default': 'checked', }},
                                    {
                                        'mode': {
                                            'symbol': 'InteractivityOnclickMode', 
                                            'title': 'mode', 
                                            'type': 'select',
                                            'option': [
                                                {'value': 'push', 'caption': 'push'},
                                                {'value': 'remove', 'caption': 'remove'},
                                                {'value': 'bubble', 'caption': 'bubble'},
                                                {'value': 'repulse', 'caption': 'repulse'},
                                            ],
                                            'default': 'push',
                                        }
                                    },
                                ]
                            },
                            {
                                'parentName': {'id': 'accordion1-2-3', 'symbol': 'modes', 'title': 'modes'},
                                'value': [
                                    {
                                        'parentName': {'id': 'accordion1-2-3-1', 'symbol': 'grab', 'title': 'grab'},
                                        'value': [
                                            {
                                                'parentName': {'id': 'accordion1-2-3-1-1', 'symbol': 'line_linked', 'title': 'line_linked'},
                                                'value': [
                                                    {'opacity': {'symbol': 'InteractivityModesGrabLineLinkedOpacity', 'title': 'opacity', 'type': 'range', 'min': 0, 'max': 1, 'default': '1', }}
                                                ]
                                            },
                                            {'distance': {'symbol': 'InteractivityModesGrabDistance', 'title': 'distance', 'type': 'range', 'min': 0, 'max': 1500, 'default': '400', }}
                                        ]
                                    },
                                    {
                                        'parentName': {'id': 'accordion1-2-3-2', 'symbol': 'bubble', 'title': 'bubble'},
                                        'value': [
                                            {'distance': {'symbol': 'InteractivityModesBubbleDistance', 'title': 'distance', 'type': 'range', 'min': 0, 'max': 1500, 'default': '400', }},
                                            {'size': {'symbol': 'InteractivityModesBubbleSize', 'title': 'size', 'type': 'range', 'min':0, 'max': 500, 'default': '40', }},
                                            {'opacity': {'symbol': 'InteractivityModesBubbleOpacity', 'title': 'opacity', 'type': 'range', 'min':0, 'max':1, 'default': '1', }},
                                            {'duration(sec)': {'symbol': 'InteractivityModesBubbleDuration', 'title': 'duration(sec)', 'type': 'range', 'min':0, 'max': 10, 'default': '2', }}
                                        ]
                                    },
                                    {
                                        'parentName': {'id': 'accordion1-2-3-3', 'symbol': 'repulse', 'title': 'repulse'},
                                        'value': [
                                            {'distance': {'symbol': 'InteractivityModesRepulseDistance', 'title': 'distance', 'type': 'range', 'min': 0, 'max': 1000, 'default': '200', }}
                                        ]
                                    }
                                ]
                            },
                            {
                                'detect_on': {
                                    'symbol': 'InteractivityDetectOn', 
                                    'title': 'detect_on', 
                                    'type':'select',
                                    'option': [
                                        {'value': 'window', 'caption': 'window'},
                                        {'value': 'canvas', 'caption': 'canvas'},
                                    ],
                                    'default': 'window',
                                }
                            },
                        ]
                    },
                    {
                        'parentName': {'id': 'accordion1-3', 'symbol': 'page background', 'title': 'page background'},
                        'value': [
                            {
                                'background-color': {'symbol': 'pageBackgroundBackgroundColor', 'title': 'background-color', 'type': 'text', 'default': '#b61924'},
                                'background-image url': {'symbol': 'pageBackgroundBackgroundImageUrl', 'title': 'background-image url', 'type': 'text', 'default': ''},
                                'background-size': {'symbol': 'pageBackgroundBackgroundSize', 'title': 'background-size', 'type': 'text', 'default': 'cover', },
                                'background-position': {'symbol': 'pageBackgroundBackgroundPosition', 'title': 'background-position', 'type': 'text', 'default': '50% 50%', },
                                'background-repeat': {'symbol': 'pageBackgroundBackgroundRepeat', 'title': 'background-repeat', 'type': 'text', 'default': 'no-repeat', },
                                'hideCard': {'symbol': 'pageBackgroundBackgroundHardCard', 'title': 'hide card', 'type': 'checkbox', 'default': 'nochecked', },
                            },
                        ]
                    },
                    {
                        'retinaDetect': {'symbol': 'retinaDetect', 'id': 'accordion1-4', 'title': 'retina_detect', 'type': 'checkbox', 'default': 'checked', }
                    }
                ],
            ],
            'bubbly': [
                [
                    {
                        'parentName': {'id': 'accordion1-1', 'symbol' : 'bubbly', 'title': 'bubbly'},
                        'value': [
                            {
                                'animate' : {
                                    'symbol': 'BubblyAnimate', 
                                    'title': 'animate', 
                                    'type': 'select', 
                                    'option': [
                                        {'value': 'true', 'caption': 'true'},
                                        {'value': 'false', 'caption': 'false'},
                                    ],
                                    'default': 'true',
                                },
                                'blur': {'symbol': 'BubblyBlur', 'title': 'blur', 'type': 'range', 'min': 1, 'max': 10, 'default': 4},
                                'bubbleFunc': {'symbol': 'BubblyBubbleFunc', 'title': 'bubbleFunc', 'type': 'text', 'default': ''},
                                'bubbles': {'symbol': 'BubblyBubbles', 'title': 'bubbles', 'type': 'text', 'default': ''},
                                'canvas': {'symbol': 'BubblyCanvas', 'title': 'canvas', 'type': 'text', 'default': 'body'},
                                'colorStart': {'symbol': 'BubblyColorStart', 'title': 'colorStart', 'type': 'color', 'default': '#A5E1E9'},
                                'colorStop': {'symbol': 'BubblyColorStop', 'title': 'colorStop', 'type': 'color', 'default': '#51C8A4'},
                                'compose': {
                                    'symbol': 'BubblyCompose', 
                                    'title': 'compose', 
                                    'type': 'select', 
                                    'option': [
                                        {'value': 'source-atop', 'caption': 'source-atop'},
                                        {'value': 'source-in', 'caption': 'source-in'},
                                        {'value': 'source-out', 'caption': 'source-out'},
                                        {'value': 'source-over', 'caption': 'source-over'},
                                        {'value': 'destination-atop', 'caption': 'destination-atop'},
                                        {'value': 'destination-in', 'caption': 'destination-in'},
                                        {'value': 'destination-out', 'caption': 'destination-out'},
                                        {'value': 'destination-over', 'caption': 'destination-over'},
                                        {'value': 'lighter', 'caption': 'lighter'},
                                        {'value': 'copy', 'caption': 'copy'},
                                        {'value': 'xor', 'caption': 'xor'},
                                    ],
                                    'default': 'lighter'
                                },
                                'shadowColor': {'symbol': 'BubblyShadowColor', 'title': 'shadowColor', 'type': 'color', 'default': '#ffffff'},
                                'angleFunc': {'symbol': 'BubblyAngleFunc', 'title': 'angleFunc', 'type': 'text', 'default': 'Math.random() * Math.PI * 2'},
                                'velocityFunc': {'symbol': 'BubblyVelocityFunc', 'title': 'velocityFunc', 'type': 'text', 'default': '0.1 + Math.random() * 0.5'},
                                'radiusFunc': {'symbol': 'BubblyRadiusFunc', 'title': 'radiusFunc', 'type': 'text', 'default': '4 + Math.random() * width / 25'},
                            }
                        ]
                    }
                ],
            ],
            'vantabirds': [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaBirds', 'title': 'birds'},
                        'value': [
                            {
                                'backgroundColor': {'symbol': 'vantaBirdsBackgroundColor', 'title': 'background-color', 'type': 'color', 'default': '#ffffff'},
                                'backgroundAlpha': {'symbol': 'vantaBirdsBackgroundAlpha', 'title': 'background-alpha', 'type': 'range', 'min': 0, 'max': '1',  'default': 1},
                                'color1': {'symbol': 'vantaBirdsColor1', 'title': 'color1', 'type': 'color', 'default': '#ff0000'},
                                'color2': {'symbol': 'vantaBirdsColor2', 'title': 'color2', 'type': 'color', 'default': '#d1ff'},
                                'colorMode': {
                                    'symbol': 'vantaBirdsColorMode', 
                                    'title': 'colorMode', 
                                    'type': 'select', 
                                    'option': [
                                        {'value': 'leap', 'caption': 'leap'},
                                        {'value': 'variance', 'caption': 'variance'},
                                        {'value': 'leapGradient', 'caption': 'leapGradient'},
                                        {'value': 'varianceGradient', 'caption': 'varianceGradient'}
                                    ],
                                    'default': 'leap'
                                },
                                'quantity': {'symbol': 'vantaBirdsQuantity', 'title': 'quantity', 'type': 'range', 'min': 1, 'max': 5, 'default': 5},
                                'birdSize': {'symbol': 'vantaBirdsBirdSize', 'title': 'birdSize', 'type': 'range', 'min': 0.5, 'max': 4, 'default': 1, 'numberStep': 0.5},
                                'wingSpan': {'symbol': 'vantaBirdsWingSpan', 'title': 'wingSpan', 'type': 'range', 'min': 10, 'max': 40, 'default': 30},
                                'speedLimit': {'symbol': 'vantaBirdSpeedLimit', 'title': 'speedLimit', 'type': 'range', 'min': 1, 'max': 10, 'default': 5},
                                'separation': {'symbol': 'vantaBirdSeparation', 'title': 'separation', 'type': 'range', 'min': 1, 'max': 100, 'default': 20},
                                'alignment': {'symbol': 'vantaBirdAlignment', 'title': 'alignment', 'type': 'range', 'min': 1, 'max': 100, 'default': 20},
                                'cohesion': {'symbol': 'vantaBirdCohesion', 'title': 'cohesion', 'type': 'range', 'min': 1, 'max': 100, 'default': 20},
                            }
                        ]
                    },
                ],
            ],
            'vantafogs' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaFogs', 'title': 'fogs'},
                        'value': [
                            {
                                'highlightColor': {'symbol': 'vantaFogsHighlightColor', 'title': 'highlightColor', 'type': 'color', 'default': '#ffc300'},
                                'midtoneColor': {'symbol': 'vantaFogsMidtoneColor', 'title': 'midtoneColor', 'type': 'color', 'default': '#ff1f00'},
                                'lowlightColor': {'symbol': 'vantaFogsLowlightColor', 'title': 'lowlightColor', 'type': 'color', 'default': '#2d00ff'},
                                'baseColor': {'symbol': 'vantaFogsBaseColor', 'title': 'baseColor', 'type': 'color', 'default': '#ffebeb'},
                                'blurFactor': {'symbol': 'vantaFogsBlurFactor', 'title': 'blurFactor', 'type': 'range', 'min': 0.1, 'max': 0.9, 'default': 0.6},
                                'zoom': {'symbol': 'vantaFogsZoom', 'title': 'zoom', 'type': 'range', 'min': 0.1, 'max': 3, 'default': 1},
                                'speed': {'symbol': 'vantaFogsSpeed', 'title': 'speed', 'type': 'range', 'min': 0, 'max': 5, 'default': 1},
                            }
                        ]
                    }
                ],
            ],
            'vantawaves' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaFogs', 'title': 'waves'},
                        'value': [
                            {
                                'color': {'symbol': 'vantaWavesColor', 'title': 'color', 'type': 'color', 'default': '#005588'},
                                'shininess': {'symbol': 'vantaFogsShininess', 'title': 'shininess', 'type': 'range', 'min': 0, 'max': 150, 'default': 30},
                                'waveHeight': {'symbol': 'vantaFogsWaveHeight', 'title': 'waveHeight', 'type': 'range', 'min': 0, 'max': 40, 'default': 15},
                                'waveSpeed': {'symbol': 'vantaFogsWaveSpeed', 'title': 'waveSpeed', 'type': 'range', 'min': 0, 'max': 2, 'default': 1},
                                'zoom': {'symbol': 'vantaFogsZoom', 'title': 'zoom', 'type': 'range', 'min': 0.7, 'max': 1.8, 'default': 1},
                            }
                        ]
                    }
                ]
            ],
            'vantaclouds' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaClouds', 'title': 'clouds'},
                        'value': [
                            {
                                'backgroundColor': {'symbol': 'vantaCloudsBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#ffffff'},
                                'skyColor': {'symbol': 'vantaCloudsSkyColor', 'title': 'skyColor', 'type': 'color', 'default': '#68b8d7'},
                                'cloudColor': {'symbol': 'vantaCloudsCloudColor', 'title': 'cloudColor', 'type': 'color', 'default': '#adc1de'},
                                'cloudShadowColor': {'symbol': 'vantaCloudsCloudShadowColor', 'title': 'cloudShadowColor', 'type': 'color', 'default': '#183550'},
                                'sunColor': {'symbol': 'vantaCloudsSunColor', 'title': 'sunColor', 'type': 'color', 'default': '#ff9911'},
                                'sunGlareColor': {'symbol': 'vantaCloudsSunGlareColor', 'title': 'sunGlareColor', 'type': 'color', 'default': '#ff6633'},
                                'sunlightColor': {'symbol': 'vantaCloudsSunlightColor', 'title': 'sunlightColor', 'type': 'color', 'default': '#ff9933'},
                                'speed': {'symbol': 'vantaCloudsSpeed', 'title': 'speed', 'type': 'range', 'min': 0, 'max': 3, 'default': 1},
                            }
                        ]
                    }
                ]
            ],
            'vantaclouds2' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaClouds2', 'title': 'clouds2'},
                        'value' :[
                            {
                                'backgroundColor': {'symbol': 'vantaClouds2BackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#000000'},
                                'skyColor': {'symbol': 'vantaClouds2SkyColor', 'title': 'skyColor', 'type': 'color', 'default': '#5ca6ca'},
                                'cloudColor': {'symbol': 'vantaClouds2CloudColor', 'title': 'cloudColor', 'type': 'color', 'default': '#334d80'},
                                'lightColor': {'symbol': 'vantaClouds2LightColor', 'title': 'lightColor', 'type': 'color', 'default': '#ffffff'},
                                'speed': {'symbol': 'vantaClouds2Speed', 'title': 'speed', 'type': 'range', 'min': 0, 'max': 5, 'default': 1},
                            }
                        ]
                    }
                ]
            ],
            'vantaglobe' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaGlobe', 'title': 'globe'},
                        'value' : [
                            {
                                'backgroundColor': {'symbol': 'vantaGlobeBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#ffffff'},
                                'color': {'symbol': 'vantaGlobeColor', 'title': 'color', 'type': 'color', 'default': '#ff3f81'},
                                'color2': {'symbol': 'vantaGlobeColor2', 'title': 'color2', 'type': 'color', 'default': '#000000'},
                                'size': {'symbol': 'vantaGlobeSize', 'title': 'size', 'type': 'range', 'min': 0.5, 'max': 2, 'default': 1},
                            }
                        ]
                    }
                ]
            ],
            'vantanet' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaNet', 'title': 'net'},
                        'value': [
                            {
                                'color': {'symbol': 'vantaNetColor', 'title': 'color', 'type': 'color', 'default': '#ff3f81'},
                                'backgroundColor': {'symbol': 'vantaNetBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#23153c'},
                                'points': {'symbol': 'vantaNetPoints', 'title': 'points', 'type': 'range', 'min': 1, 'max': 20, 'default': 10},
                                'maxDistance': {'symbol': 'vantaNetMaxDistance', 'title': 'maxDistance', 'type': 'range', 'min': 10, 'max': 40, 'default': 20},
                                'spacing': {'symbol': 'vantaNetSpacing', 'title': 'spacing', 'type': 'range', 'min': 10, 'max': 20, 'default': 15},
                                'showDots': {'symbol': 'vantaNetShowDots', 'id': 'vantaNetShowDots', 'title': 'showDots', 'type': 'checkbox', 'default': 'checked'},
                            }
                        ]
                    }
                ]
            ],
            'vantacells' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaCells', 'title': 'cells'},
                        'value': [
                            {
                                'color1': {'symbol': 'vantaCellsColor1', 'title': 'color1', 'type': 'color', 'default': '#008c8c'},
                                'color2': {'symbol': 'vantaCellsColor2', 'title': 'color2', 'type': 'color', 'default': '#f2e735'},
                                'size': {'symbol': 'vantaCellSize', 'title': 'size', 'type': 'range', 'min': 0.2, 'max': 5, 'default': 1.5},
                                'speed': {'symbol': 'vantaCellSpeed', 'title': 'speed', 'type': 'range', 'min': 0, 'max': 5, 'default': 1},
                            }
                        ]
                    }
                ]
            ],
            'vantatrunk' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaTrunk', 'title': 'trunk'},
                        'value': [
                            {
                                'backgroundColor': {'symbol': 'vantaTrunkBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#222426'},
                                'color': {'symbol': 'vantaTrunkColor', 'title': 'color', 'type': 'color', 'default': '#98465f'},
                                'spacing': {'symbol': 'vantaTrunkSpacing', 'title': 'spacing', 'type': 'range', 'min': 0, 'max': 10, 'default': 0},
                                'chaos': {'symbol': 'vantaTrunkChaos', 'title': 'chaos', 'type': 'range', 'min': 0, 'max': 10, 'default': 1},
                            }
                        ]
                    }
                ]
            ],
            'vantatopology': [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaTopology', 'title': 'topology'},
                        'value': [
                            {
                                'backgroundColor': {'symbol': 'vantaTopologyBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#002222'},
                                'color': {'symbol': 'vantaTopologyColor', 'title': 'color', 'type': 'color', 'default': '#89964e'},
                            }
                        ]
                    }
                ]
            ],
            'vantadots' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaDots', 'title': 'dots'},
                        'value': [
                            {
                                'backgroundColor': {'symbol': 'vantaDotsBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#222222'},
                                'color': {'symbol': 'vantaDotsColor', 'title': 'color', 'type': 'color', 'default': '#ff8820'},
                                'color2': {'symbol': 'vantaDotsColor2', 'title': 'color2', 'type': 'color', 'default': '#ff8820'},
                                'size': {'symbol': 'vantaDotsSize', 'title': 'size', 'type': 'range', 'min': 0.5, 'max':10, 'default': 3},
                                'spacing': {'symbol': 'vantaDotsSpacing', 'title': 'spacing', 'type': 'range', 'min': 5, 'max':100, 'default': 35},
                                'showLines': {'symbol': 'vantaDotSShowLines', 'id': 'vantaNeShowLines', 'title': 'showLines', 'type': 'checkbox', 'default': 'checked'},
                            }
                        ]
                    }
                ]
            ],
            'vantarings' : [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaRings', 'title': 'rings'},
                        'value': [
                            {
                                'color': {'symbol': 'vantaRingsColor', 'title': 'color', 'type': 'color', 'default': '#88ff00'},
                                'backgroundColor': {'symbol': 'vantaRingsBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#202428'},
                                'backgroundAlpha': {'symbol': 'vantaRingsBackgroundAlpha', 'title': 'backgroundAlpha', 'type': 'range', 'min': 0, 'max': 1, 'default': 1},
                            }
                        ]
                    }
                ]
            ],
            'vantahalo': [
                [
                    {
                        'parentName': {'id': 'accordion1', 'symbol' : 'vantaHalo', 'title': 'halo'},
                        'value': [
                            {
                                'backgroundColor': {'symbol': 'vantaHaloBackgroundColor', 'title': 'backgroundColor', 'type': 'color', 'default': '#131a43'},
                                'baseColor': {'symbol': 'vantaHaloBaseColor', 'title': 'baseColor', 'type': 'color', 'default': '#001a59'},
                                'size': {'symbol': 'vantaHaloSize', 'title': 'size', 'type': 'range', 'min': 0.1, 'max': 3, 'default': 1},
                                'amplitudeFactor': {'symbol': 'vantaHaloAmplitudeFactor', 'title': 'amplitudeFactor', 'type': 'range', 'min': 0, 'max': 3, 'default': 1},
                                'xOffset': {'symbol': 'vantaHaloXOffset', 'title': 'xOffset', 'type': 'range', 'min': -5, 'max': 0.5, 'default': 0},
                                'yOffset': {'symbol': 'vantaHaloYOffset', 'title': 'yOffset', 'type': 'range', 'min': -5, 'max': 0.5, 'default': 0},
                            }
                        ]
                    }
                ]
            ]
        };

        id = name;
        name = kind == 'null'? name : 1;
        param = kind == 'null'? paramArray[type][Number(name) - 1]: paramArray[type + kind][Number(name) - 1];

        let elmDiv = document.createElement('div');
        elmDiv.classList.add('particlesDetailSettingPanel');
        let elmUl = document.createElement('ul');
        let cnt  = 0;
        let elmLi = document.createElement('li');
        this.createDetailSettingAreaParticlesLi(param, cnt, name, elmLi);
        elmUl.appendChild(elmLi);
        elmDiv.appendChild(elmUl);

        let elmButtonDiv = document.createElement('div');
        elmButtonDiv.classList.add('displayFlex');
        let elmSaveButton = document.createElement('button');
        elmSaveButton.textContent = '保存';
        let elmCancelButton = document.createElement('button');
        elmCancelButton.textContent = '戻る';
        elmSaveButton.onclick = function () {   // 保存ボタンが押された時
            
            let inputData = object.getDetailSettingAreaParticles(param);   /* 保存する値を取得 */
            
            let post = {
                'mode': 'updateDetailSettingParticles',
                'secret': localizeData['secret'],
                'action': localizeData['action'],
                'type': type,
                'name': id,
                'settingData': JSON.stringify(inputData),
            }

            new ajax(post, localizeData['ajaxUrl'], function(responseText){
            
                if(responseText == 'update completed')
                    window.alert('正常に保存されました');
    
            });
    
        }

        elmCancelButton.onclick = function () { // 戻るボタンが押された時
            // 詳細設定データを削除する
            let elm = document.getElementsByClassName('particlesDetailSettingPanel');
            elm[0].parentNode.removeChild(elm[0]);
            // モーダルパネルを非表示にする
            elm = document.getElementsByClassName('backgroundSettingModalPanel');
            elm[0].classList.add('hiddenPanel');
        }
        elmButtonDiv.appendChild(elmSaveButton);
        elmButtonDiv.appendChild(elmCancelButton);

        elmDiv.appendChild(elmButtonDiv);

        return elmDiv;

    }

    this.createDetailSettingAreaParticlesLi = function(params, cnt, name, elmParentLi){

        const idPrefix = 'detailSettingParticles';

        params.forEach(function(param){
            if('parentName' in param){
                let elmUl = document.createElement('ul');
                elmUl.style.marginLeft = 5 * cnt + 'px';
                let elmInput = document.createElement('input');
                elmInput.type = 'checkbox';
                elmInput.id = param['parentName']['id'];
                elmInput.classList.add('accordionHidden');
                elmUl.appendChild(elmInput);
                let elmLabel = document.createElement('label');
                elmLabel.setAttribute('for', param['parentName']['id']);
                let elmLi = document.createElement('li');
                elmLi.textContent = param['parentName']['title'];
                elmLi.classList.add('accordionClosed');
                elmLabel.appendChild(elmLi);
                elmUl.appendChild(elmLabel);
                let elm = document.createElement('li');
                this.createDetailSettingAreaParticlesLi(param['value'], cnt+ 1, name, elm);
                elmUl.appendChild(elm);
                elmParentLi.appendChild(elmUl);
            } else {
                for(element in param){
                    let elmLi = document.createElement('li');
                    let elmDiv = document.createElement('div');
                    elmDiv.textContent = param[element]['title'];
                    elmDiv.classList.add('flexBasis20');
                    elmLi.appendChild(elmDiv);
                    elmLi.classList.add('displayFlex')
                    if (param[element]['type'] == 'text' || param[element]['type'] == 'number'){
                        let elmInput = document.createElement('input');
                        elmInput.type = param[element]['type'];
                        if( localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != undefined &&
                            localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != null &&
                            JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != undefined &&
                            JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != null) {
                            elmInput.value = JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']];
                        } else {
                            elmInput.value = param[element]['default'];
                        }
                        elmInput.id = idPrefix + param[element]['symbol'];
                        elmLi.appendChild(elmInput);
                    } else if(param[element]['type'] == 'range'){
                        {
                            let elmInput = document.createElement('input');
                            elmInput.type = 'range';
                            elmInput.id = idPrefix + param[element]['symbol'];
                            elmInput.min = param[element]['min'];
                            elmInput.max = param[element]['max'];
                            elmInput.step = 'any';
                            if( localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != undefined &&
                                localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != null &&
                                JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != undefined &&
                                JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != null) {
                                elmInput.value = JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']];
                            } else {
                                elmInput.value = param[element]['default'];
                            }
                            elmLi.appendChild(elmInput);
                            let object = elmInput;
                            elmInput.onchange = () =>{
                                object.nextElementSibling.value = object.value;
                            }
                        }
                        {
                            let elmInput = document.createElement('input');
                            elmInput.type = 'number';
                            elmInput.min = param[element]['min'];
                            elmInput.max = param[element]['max'];
                            if('numberStep' in param[element]){
                                elmInput.step = param[element]['numberStep'];
                            }
                            if( localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != undefined &&
                                localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != null &&
                                JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != undefined &&
                                JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != null) {
                                elmInput.value = JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']];
                            } else {
                                elmInput.value = param[element]['default'];
                            }
                            let object = elmInput;
                            elmInput.oninput = () =>{
                                object.previousElementSibling.value = object.value;
                            }
                            elmLi.appendChild(elmInput);
                        }
                    } else if(param[element]['type'] == 'color') {
                        // カラーピッカーを作る
                        let elmColorInput = document.createElement('input');
                        elmColorInput.type = 'color';
                        if( localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != undefined &&
                            localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != null &&
                            JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != undefined &&
                            JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != null) {
                            elmColorInput.value = JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']];
                        } else {
                            elmColorInput.value = param[element]['default'];
                        }
                        elmColorInput.id = idPrefix + param[element]['symbol'];
                        elmLi.appendChild(elmColorInput);
                        elmColorInput.onchange = () =>{}
                       // テキストボックスを作る
                        let elmTextInput = document.createElement('input');
                        elmTextInput.type = 'text';
                        elmTextInput.value = elmColorInput.value;
                        elmLi.appendChild(elmTextInput);
                        elmColorInput.onchange = () => {    // カラーピッカーで変更あったら
                            elmTextInput.value = elmColorInput.value;
                        }
                        elmTextInput.onchange = () => { // テキストボックスで変更あったら
                            elmColorInput.value = elmTextInput.value;
                        }
                    } else if(param[element]['type'] == 'checkbox'){
                        let elmInput = document.createElement('input');
                        elmInput.type = 'checkbox';
                        if( localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != undefined &&
                            localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != null &&
                            JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != undefined &&
                            JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != null) {
                                JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] == 1 ? elmInput.checked = true:elmInput.checked = false;
                        } else {
                            param[element]['default'] == 'checked' ? elmInput.checked = true:elmInput.checked = false;
                        }
                        elmInput.id = idPrefix + param[element]['symbol'];
                        elmLi.appendChild(elmInput);
                    } else if(param[element]['type'] == 'select'){
                        let elmSelect = document.createElement('select');
                        elmSelect.name = param[element]['title'];
                        elmSelect.id = idPrefix + param[element]['symbol'];
                        elmLi.appendChild(elmSelect);
                        param[element]['option'].forEach(option => {
                            let elmOption = document.createElement('option');
                            elmOption.value = option['value'];
                            elmOption.textContent = option['caption'];
                            if( localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != undefined &&
                                localizeData['backgroundGimmickData'][Number(name) -1]['parameter'] != null &&
                                JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != undefined &&
                                JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] != null) {
                                    JSON.parse(localizeData['backgroundGimmickData'][Number(name) -1]['parameter'])[param[element]['symbol']] == option['value'] ? elmOption.selected = true:elmOption.selected = false;
                            } else {
                                param[element]['default'] == option['value'] ? elmOption.selected = true:elmOption.selected = false;
                            }
                            elmSelect.appendChild(elmOption);
                        });
                    }

                    elmParentLi.appendChild(elmLi);
                }
            }
        });

    }

    this.getDetailSettingAreaParticles = function(paramArray) {

        object = this;
        const idPrefix = 'detailSettingParticles';

        let inputData = {};

        paramArray.forEach(param => {
            if('parentName' in param) {

                rtn = object.getDetailSettingAreaParticles(param['value']);
                inputData = {...inputData, ...rtn};

            } else {
                Object.keys(param).forEach(value => {

                    if(param[value]['type'] == 'text' || param[value]['type'] == 'number' || param[value]['type'] == 'range' || param[value]['type'] == 'color'){
                        let elm = document.getElementById(idPrefix + param[value]['symbol']);
                        inputData[param[value]['symbol']] = elm.value;
                    } else if(param[value]['type'] == 'checkbox') {
                        let elm = document.getElementById(idPrefix + param[value]['symbol']);
                        inputData[param[value]['symbol']] = elm.checked ? 1 : 0;
                    } else if(param[value]['type'] == 'select') {
                        let elm = document.getElementById(idPrefix + param[value]['symbol']);
                        inputData[param[value]['symbol']] = elm.value;
                    }

                });
            }
        });

        return inputData;
    }

});