
let bubblyData = JSON.parse(localizeData['bubbly']);

propertyBubbly = {
    'animate': bubblyData['BubblyAnimate'] == 'true'? true:false,
    'blur': Number(bubblyData['BubblyBlur']),
    'colorStart': bubblyData['BubblyColorStart'],
    'colorStop': bubblyData['BubblyColorStop'],
    'compose': bubblyData['BubblyCompose'],
    'shadowColor': bubblyData['BubblyShadowColor'],
};
if(bubblyData['BubblyBubbleFunc'] != ''){
    propertyBubbly['bubbleFunc'] = new Function('return ' + bubblyData['BubblyBubbleFunc']);
}
if(bubblyData['BubblyBubbles'] != ''){
    propertyBubbly['bubbles'] = (new Function('return ' + bubblyData['BubblyBubbles'])).call();
}
if(bubblyData['BubblyAngleFunc'] != ''){
    propertyBubbly['angleFunc'] = new Function('return ' + bubblyData['BubblyAngleFunc']);
}
if(bubblyData['BubblyVelocityFunc'] != ''){
    propertyBubbly['velocityFunc'] = new Function('return ' + bubblyData['BubblyVelocityFunc']);
}
if(bubblyData['BubblyRadiusFunc'] != ''){
    propertyBubbly['radiusFunc'] = new Function('return ' + bubblyData['BubblyRadiusFunc']);
}

bubbly({
    'animate': bubblyData['BubblyAnimate'] == 'true'? true:false,
    'blur': Number(bubblyData['BubblyBlur']),
    'colorStart': bubblyData['BubblyColorStart'],
    'colorStop': bubblyData['BubblyColorStop'],
    'compose': bubblyData['BubblyCompose'],
    'shadowColor': bubblyData['BubblyShadowColor'],
});