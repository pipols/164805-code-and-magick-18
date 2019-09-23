'use strict';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_GAP = 10;
var CLOUD_FONT = '16px PT Mono';
var COLOR_FONT = 'rgb(0, 0, 0)';
var FONT_LINE_HEIGHT = 20;

var CLOUD = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  COLOR: 'rgb(255, 255, 255)'
};

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var COLUMN = {
  MAX_HEIGHT: 150,
  WIDTH: 40,
  GAP: 50,
  COLOR_PLAYER: 'rgba(255, 0, 0, 1)',
  colorAnotherPlayer: function () {
    return 'hsla(240, ' + randomInteger(0, 100) + '%' + ', 50%, 1)';
  }
};

var MESSAGE = {
  WIN: 'Ура вы победили!\nСписок результатов:'
};

window.renderStatistics = function (ctx, names, times) {
  var normalizedTime = times.map(Math.floor);
  var maxColumn = Math.max.apply('tro-lo-lo', normalizedTime);
  var pixelWeight = maxColumn / COLUMN.MAX_HEIGHT;

  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD.X + SHADOW_GAP, CLOUD.Y + SHADOW_GAP, CLOUD.WIDTH, CLOUD.HEIGHT);

  ctx.fillStyle = CLOUD.COLOR;
  ctx.fillRect(CLOUD.X, CLOUD.Y, CLOUD.WIDTH, CLOUD.HEIGHT);

  ctx.fillStyle = COLOR_FONT;
  ctx.font = CLOUD_FONT;

  MESSAGE.WIN.split('\n').forEach(function (text, i) {
    ctx.fillText(text, CLOUD.X + 40, CLOUD.Y + FONT_LINE_HEIGHT + (FONT_LINE_HEIGHT * i));
  });

  names.forEach(function (name, i) {
    ctx.fillStyle = COLOR_FONT;
    ctx.fillText(name, CLOUD.X + COLUMN.GAP + ((COLUMN.GAP + COLUMN.WIDTH) * i), CLOUD.HEIGHT - FONT_LINE_HEIGHT);

    ctx.fillStyle = name === 'Вы' ? COLUMN.COLOR_PLAYER : COLUMN.colorAnotherPlayer();

    ctx.fillRect(
        CLOUD.X + COLUMN.GAP + ((COLUMN.GAP + COLUMN.WIDTH) * i),
        CLOUD.HEIGHT - (normalizedTime[i] / pixelWeight) - COLUMN.GAP,
        COLUMN.WIDTH,
        normalizedTime[i] / pixelWeight
    );
  });
};
