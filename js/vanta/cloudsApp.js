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

VANTA.CLOUDS({
    el: "#vanta-js",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    backgroundColor: vantaData['vantaCloudsBackgroundColor'],
    skyColor: vantaData['vantaCloudsSkyColor'],
    cloudColor: vantaData['vantaCloudsCloudColor'],
    cloudShadowColor: vantaData['vantaCloudsCloudShadowColor'],
    sunColor: vantaData['vantaCloudsSunColor'],
    sunGlareColor: vantaData['vantaCloudsSunGlareColor'],
    sunlightColor: vantaData['vantaCloudsSunlightColor'],
    speed: Number(vantaData['vantaCloudsSpeed']),
});