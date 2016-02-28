'use strict';

/* ゲームステージ画面 */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseScene = require('./base');

// constructor
var StageScene = function(game) {
	// 継承元new呼び出し
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
_.extend(StageScene.prototype, BaseScene.prototype);
_.extend(StageScene, BaseScene);

StageScene.prototype.SIDE_WIDTH = 160;


// 初期化
StageScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.game.playBGM('stage1');

};

// フレーム処理
StageScene.prototype.run = function(){
};

// 画面更新
StageScene.prototype.updateDisplay = function(){
	var side_x = this.game.width - this.SIDE_WIDTH;

	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	this.game.surface.save();
	this.game.surface.fillStyle = 'rgb(0, 0, 0)' ;
	this.game.surface.fillRect(side_x, 0, this.SIDE_WIDTH, this.game.height);
	this.game.surface.fillStyle = 'rgb(255, 255, 255)';

  /*
  surface.textAlign = 'right';
  surface.fillText('Score:', this.getWidth() + 70,  100);
  surface.fillText(this.viewScore, this.getWidth() + 140, 100);
  surface.fillText('Power:', this.getWidth() + 70, 120);
  surface.fillText(this.fighter.getPower(), this.getWidth() + 140, 120);
  surface.fillText('Graze:', this.getWidth() + 70, 140);
  surface.fillText(this.graze, this.getWidth() + 140, 140);
  surface.fillText('Players:', this.getWidth() + 70, 160);
  surface.fillText(this.players, this.getWidth() + 140, 160);
  surface.fillText('Bomb:', this.getWidth() + 70, 180);
  surface.fillText(this.bombs, this.getWidth() + 140, 180);

  surface.fillText(this.count, this.getWidth() + 80, 230);
  surface.fillText(this.bulletManager.getNum(), this.getWidth() + 80, 250);
  surface.fillText(this.enemyManager.getNum(), this.getWidth() + 80, 270);
  surface.fillText(this.enemyBulletManager.getNum(), this.getWidth() + 80, 290);
  surface.fillText(this.itemManager.getNum(), this.getWidth() + 80, 310);

  surface.fillText(parseInt(this.bgScale*1000), this.getWidth() + 140, 230);
  surface.fillText(this.effectManager.getNum(), this.getWidth() + 140, 250);
  */
	this.game.surface.restore();
};


module.exports = StageScene;
