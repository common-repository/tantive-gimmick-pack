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

VANTA.FOG({
    el: "#vanta-js",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    speed: 5.00,
    zoom: 1.20,
    highlightColor: vantaData['vantaFogsHighlightColor'],
    midtoneColor: vantaData['vantaFogsMidtoneColor'],
    lowlightColor: vantaData['vantaFogsLowlightColor'],
    baseColor: vantaData['vantaFogsBaseColor'],
    blurFactor: Number(vantaData['vantaFogsBlurFactor']),
    zoom: Number(vantaData['vantaFogsZoom']),
    speed: Number(vantaData['vantaFogsSpeed']),
  })