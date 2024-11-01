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

VANTA.WAVES({
    el: "#vanta-js",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: vantaData['vantaWavesColor'],
    shininess: Number(vantaData['vantaFogsShininess']),
    waveHeight: Number(vantaData['vantaFogsWaveHeight']),
    waveSpeed: Number(vantaData['vantaFogsWaveSpeed']),
    zoom: Number(vantaData['vantaFogsZoom']),
});