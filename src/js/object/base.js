'use strict';

/* オブジェクトの基底クラス */

// lodash
var _ = require('lodash');

// constructor
var ObjectBase = function(id, scene) {
	this.frame_count = 0;

	// StageScene インスタンス
	this.stage = scene;
	// Game インスタンス
	this.game = scene.game;

	// オブジェクトを識別する一意なID
	this.id = id;

	// x座標(中心)
	this.x = 0;
	// y座標(中心)
	this.y = 0;
	// スプライトの開始位置
	this.indexX = 0;
	// スプライトの開始位置
	this.indexY = 0;

};

// 初期化
ObjectBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// フレーム処理
ObjectBase.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;
};

//TODO: this.WIDTH, this.HEIGHT, this.IMAGE_KEY を関数化してオーバーライドしないとエラーにしたい
// 画面更新
ObjectBase.prototype.updateDisplay = function(){
	// スプライトの描画開始座標
	var sprite_x = Math.round(this.x - this.WIDTH / 2);
	var sprite_y = Math.round(this.y - this.HEIGHT / 2);

	var image = this.game.getImage(this.IMAGE_KEY);
	this.game.surface.save();
	// オブジェクト描画

	this.game.surface.drawImage(image,
		// スプライトの取得位置
		this.WIDTH  * this.indexX, this.HEIGHT * this.indexY,
		// スプライトのサイズ
		this.WIDTH,                this.HEIGHT,
		// オブジェクトのゲーム上の位置
		sprite_x,                  sprite_y,
		// オブジェクトのゲーム上のサイズ
		this.WIDTH,                this.HEIGHT
	);
	this.game.surface.restore();
};


module.exports = ObjectBase;
