'use strict';

/* エフェクトオブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var Effect = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
_.extend(Effect.prototype, BaseObject.prototype);
_.extend(Effect, BaseObject);

// 何フレームで消滅するか
Effect.prototype.VANISH_FRAME = 10;

// エフェクトのサイズ
Effect.prototype.spriteWidth  = function() { return 32; };
Effect.prototype.spriteHeight = function() { return 32; };


// 初期化
Effect.prototype.init = function(obj) {
	// エフェクトの位置は敵のいた位置
	this.x = obj.x;
	this.y = obj.y;
};

// フレーム処理
Effect.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 時間切れ消滅判定
	if(this.VANISH_FRAME <= this.frame_count) {
		this.stage.effectmanager.remove(this.id);
	}
};

// 描画
Effect.prototype.updateDisplay = function() {
	var x = Math.round(this.x);
	var y = Math.round(this.y);
	var r = Math.round(this.spriteWidth() * this.frame_count * 0.1);

	var cvs = document.createElement('canvas');
	cvs.width = r*2 + 4;
	cvs.height = r*2 + 4;
	var ctx = cvs.getContext('2d');

	// 円の中
	ctx.beginPath();
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.globalAlpha = (this.VANISH_FRAME - this.frame_count + 1) * 0.05;
	ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
	ctx.fill();

	// 円の外枠
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(255, 255, 255)';
	ctx.globalAlpha = (this.VANISH_FRAME - this.frame_count + 1) * 0.1;
	ctx.lineWidth = 3;
	ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
	ctx.stroke();

	this.game.surface.drawImage(cvs, x-r-2, y-r-2);
};

module.exports = Effect;
