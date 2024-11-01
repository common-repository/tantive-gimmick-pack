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

VANTA.GLOBE({
    el: "#vanta-js",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: vantaData['vantaGlobeBackgroundColor'],
    color: vantaData['vantaGlobeColor'],
    color2: vantaData['vantaGlobeColor2'],
    size: Number(vantaData['vantaGlobeSize']),
  })