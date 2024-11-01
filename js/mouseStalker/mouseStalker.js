const mouseStalkerSetting = localizeData['mouseStalkerSetting'];
const parameters = JSON.parse(mouseStalkerSetting['parameters']);

if(mouseStalkerSetting['id'] == 1){
    let elmStalker = document.createElement('div');
    elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
    elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
    elmStalker.style.width = parameters['size'] + 'px';
    elmStalker.style.height = parameters['size'] + 'px';
    elmStalker.style.background = 'rgba(' + parameters['red'] + ',' + parameters['green'] + ',' + parameters['blue'] + ',' + parameters['opacity'] + ')';
    elmStalker.style.transition = parameters['transition'] + 's';
    elmStalker.id = 'tantiveGimmickPackMSSStalker1';

    document.getElementsByTagName('body')[0].appendChild(elmStalker);
    document.addEventListener('mousemove', function (e) {
        elmStalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });    
} else if(mouseStalkerSetting['id'] == 2){
    let elmStalker = document.createElement('div');
    elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
    elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
    elmStalker.style.width = parameters['size'] + 'px';
    elmStalker.style.height = parameters['size'] + 'px';
    elmStalker.style.background = 'rgba(' + parameters['red'] + ',' + parameters['green'] + ',' + parameters['blue'] + ',' + parameters['opacity'] + ')';
    elmStalker.style.transition = parameters['transition'] + 's';
    elmStalker.id = 'tantiveGimmickPackMSSStalker2';

    document.getElementsByTagName('body')[0].appendChild(elmStalker);
    document.addEventListener('mousemove', function (e) {
        elmStalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });
    
    elmAnker = document.getElementsByTagName('a');
    for(i = 0; i < elmAnker.length; i++){
        elmAnker[i].addEventListener('mouseover', () =>{
            let elmStalker = document.getElementById('tantiveGimmickPackMSSStalker2');
            elmStalker.style.top = '-' + (parameters['activeSize'] / 2) + 'px';
            elmStalker.style.left = '-' + (parameters['activeSize'] / 2) + 'px';
            elmStalker.style.width = parameters['activeSize'] + 'px';
            elmStalker.style.height = parameters['activeSize'] + 'px';
            elmStalker.style.background = 'rgba(' + parameters['activeRed'] + ',' + parameters['activeGreen'] + ',' + parameters['activeBlue'] + ',' + parameters['activeOpacity'] + ')';
        });
        elmAnker[i].addEventListener('mouseout', () => {
            let elmStalker = document.getElementById('tantiveGimmickPackMSSStalker2');
            elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
            elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
            elmStalker.style.width = parameters['size'] + 'px';
            elmStalker.style.height = parameters['size'] + 'px';
            elmStalker.style.background = 'rgba(' + parameters['red'] + ',' + parameters['green'] + ',' + parameters['blue'] + ',' + parameters['opacity'] + ')';
            elmStalker.style.transition = parameters['transition'] + 's';
        });
    }
}else if(mouseStalkerSetting['id'] == 3){
    let elmStalker = document.createElement('div');
    elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
    elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
    elmStalker.style.width = parameters['size'] + 'px';
    elmStalker.style.height = parameters['size'] + 'px';
    elmStalker.style.transition = parameters['transition'] + 's';
    elmStalker.id = 'tantiveGimmickPackMSSStalker3';

    document.getElementsByTagName('body')[0].appendChild(elmStalker);
    document.addEventListener('mousemove', function (e) {
        elmStalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });

    elmAnker = document.getElementsByTagName('a');
    for(i = 0; i < elmAnker.length; i++){
        elmAnker[i].addEventListener('mouseover', () =>{
            let elmStalker = document.getElementById('tantiveGimmickPackMSSStalker3');
            elmStalker.style.top = '-' + (parameters['activeSize'] / 2) + 'px';
            elmStalker.style.left = '-' + (parameters['activeSize'] / 2) + 'px';
            elmStalker.style.width = parameters['activeSize'] + 'px';
            elmStalker.style.height = parameters['activeSize'] + 'px';
        });
        elmAnker[i].addEventListener('mouseout', () => {
            let elmStalker = document.getElementById('tantiveGimmickPackMSSStalker3');
            elmStalker.style.top = '-' + (parameters['size'] / 2) + 'px';
            elmStalker.style.left = '-' + (parameters['size'] / 2) + 'px';
            elmStalker.style.width = parameters['size'] + 'px';
            elmStalker.style.height = parameters['size'] + 'px';
        });
    }
}else if(mouseStalkerSetting['id'] == 4){
    document.getElementsByTagName('body')[0].style.cursor = 'none';

    let elmStalker = document.createElement('div');

    elmStalker.style.top = '-' + (parameters['stalkerSize'] / 2) + 'px';
    elmStalker.style.left = '-' + (parameters['stalkerSize'] / 2) + 'px';
    elmStalker.style.width = parameters['stalkerSize'] + 'px';
    elmStalker.style.height = parameters['stalkerSize'] + 'px';
    elmStalker.style.transition = parameters['transition'] + 's';
    elmStalker.style.border = '1px solid rgba(' + parameters['stalkerRed'] + ',' + parameters['stalkerGreen'] + ',' + parameters['stalkerBlue'] + ',' + parameters['cursorOpacity'] + ')';
    elmStalker.id = 'tantiveGimmickPackMSSCursor4';

    let elmCursor = document.createElement('div');
    elmCursor.style.top = '-' + (parameters['cursorSize'] / 2) + 'px';
    elmCursor.style.left = '-' + (parameters['cursorSize'] / 2) + 'px';
    elmCursor.style.width = parameters['cursorSize'] + 'px';
    elmCursor.style.height = parameters['cursorSize'] + 'px';
    elmCursor.style.background = 'rgba(' + parameters['cursorRed'] + ',' + parameters['cursorGreen'] + ',' + parameters['cursorBlue'] + ',' + parameters['cursorOpacity'] + ')';
    elmCursor.id = 'tantiveGimmickPackMSSStalker4';

    document.getElementsByTagName('body')[0].appendChild(elmStalker);
    document.getElementsByTagName('body')[0].appendChild(elmCursor);
    document.addEventListener('mousemove', function (e) {
        elmCursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
        elmStalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });    

    elmA = document.getElementsByTagName('a');
    for(i = 0; i < elmA.length; i++){
        elmA[i].style.cursor = 'none';
    }
}else if(mouseStalkerSetting['id'] == 5){
    document.getElementsByTagName('body')[0].style.cursor = 'none';

    let elmStalker = document.createElement('div');
    elmStalker.style.top = '-' + (parameters['stalkerSize'] / 2) + 'px';
    elmStalker.style.left = '-' + (parameters['stalkerSize'] / 2) + 'px';
    elmStalker.style.width = parameters['stalkerSize'] + 'px';
    elmStalker.style.height = parameters['stalkerSize'] + 'px';
    elmStalker.style.border = '1px solid rgba(' + parameters['stalkerRed'] + ',' + parameters['stalkerGreen'] + ',' + parameters['stalkerBlue'] + ',' + parameters['cursorOpacity'] + ')';
    elmStalker.style.transition = parameters['transition'] + 's';
    elmStalker.id = 'tantiveGimmickPackMSSStalker5';

    let elmCursor = document.createElement('div');
    elmCursor.style.top = '-' + (parameters['cursorSize'] / 2) + 'px';
    elmCursor.style.left = '-' + (parameters['cursorSize'] / 2) + 'px';
    elmCursor.style.width = parameters['cursorSize'] + 'px';
    elmCursor.style.height = parameters['cursorSize'] + 'px';
    elmCursor.style.background = 'rgba(' + parameters['cursorRed'] + ',' + parameters['cursorGreen'] + ',' + parameters['cursorBlue'] + ',' + parameters['cursorOpacity'] + ')';
    elmCursor.id = 'tantiveGimmickPackMSSCursor5';

    document.getElementsByTagName('body')[0].appendChild(elmStalker);
    document.getElementsByTagName('body')[0].appendChild(elmCursor);

    document.addEventListener('mousemove', function (e) {
        elmCursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
        elmStalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });

    elmAnker = document.getElementsByTagName('a');
    for(i = 0; i < elmAnker.length; i++){
        elmAnker[i].style.cursor = 'none';

        elmAnker[i].addEventListener('mouseover', () =>{
            let elmCursor = document.getElementById('tantiveGimmickPackMSSCursor5');
            elmCursor.style.visibility = 'hidden';
            // elmCursor.style.top = '-' + (parameters['activeSize'] / 2) + 'px';
            // elmCursor.style.left = '-' + (parameters['activeSize'] / 2) + 'px';
            // elmCursor.style.width = parameters['activeSize'] + 'px';
            // elmCursor.style.height = parameters['activeSize'] + 'px';
            // elmCursor.style.background = 'rgba(' + parameters['activeRed'] + ',' + parameters['activeGreen'] + ',' + parameters['activeBlue'] + ',' + parameters['activeOpacity'] + ')';

            let elmStalker = document.getElementById('tantiveGimmickPackMSSStalker5');
            elmStalker.style.top = '-' + (parameters['activeSize'] / 2) + 'px';
            elmStalker.style.left = '-' + (parameters['activeSize'] / 2) + 'px';
            elmStalker.style.width = parameters['activeSize'] + 'px';
            elmStalker.style.height = parameters['activeSize'] + 'px';
            elmStalker.style.background = 'rgba(' + parameters['activeRed'] + ',' + parameters['activeGreen'] + ',' + parameters['activeBlue'] + ',' + parameters['activeOpacity'] + ')';
            elmStalker.style.borderColor = 'transparent';
            // elmStalker.style.visibility = 'hidden';
        });
        elmAnker[i].addEventListener('mouseout', () => {
            let elmCursor = document.getElementById('tantiveGimmickPackMSSCursor5');
            elmCursor.style.visibility = 'visible';
            // elmCursor.style.top = '-' + (parameters['cursorSize'] / 2) + 'px';
            // elmCursor.style.left = '-' + (parameters['cursorSize'] / 2) + 'px';
            // elmCursor.style.width = parameters['cursorSize'] + 'px';
            // elmCursor.style.height = parameters['cursorSize'] + 'px';
            // elmCursor.style.background = 'rgba(' + parameters['cursorRed'] + ',' + parameters['cursorGreen'] + ',' + parameters['cursorBlue'] + ',' + parameters['cursorOpacity'] + ')';
            // elmCursor.style.transition = parameters['transition'] + 's';

            let elmStalker = document.getElementById('tantiveGimmickPackMSSStalker5');
            elmStalker.style.top = '-' + (parameters['stalkerSize'] / 2) + 'px';
            elmStalker.style.left = '-' + (parameters['stalkerSize'] / 2) + 'px';
            elmStalker.style.width = parameters['stalkerSize'] + 'px';
            elmStalker.style.height = parameters['stalkerSize'] + 'px';
            elmStalker.style.border = '1px solid rgba(' + parameters['stalkerRed'] + ',' + parameters['stalkerGreen'] + ',' + parameters['stalkerBlue'] + ',' + parameters['cursorOpacity'] + ')';
            elmStalker.style.transition = parameters['transition'] + 's';
            elmStalker.style.background = 'transparent';
            // elmStalker.style.visibility = 'visible';
        });
    }

}