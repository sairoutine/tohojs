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

	//TODO:
	this.preCanvas = [];
};

// 基底クラスを継承
_.extend(Effect.prototype, BaseObject.prototype);
_.extend(Effect, BaseObject);

// 初期化
Effect.prototype.init = function(obj) {
	// エフェクトの位置は敵のいた位置
	this.x = obj.x;
	this.y = obj.y;
};

// フレーム処理
Effect.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	if(this.end_count < this.frame_count) {
		this.stage.effectmanager.remove(this.id);
	}
};

// 描画
Effect.prototype.updateDisplay = function() {
	// TODO:
	this.width = 32;
	this.end_count = 10;

	var x = Math.round(this.x);
	var y = Math.round(this.y);
	var r = Math.round(this.width * this.frame_count * 0.1);

	if(this.preCanvas[this.frame_count] === undefined) {
		var cvs = document.createElement('canvas');
		cvs.width = r*2 + 4;
		cvs.height = r*2 + 4;
		var ctx = cvs.getContext('2d');

		ctx.beginPath();
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.globalAlpha = (this.end_count - this.frame_count + 1) * 0.05;
		ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.strokeStyle = 'rgb(255, 255, 255)';
		ctx.globalAlpha = (this.end_count - this.frame_count + 1) * 0.1;
		ctx.lineWidth = 3;
		ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
		ctx.stroke();

		this.preCanvas[this.frame_count] = cvs;
	}
	this.game.surface.drawImage(this.preCanvas[this.frame_count], x-r-2, y-r-2);

};

module.exports = Effect;
