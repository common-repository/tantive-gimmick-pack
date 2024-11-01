window.addEventListener('load', function(){

    let object = this;
    const idPrefix = 'tantiveGimmickPack' + 'MSS';

    this.createSettingScreen = function(){

        let object = this;

        elmMouseStalkerSettingPanel = document.getElementById('mouseStalkerSettingPanel');
        object.removeAllChildNodes(elmMouseStalkerSettingPanel);

        let remove = 0;
    
        let elmWrapper = document.createElement('div');
        elmMouseStalkerSettingPanel.appendChild(elmWrapper);
        elmWrapper.id = idPrefix + 'Wrapper';
        elmWrapper.classList.add('displayFlex');
    
        // 個々の説明ボックスを順に作ってWrapperに追加
        localizeData['mouseStalkerGimmickData'].forEach((mouseStalkerGimmickData, index) => {
            let elmBox = document.createElement('div');
            elmBox.classList.add(idPrefix + 'Box');
            {   // 説明
                let elmP = document.createElement('p');
                elmP.textContent = mouseStalkerGimmickData['description'];
                elmP.style.fontWeight = 'bold';
                elmBox.appendChild(elmP);
            }
            {   // 日本語タイトル
                let elmP = document.createElement('P');
                elmP.textContent = '↓のエリアでマウスを動かしてください';
                elmBox.appendChild(elmP);
            }
            {   // 英語タイトル
                let elmP = document.createElement('p');
                elmP.textContent = 'HOVER ME!'
                elmBox.appendChild(elmP);
            }            {   // トライエリア
                let elmDiv = document.createElement('div');
                elmDiv.classList.add(idPrefix + 'Try');

                object.createTryAreaMouseStalker(index + 1, elmDiv, JSON.parse(mouseStalkerGimmickData['parameters']));
                elmBox.appendChild(elmDiv);
                elmDiv.addEventListener('mousemove', (e) => {
                    this.actMouseStalker(e, index + 1);
                });
                elmDiv.addEventListener('mouseout', (e) => {
                    // this.deactMouseStalker(e, index + 1);
                });
            }
            {   // オンオフエリア
                elmDiv = document.createElement('div');
                elmDiv.classList.add(idPrefix + 'OnOff');
                {   // オフ
                    elmP = document.createElement('p');
                    elmP.textContent = 'OFF';
                    elmDiv.appendChild(elmP);
                }
                {   // ラジオボタン
                    elmInput = document.createElement('input');
                    elmInput.type = 'radio';
                    elmInput.value = mouseStalkerGimmickData['id'];
                    elmInput.name = 'radio';
                    elmInput.id = idPrefix + 'radio' + mouseStalkerGimmickData['id'];
                    elmInput.classList.add(idPrefix + 'radio');
                    if(mouseStalkerGimmickData['selected'] == 1){
                        elmInput.checked = true;
                        remove = elmInput.value;
                    }
                    elmDiv.appendChild(elmInput);
                    elmInput.onclick = (e) => {
                        if(remove == e.target.value){
                            remove = 0;
                            e.target.checked = false;
                        } else {
                            remove = e.target.value;
                        }
                        object.mouseStalkerSelectSetting();
                    }
                }
                {   // ラベル
                    elmLabel = document.createElement('label');
                    elmLabel.htmlFor = idPrefix + 'radio' + mouseStalkerGimmickData['id'];
                    elmDiv.appendChild(elmLabel);
                }
                {   // オン
                    elmP = document.createElement('p');
                    elmP.textContent = 'ON';
                    elmDiv.appendChild(elmP);
                }
                elmBox.appendChild(elmDiv);
            }
            {   // 設定ボタン
                elmButton = document.createElement('button');
                elmButton.textContent = '設定';
                elmButton.dataset.id = mouseStalkerGimmickData['id'];
                elmBox.appendChild(elmButton);
                elmButton.onclick = (e) => {
                    object.settingDetail(e.target.dataset.id);
                }
            }
            elmWrapper.appendChild(elmBox);
        });
    }

    this.actMouseStalker = function(e, index) {

        if(index == 1){
            let elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
            elmStalker.style.transform = 'translate(' + (e.clientX - e.target.getBoundingClientRect().left) + 'px, ' + (e.clientY - e.target.getBoundingClientRect().top) + 'px)';
        }
        if(index == 2){
            let elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
            elmStalker.style.transform = 'translate(' + (e.clientX - e.currentTarget.getBoundingClientRect().left) + 'px, ' + (e.clientY - e.currentTarget.getBoundingClientRect().top) + 'px)';
        }
        if(index == 3){
            let elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
            elmStalker.style.transform = 'translate(' + (e.clientX - e.currentTarget.getBoundingClientRect().left) + 'px, ' + (e.clientY - e.currentTarget.getBoundingClientRect().top) + 'px)';
        }
        if(index == 4){
            let elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
            let elmCursor = document.getElementById(idPrefix + 'Cursor' + index);
            elmStalker.style.transform = 'translate(' + (e.clientX - e.currentTarget.getBoundingClientRect().left) + 'px, ' + (e.clientY - e.currentTarget.getBoundingClientRect().top) + 'px) translateX(-50%) translateY(-50%)';
            elmCursor.style.transform =  'translate(' + (e.clientX - e.currentTarget.getBoundingClientRect().left) + 'px, ' + (e.clientY - e.currentTarget.getBoundingClientRect().top) + 'px) translateX(-50%) translateY(-50%)';
            e.target.style.cursor = 'none';
        }
        if(index == 5){
            let elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
            let elmCursor = document.getElementById(idPrefix + 'Cursor' + index);
            elmStalker.style.transform = 'translate(' + (e.clientX - e.currentTarget.getBoundingClientRect().left) + 'px, ' + (e.clientY - e.currentTarget.getBoundingClientRect().top) + 'px) translateX(-50%) translateY(-50%)';
            elmCursor.style.transform =  'translate(' + (e.clientX - e.currentTarget.getBoundingClientRect().left) + 'px, ' + (e.clientY - e.currentTarget.getBoundingClientRect().top) + 'px) translateX(-50%) translateY(-50%)';
            e.target.style.cursor = 'none';
            elmStalker.style.display = 'block';
        }
    }

    this.deactMouseStalker = function(e, index){
        if(index == 5){
            let elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
            elmStalker.style.display = 'none';
        }
    }

    this.createTryAreaMouseStalker = function(index, elmDiv, parameters) {
 
        let object = this;

        if(index == 1){
            let elmStalker = document.createElement('div');
            elmStalker.id = (idPrefix + 'Stalker' + index);
            elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
            elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
            elmStalker.style.width = parameters['size'] + 'px';
            elmStalker.style.height = parameters['size'] + 'px';
            elmStalker.style.background = 'rgba(' + parameters['red'] + ',' + parameters['green'] + ',' + parameters['blue'] + ',' + parameters['opacity'] + ')';
            elmStalker.style.transition = parameters['transition'] + 's';
            elmDiv.appendChild(elmStalker);
        } else if(index == 2){
            {
                let elmA = document.createElement('a');
                elmA.id = idPrefix + 'TryMeLink' + index;
                elmA.textContent = 'HOVER ME!';
                elmDiv.appendChild(elmA);
                elmA.addEventListener('mouseover', (e) =>{
                    elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.top = '-' + (parameters['activeSize'] / 2) + 'px';
                    elmStalker.style.left = '-' + (parameters['activeSize'] / 2) + 'px';
                    elmStalker.style.width = parameters['activeSize'] + 'px';
                    elmStalker.style.height = parameters['activeSize'] + 'px';
                    elmStalker.style.background = 'rgba(' + parameters['activeRed'] + ',' + parameters['activeGreen'] + ',' + parameters['activeBlue'] + ',' + parameters['activeOpacity'] + ')';
                });
                elmA.addEventListener('mouseout', (e) => {
                    document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
                    elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
                    elmStalker.style.width = parameters['size'] + 'px';
                    elmStalker.style.height = parameters['size'] + 'px';
                    elmStalker.style.background = 'rgba(' + parameters['red'] + ',' + parameters['green'] + ',' + parameters['blue'] + ',' + parameters['opacity'] + ')';
                    });
            }
            {
                let elmStalker = document.createElement('div');
                elmStalker.id = (idPrefix + 'Stalker' + index);
                elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
                elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
                elmStalker.style.width = parameters['size'] + 'px';
                elmStalker.style.height = parameters['size'] + 'px';
                elmStalker.style.background = 'rgba(' + parameters['red'] + ',' + parameters['green'] + ',' + parameters['blue'] + ',' + parameters['opacity'] + ')';
                elmStalker.style.transition = parameters['transition'] + 's';
                elmDiv.appendChild(elmStalker);
            }
        } else if(index == 3) {
            {   // 黒背景ボタン
                let elmA = document.createElement('a');
                elmA.id = idPrefix + 'TryMeLinkBlack' + index;
                elmA.textContent = 'HOVER ME!';
                elmDiv.appendChild(elmA);
                elmA.addEventListener('mouseover', (e) =>{
                    elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.top = '-' + (parameters['activeSize'] / 2) + 'px';
                    elmStalker.style.left = '-' + (parameters['activeSize'] / 2) + 'px';
                    elmStalker.style.width = parameters['activeSize'] + 'px';
                    elmStalker.style.height = parameters['activeSize'] + 'px';
                });
                elmA.addEventListener('mouseout', (e) => {
                    document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
                    elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
                    elmStalker.style.width = parameters['size'] + 'px';
                    elmStalker.style.height = parameters['size'] + 'px';
                });
            }
            {   // 白背景ボタン
                let elmA = document.createElement('a');
                elmA.id = idPrefix + 'TryMeLinkWhite' + index;
                elmA.textContent = 'HOVER ME!';
                elmDiv.appendChild(elmA);
                elmA.addEventListener('mouseover', (e) =>{
                    elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.top = '-' + (parameters['activeSize'] / 2) + 'px';
                    elmStalker.style.left = '-' + (parameters['activeSize'] / 2) + 'px';
                    elmStalker.style.width = parameters['activeSize'] + 'px';
                    elmStalker.style.height = parameters['activeSize'] + 'px';
                });
                elmA.addEventListener('mouseout', (e) => {
                    document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
                    elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
                    elmStalker.style.width = parameters['size'] + 'px';
                    elmStalker.style.height = parameters['size'] + 'px';
                });
            }
            {
                let elmStalker = document.createElement('div');
                elmStalker.id = (idPrefix + 'Stalker' + index);
                elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
                elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
                elmStalker.style.width = parameters['size'] + 'px';
                elmStalker.style.height = parameters['size'] + 'px';
                elmStalker.style.transition = parameters['transition'] + 's';
                elmDiv.appendChild(elmStalker);
            }
        } else if(index == 4){
            {   // カーソル設定
                let elmCursor = document.createElement('div');
                elmCursor.id = (idPrefix + 'Cursor' + index);
                elmCursor.style.width = parameters['cursorSize'] + 'px';
                elmCursor.style.height = parameters['cursorSize'] + 'px';
                elmCursor.style.background = 'rgba(' + parameters['cursorRed'] + ',' + parameters['cursorGreen'] + ',' + parameters['cursorBlue'] + ',1)';
                elmCursor.style.opacity = parameters['cursorOpacity'];
                elmDiv.appendChild(elmCursor);
            }
            {   // ストーカー設定
                let elmStalker = document.createElement('div');
                elmStalker.id = (idPrefix + 'Stalker' + index);
                elmStalker.style.width = parameters['stalkerSize'] + 'px';
                elmStalker.style.height = parameters['stalkerSize'] + 'px';
                elmStalker.style.transition = parameters['transition'] + 's';
                elmStalker.style.border = '1px solid rgba(' + parameters['stalkerRed'] + ',' + parameters['stalkerGreen'] + ',' + parameters['stalkerBlue'] + ',1)';
                elmDiv.appendChild(elmStalker);
            }
        }  else if(index == 5){
            {   // カーソル設定
                let elmCursor = document.createElement('div');
                elmCursor.id = (idPrefix + 'Cursor' + index);
                elmCursor.style.width = parameters['cursorSize'] + 'px';
                elmCursor.style.height = parameters['cursorSize'] + 'px';
                elmCursor.style.background = 'rgba(' + parameters['cursorRed'] + ',' + parameters['cursorGreen'] + ',' + parameters['cursorBlue'] + ',1)';
                elmCursor.style.opacity = parameters['cursorOpacity'];
                elmDiv.appendChild(elmCursor);
            }
            {   // ストーカー設定
                let elmStalker = document.createElement('div');
                elmStalker.id = (idPrefix + 'Stalker' + index);
                elmStalker.style.width = parameters['stalkerSize'] + 'px';
                elmStalker.style.height = parameters['stalkerSize'] + 'px';
                elmStalker.style.transition = parameters['transition'] + 's';
                elmStalker.style.border = '1px solid rgba(' + parameters['stalkerRed'] + ',' + parameters['stalkerGreen'] + ',' + parameters['stalkerBlue'] + ',1)';
                elmDiv.appendChild(elmStalker);
            }
            {
                let elmA = document.createElement('a');
                elmA.id = idPrefix + 'TryMeLink' + index;
                elmA.textContent = 'HOVER ME!';
                elmDiv.appendChild(elmA);
                elmA.addEventListener('mouseover', (e) =>{
                    elmCursor = document.getElementById(idPrefix + 'Cursor' + index);
                    elmCursor.style.visibility = 'hidden';

                    elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.width = parameters['activeSize'] + 'px';
                    elmStalker.style.height = parameters['activeSize'] + 'px';
                    elmStalker.style.background = 'rgba(' + parameters['activeRed'] + ',' + parameters['activeGreen'] + ',' + parameters['activeBlue'] + ',' + parameters['activeOpacity'] + ')';
                    elmStalker.style.borderColor = 'transparent';
                });
                elmA.addEventListener('mouseout', (e) => {
                    elmCursor = document.getElementById(idPrefix + 'Cursor' + index);
                    elmCursor.style.visibility = 'visible';

                    elmStalker = document.getElementById(idPrefix + 'Stalker' + index);
                    elmStalker.style.width = parameters['stalkerSize'] + 'px';
                    elmStalker.style.height = parameters['stalkerSize'] + 'px';
                    elmStalker.style.border = '1px solid rgba(' + parameters['stalkerRed'] + ',' + parameters['stalkerGreen'] + ',' + parameters['stalkerBlue'] + ',1)';
                    elmStalker.style.backgroundColor = 'transparent';
                });
            }
        }
    }

    this.settingDetail = function(id) {

        let object = this;

        const paramArray = [
            [
                {
                    'title': 'サイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'size',
                        'id': 'Size',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': '色',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'red', 'green', 'blue', 'opacity'
                        ],
                        'id': 'Color'
                    },
                },
                {
                    'title': '透過度(0-1:0.1刻み)',
                    'setting': {
                        'type': 'number',
                        'key': 'opacity',
                        'id': 'Opacity',
                        'min': 0,
                        'max': 1,
                        'step': 0.1,
                    }
                },
                {
                    'title': '遅れ時間(0s-2s(0.05s刻み))',
                    'setting': {
                        'type': 'number',
                        'key': 'transition',
                        'id': 'Transition',
                        'min': 0,
                        'max': 2,
                        'step': 0.05,
                    }
                }
            ],
            [
                {
                    'title': 'サイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'size',
                        'id': 'Size',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': '色',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'red', 'green', 'blue', 'opacity'
                        ],
                        'id': 'Color'
                    },
                },
                {
                    'title': '透過度(0-1:0.1刻み)',
                    'setting': {
                        'type': 'number',
                        'key': 'opacity',
                        'id': 'Opacity',
                        'min': 0,
                        'max': 1,
                        'step': 0.1,
                    }
                },
                {
                    'title': '遅れ時間(0s-2s(0.05s刻み))',
                    'setting': {
                        'type': 'number',
                        'key': 'transition',
                        'id': 'Transition',
                        'min': 0,
                        'max': 2,
                        'step': 0.05,
                    }
                },
                {
                    'title': 'ホバー時サイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'activeSize',
                        'id': 'ActiveSize',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': 'ホバー時色',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'activeRed', 'activeGreen', 'activeBlue', 'opacity'
                        ],
                        'id': 'ActiveColor'
                    },
                },
                {
                    'title': 'ホバー時透過度(0-1:0.1刻み)',
                    'setting': {
                        'type': 'number',
                        'key': 'activeOpacity',
                        'id': 'ActiveOpacity',
                        'min': 0,
                        'max': 1,
                        'step': 0.1,
                    }
                },
            ],
            [
                {
                    'title': 'サイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'size',
                        'id': 'Size',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': '遅れ時間(0s-2s(0.05s刻み))',
                    'setting': {
                        'type': 'number',
                        'key': 'transition',
                        'id': 'Transition',
                        'min': 0,
                        'max': 2,
                        'step': 0.05,
                    }
                },
                {
                    'title': 'ホバー時サイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'activeSize',
                        'id': 'ActiveSize',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
            ],
            [
                {
                    'title': 'カーソルサイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'cursorSize',
                        'id': 'CursorSize',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': 'カーソルカラー',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'cursorRed', 'cursorGreen', 'cursorBlue',
                        ],
                        'id': 'CursoColor'
                    },
                },
                {
                    'title': 'カーソル透過度(0-1:0.1刻み)',
                    'setting': {
                        'type': 'number',
                        'key': 'cursorOpacity',
                        'id': 'CursorOpacity',
                        'min': 0,
                        'max': 1,
                        'step': 0.1,
                    }
                },
                {
                    'title': 'ストーカーサイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'stalkerSize',
                        'id': 'StalkerSize',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': 'ストーカーカラー',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'stalkerRed', 'stalkerGreen', 'stalkerBlue',
                        ],
                        'id': 'StalkerColor'
                    },
                },
                {
                    'title': '遅れ時間(0s-2s(0.05s刻み))',
                    'setting': {
                        'type': 'number',
                        'key': 'transition',
                        'id': 'Transition',
                        'min': 0,
                        'max': 2,
                        'step': 0.05,
                    }
                },
            ],
            [
                {
                    'title': 'カーソルサイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'cursorSize',
                        'id': 'CursorSize',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': 'カーソルカラー',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'cursorRed', 'cursorGreen', 'cursorBlue',
                        ],
                        'id': 'CursoColor'
                    },
                },
                {
                    'title': 'カーソル透過度(0-1:0.1刻み)',
                    'setting': {
                        'type': 'number',
                        'key': 'cursorOpacity',
                        'id': 'CursorOpacity',
                        'min': 0,
                        'max': 1,
                        'step': 0.1,
                    }
                },
                {
                    'title': 'ストーカーサイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'stalkerSize',
                        'id': 'StalkerSize',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': 'ストーカーカラー',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'stalkerRed', 'stalkerGreen', 'stalkerBlue',
                        ],
                        'id': 'StalkerColor'
                    },
                },
                {
                    'title': '遅れ時間(0s-2s(0.05s刻み))',
                    'setting': {
                        'type': 'number',
                        'key': 'transition',
                        'id': 'Transition',
                        'min': 0,
                        'max': 2,
                        'step': 0.05,
                    }
                },
                {
                    'title': 'ホバー時サイズ(1-100)',
                    'setting':  {
                        'type': 'number',
                        'key': 'activeSize',
                        'id': 'ActiveSize',
                        'min': 1,
                        'max': 100,
                        'step': 1,
                    }
                },
                {
                    'title': 'ホバー時色',
                    'setting': {
                        'type': 'rgba',
                        'key': [
                            'activeRed', 'activeGreen', 'activeBlue', 'opacity'
                        ],
                        'id': 'ActiveColor'
                    },
                },
                {
                    'title': 'ホバー時透過度(0-1:0.1刻み)',
                    'setting': {
                        'type': 'number',
                        'key': 'activeOpacity',
                        'id': 'ActiveOpacity',
                        'min': 0,
                        'max': 1,
                        'step': 0.1,
                    }
                },
            ],
        ]

        let elmWrapper = document.createElement('div');
        {   // 設定テーブル作る
            let elmTable = document.createElement('table');
            paramArray[id - 1].forEach(param => {
                let elmTr = document.createElement('tr');
                {   // タイトル
                    let elmTh = document.createElement('th');
                    elmTh.textContent = param['title'];
                    elmTr.appendChild(elmTh);
                }
                {   // パラメータ設定
                    let elmTd = document.createElement('td');
                    const mouseStalkerGimmickData = JSON.parse(localizeData['mouseStalkerGimmickData'][id - 1]['parameters']);
                    let elmTdInner = object.getSettingElm(param['setting'], mouseStalkerGimmickData);
                    elmTd.appendChild(elmTdInner);
                    elmTr.appendChild(elmTd);
                }
                elmTable.appendChild(elmTr);
            });
            elmWrapper.appendChild(elmTable);
        }
        {   // ボタンエリア
            let elmButtonArea = document.createElement('div');
            {   // 保存
                let elmButton = document.createElement('button');
                elmButton.textContent = '保存';
                elmButton.dataset.id = id;
                elmButtonArea.appendChild(elmButton);
                elmButton.onclick = (e) => {
                    object.updateMouseStalkerSetting(e.target.dataset.id, paramArray[e.target.dataset.id - 1]);
                }
            }
            {   // キャンセル
                let elmButton = document.createElement('button');
                elmButton.textContent = 'キャンセル';
                elmButtonArea.appendChild(elmButton);
                elmButton.onclick = () => {
                    mouseStalkerSettingModalPanelElm = document.getElementById('mouseStalkerSettingModalPanel');
                    object.removeAllChildNodes(mouseStalkerSettingModalPanelElm);
                    mouseStalkerSettingModalPanelElm.classList.add('hiddenPanel');
                }
            }
            elmWrapper.appendChild(elmButtonArea);
        }

        let mouseStalkerSettingModalPanelElm = document.getElementById('mouseStalkerSettingModalPanel');
        mouseStalkerSettingModalPanelElm.appendChild(elmWrapper);
        mouseStalkerSettingModalPanelElm.classList.remove('hiddenPanel');
    }

    this.mouseStalkerSelectSetting = function() {

        let object = this;

        elmRadios = document.getElementsByClassName(idPrefix + 'radio');

        let selectedRadio = [];
        for(i = 0; i < elmRadios.length; i++){

            selectedRadio.push(elmRadios[i].checked?1:0);

        };

        let post = {
            'mode': 'mouseStalkerSelectSetting',
            'secret': localizeData['secret'],
            'action': localizeData['action'],
            'selectedRadio': JSON.stringify(selectedRadio),
        };
        new ajax(post, localizeData['ajaxUrl'], function(responseText){
            if(responseText['status'] == 'error'){
                window.alert(responseText['message']);
            }else {
                localizeData['mouseStalkerGimmickData'] = responseText['mouseStalkerGimmickData'];

                mouseStalkerSettingModalPanelElm = document.getElementById('mouseStalkerSettingModalPanel');
                object.removeAllChildNodes(mouseStalkerSettingModalPanelElm);
                mouseStalkerSettingModalPanelElm.classList.add('hiddenPanel');

                object.createSettingScreen();

            }
        });

    }

    this.updateMouseStalkerSetting = function(id, params){

        let object = this;

        inputData = object.getInputData(id, params);

        let post = {
            'mode': 'updateMousStalkerSetting',
            'secret': localizeData['secret'],
            'action': localizeData['action'],
            'key': id,
            'settingData': JSON.stringify(inputData),
        }
        new ajax(post, localizeData['ajaxUrl'], function(responseText){
            window.alert(responseText['message']);
            if(responseText['status'] == 'succeeded'){
                localizeData['mouseStalkerGimmickData'] = responseText['mouseStalkerGimmickData'];

                mouseStalkerSettingModalPanelElm = document.getElementById('mouseStalkerSettingModalPanel');
                object.removeAllChildNodes(mouseStalkerSettingModalPanelElm);
                mouseStalkerSettingModalPanelElm.classList.add('hiddenPanel');

                object.createSettingScreen();

            }
        });

    }

    this.getInputData = function(id, params) {

        let object = this;

        let inputData = {};

        params.forEach(param =>{
            if(param['setting']['type'] == 'number'){
                inputData[param['setting']['key']] = Number(document.getElementById(idPrefix + param['setting']['id']).value);
            } else if(param['setting']['type'] == 'rgba'){
                const value = document.getElementById(idPrefix + param['setting']['id']).value;
                inputData[param['setting']['key'][0]] = parseInt(value.slice(1,3), 16);
                inputData[param['setting']['key'][1]] = parseInt(value.slice(3,5), 16);
                inputData[param['setting']['key'][2]] = parseInt(value.slice(5,7), 16);
            }
        });

        return inputData;

    }

    this.getSettingElm = function(paramSetting,mouseStalkerGimmickData) {

        let object = this;

        let rtnElm;
        if(paramSetting['type'] == 'number'){
            let elmInput = document.createElement('input');
            elmInput.type = 'number';
            elmInput.max = paramSetting['max'];
            elmInput.min = paramSetting['min'];
            elmInput.step = paramSetting['step'];
            elmInput.id = idPrefix + paramSetting['id'];
            elmInput.value = mouseStalkerGimmickData[paramSetting['key']];
            rtnElm = elmInput;
            elmInput.onchange = (e) => {
                if(e.target.value == ''){
                    e.target.value = e.target.min;
                }
                let dotPositionValue = object.getDotPosition(e.target.value);
                let dotPositionStep = object.getDotPosition(e.target.step);
                let larger = Math.max(dotPositionValue,dotPositionStep);
                intValue = (Number(e.target.value).toFixed(larger) + '').replace('.', '');
                intStep = (Number(e.target.step).toFixed(larger) + '').replace('.', '');
                if(intValue % intStep != 0){
                    // elmInput.value = Number(elmInput.value) - Number(elmInput.value) % Number(elmInput.step);
                    e.target.value = Number(e.target.step) * Math.floor(Number(e.target.value) / Number(e.target.step));
                }
                if(Number(e.target.value) > Number(e.target.max)) {
                    e.target.value = e.target.max;
                }
                if(Number(e.target.value) < Number(e.target.min)) {
                    e.target.value = e.target.min;
                }
            }
        } else if(paramSetting['type'] == 'rgba') {
            let elmDiv = document.createElement('div');
            const inputValue = 
                '#' +
                mouseStalkerGimmickData[paramSetting['key'][0]].toString(16).padStart(2, '0') +
                mouseStalkerGimmickData[paramSetting['key'][1]].toString(16).padStart(2, '0') +
                mouseStalkerGimmickData[paramSetting['key'][2]].toString(16).padStart(2, '0');
            elmDiv.style.display = 'flex';
            {
                elmInput = document.createElement('input');
                elmInput.type = 'text';
                elmInput.value = inputValue;
                elmDiv.appendChild(elmInput);
                elmInput.onchange = (e) => {
                    if(e.target.value[0] != '#'){
                        e.target.value = '#' + e.target.value;
                    }
                    if(e.target.value.match(/^#[a-fA-F0-9]{6}$/) == null){
                        e.target.value = '#000000';
                    }
                    elmInput.parentNode.childNodes[1].value = e.target.value;
                }
            }
            {
                elmInput = document.createElement('input');
                elmInput.type = 'color';
                elmInput.value = inputValue;
                elmInput.id = idPrefix + paramSetting['id']
                elmDiv.appendChild(elmInput);
                elmInput.onchange = (e) => {
                    elmInput.parentNode.childNodes[0].value = e.target.value;
                }
            }
            rtnElm = elmDiv;
        }

        return rtnElm;
    }

    this.removeAllChildNodes = function (targetElement) {    /* 全ての子要素を削除する */
        if (targetElement.hasChildNodes()) {
            while (targetElement.lastChild) {
                targetElement.removeChild(targetElement.lastChild);
            }
        }
    }

    this.getDotPosition = function(value){
        
        let dotPosition = 0;

        if(value.lastIndexOf('.') != -1){
            dotPosition = (value.length - 1) - value.lastIndexOf('.');
        }

        return dotPosition;
    }

    object.createSettingScreen();

});