{
  let elmWrapDiv = document.createElement('div');
  elmWrapDiv.classList.add('wrap');
  {
    let elmDiv = document.createElement('div');
    elmDiv.id = 'vanta-js';
    elmWrapDiv.appendChild(elmDiv);
  }
  let elmBody = document.getElementsByTagName('body');
  elmBody[0].appendChild(elmWrapDiv);
}

vantaData = JSON.parse(localizeData['vanta']);

VANTA.BIRDS({
    el: "#vanta-js",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: vantaData['vantaBirdsBackgroundColor'],
    backgroundAlpha: vantaData['vantaBirdsBackgroundAlpha'],
    color1: vantaData['vantaBirdsColor1'],
    color2: vantaData['vantaBirdsColor2'],
    colorMode: vantaData['vantaBirdsColorMode'],
    quantity: vantaData['vantaBirdsQuantity'],
    birdSize: vantaData['vantaBirdsBirdSize'],
    wingSpan: vantaData['vantaBirdsWingSpan'],
    speedLimit: vantaData['vantaBirdSpeedLimit'],
    separation: vantaData['vantaBirdSeparation'],
    alignment: vantaData['vantaBirdAlignment'],
    cohesion: vantaData['vantaBirdCohesion'],
  })