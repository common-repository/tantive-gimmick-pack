/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

{
  let elmWrapDiv = document.createElement('div');
  elmWrapDiv.classList.add('wrap');
  {
    let elmDiv = document.createElement('div');
    elmDiv.id = 'particles-js';
    elmWrapDiv.appendChild(elmDiv);
  }
  let elmBody = document.getElementsByTagName('body');
  elmBody[0].appendChild(elmWrapDiv);
}

let particlesData = JSON.parse(localizeData['particles']);

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": Number(particlesData['ParticlesNumberValue']),
        "density": {
          "enable": particlesData['ParticlesNumberDensityEnable'] == 0? false:true,
          "value_area": Number(particlesData['ParticlesNumberDensityValueArea'])
        }
      },
      "color": {
        "value": particlesData['ParticlesColorValue']
      },
    "shape": {
        "type": particlesData['ParticlesShapeType'],
        "stroke": {
          "width": Number(particlesData['ParticlesShapeStrokeStrokeWidth']),
          "color": particlesData['ParticlesShapeStrokeStrokeColor']
        },
        "polygon": {
          "nb_sides": Number(particlesData['ParticlesShapePolygonPolygonNlbSides'])
        },
        "image": {
          "src": particlesData['ParticlesShapeImageImageSrc'],
          "width": Number(particlesData['ParticlesShapeImageImageWidth']),
          "height": Number(particlesData['ParticlesShapeImageImageHeight'])
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": particlesData['ParticlesOpacityAnimAnimEnable'] == 0 ? false:true,
          "speed": Number(particlesData['ParticlesOpacityAnimAnimSpeed']),
          "opacity_min": Number(particlesData['ParticlesOpacityAnimAnimOpacityMin']),
          "sync": particlesData['ParticlesOpacityAnimAnimSync'] == 0? false:true
        }
      },
      "size": {
        "value": particlesData['ParticlesSizeValue'],
        "random": particlesData['ParticlesSizeRandom'] == 0? false:true,
        "anim": {
          "enable": particlesData['ParticlesSizeAnimAnimEnable'] == 0? false:true,
          "speed": Number(particlesData['ParticlesSizeAnimAnimSpeed']),
          "size_min": Number(particlesData['ParticlesSizeAnimAnimSizeMin']),
          "sync": particlesData['ParticlesSizeAnimAnimSync'] == 0 ? false:true
        }
      },
      "line_linked": {
        "enable": particlesData['ParticlesLineLinkedEnableAuto'] == 0? false:true,
        "distance": Number(particlesData['ParticlesLineLinkedDistance']),
        "color": particlesData['ParticlesLineLinkedColor'],
        "opacity": Number(particlesData['ParticlesLineLinkedOpacity']),
        "width": Number(particlesData['ParticlesLineLinkedWidth'])
      },
      "move": {
        "enable": particlesData['ParticlesMoveEnable'] == 0? false:true,
        "speed": Number(particlesData['ParticlesMoveSpeed']),
        "direction": particlesData['ParticlesMoveDirection'],
        "random": particlesData['ParticlesMoveRandom'] == 0? false:true,
        "straight": particlesData['ParticlesMoveStraight'] ==0 ? false:true,
        "out_mode": particlesData['ParticlesMoveoutMode'],
        "attract": {
          "enable": particlesData['ParticlesMoveAttractEnable'] == 0? false:true,
          "rotateX": Number(particlesData['ParticlesMoveAttractRotateX']),
          "rotateY": Number(particlesData['ParticlesMoveAttractRotateY'])
        }
      }
    },
    "interactivity": {
      "detect_on": particlesData['InteractivityDetectOn'],
      "events": {
        "onhover": {
          "enable": particlesData['InteractivityOnhoverEnable'] == 0? false:true,
          "mode": particlesData['InteractivityOnhoverMode']
        },
        "onclick": {
          "enable": particlesData['InteractivityOnclickEnable'] == 0? false:true,
          "mode": particlesData['InteractivityOnclickMode']
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": Number(particlesData['InteractivityModesGrabDistance']),
          "line_linked": {
            "opacity": Number(particlesData['InteractivityModesGrabLineLinkedOpacity'])
          }
        },
        "bubble": {
          "distance": Number(particlesData['InteractivityModesBubbleDistance']),
          "size": Number(particlesData['InteractivityModesBubbleSize']),
          "duration": Number(particlesData['InteractivityModesBubbleDuration']),
          "opacity": Number(particlesData['InteractivityModesBubbleOpacity']),
          "speed": 3
        },
        "repulse": {
          "distance": Number(particlesData['InteractivityModesRepulseDistance'])
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": particlesData['retinaDetect'] == 0? false:true,
    "config_demo": {
      "hide_card": particlesData['pageBackgroundBackgroundHardCard'] == 0? false:true,
      "background_color": particlesData['pageBackgroundBackgroundColor'],
      "background_image": particlesData['pageBackgroundBackgroundImageUrl'],
      "background_position": particlesData['pageBackgroundBackgroundPosition'],
      "background_repeat": particlesData['pageBackgroundBackgroundRepeat'],
      "background_size": particlesData['pageBackgroundBackgroundSize']
    }
  }

);