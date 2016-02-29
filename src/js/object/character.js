'use strict';

/* 自機オブジェクト */

// lodash
var _ = require('lodash');

// constructor
var Character = function(scene) {
	// 継承元new呼び出し
	//BaseObject.apply(this, arguments);

	// StageScene インスタンス
	this.scene = scene;
	// Game インスタンス
	this.game = scene.game;

	// x座標
	this.x = 0;
	// y座標
	this.y = 0;
	// スプライトの開始位置
	this.indexX = 0;
	// スプライトの開始位置
	this.indexY = 0;
};

// 基底クラスを継承
//_.extend(Character.prototype, BaseObject.prototype);
//_.extend(Character, BaseObject);

Character.prototype.WIDTH  = 32;
Character.prototype.HEIGHT = 48;



// 初期化
Character.prototype.init = function() {
	//BaseObject.prototype.init.apply(this, arguments);

	this.x = (this.scene.width / 2);
	this.y = ( this.scene.height - 100);
};

// フレーム処理
Character.prototype.run = function(){
	//BaseObject.prototype.run.apply(this, arguments);
};

// 画面更新
Character.prototype.updateDisplay = function(){
	var character_image = this.game.getImage('reimu');

	this.game.surface.drawImage(character_image,
		// スプライトの位置
		this.WIDTH  * this.indexX, this.HEIGHT * this.indexY,
		// スプライトのサイズ
		this.WIDTH,                this.HEIGHT,
		// アイテムのゲーム上の位置
		this.x,                    this.y,
		// アイテムのゲーム上のサイズ
		this.WIDTH,                this.HEIGHT
	);
};

module.exports = Character;
