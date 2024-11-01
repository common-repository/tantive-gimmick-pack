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

VANTA.HALO({
    el: "#vanta-js",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    backgroundColor: vantaData['vantaHaloBackgroundColor'],
    baseColor: vantaData['vantaHaloBaseColor'],
    amplitudeFactor: Number(vantaData['vantaHaloAmplitudeFactor']),
    xOffset: Number(vantaData['vantaHaloXOffset']),
    yOffset: Number(vantaData['vantaHaloYOffset']),
    size: Number(vantaData['vantaHaloSize']),
  });