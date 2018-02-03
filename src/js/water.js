import * as PIXI from 'pixi.js/dist/pixi';

import {
  ShockwaveFilter,
  TwistFilter
} from 'pixi-filters';

//import 'pixi-filters';

import {
  TimelineMax
} from 'gsap';

var app = new PIXI.Application(window.innerWidth, window.innerWidth, {
  backgroundColor: 0x000000
});
document.body.appendChild(app.view);

let container = new PIXI.Container();
let textContainer = new PIXI.Container();
let bgContainer = new PIXI.Container();

app.stage.addChild(container);
container.addChild(bgContainer);
container.addChild(textContainer);

var bg = PIXI.Sprite.fromImage('img/bg.jpg');

bg.width = 1280;
bg.height = 853;
bg.position.x = 0;
bg.position.y = 0;

bgContainer.addChild(bg);

var basicText = new PIXI.Text('Basic text in pixi', {
  fontFamily: 'Arial Narrow',
  fontSize: 126,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: '#ffffff',
  wordWrap: true,
  wordWrapWidth: 440
});

basicText.x = -400;
basicText.y = 90;
basicText.alpha = 0;

textContainer.addChild(basicText);


var displacementSprite = PIXI.Sprite.fromImage('img/displacement.png');
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

app.stage.addChild(displacementSprite);

displacementFilter.scale.x = 200;
displacementFilter.scale.y = 300;

textContainer.filters = [displacementFilter];

let shock = new ShockwaveFilter();

shock.center = [window.innerWidth / 2, window.innerHeight / 2];

let twist = new TwistFilter();

twist.angle = 0;
twist.radius = 0;

twist.offset.x = window.innerWidth / 2;
twist.offset.y = window.innerHeight / 2;

container.filters = [shock, twist];

// Listen for animate update
app.ticker.add(function(delta) {
  app.renderer.render(container);
});

let tl = new TimelineMax();

tl
  .to(shock, 2, {
    time: 1
  })
  .to(shock, 2, {
    time: 0
  })
  .to(displacementFilter.scale, 1, {
    x: 0.1,
    y: 0.1
  })
  .to(basicText.position, 1, {
    x: 100
  }, 0)
  .to(basicText, 1, {
    alpha: 1
  }, 0);

document.addEventListener('click', () => {
  let tl = new TimelineMax();

  tl
    .to(displacementFilter.scale, 1, {
      x: 600,
      y: 200
    })
    .to(basicText.position, 1, {
      x: 400
    }, 0)
    .to(basicText, 1, {
      alpha: 0
    }, 0)
    .to(twist, 1, {
      angle: 20,
      radius: 400
    });
});
