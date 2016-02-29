'use strict';

/* 自機オブジェクト */

// lodash
var _ = require('lodash');

// constructor
var Character = function(scene) {
	// 継承元new呼び出し
	//BaseObject.apply(this, arguments);

	// StageScene インスタンス
	this.stage = scene;
	// Game インスタンス
	this.game = scene.game;

	this.frame_count = 0;
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

// 自機のスプライトサイズ
Character.prototype.WIDTH  = 32;
Character.prototype.HEIGHT = 48;

// 自機の移動速度
Character.prototype.SPEED = 4;

// Nフレーム毎に自機をアニメーション
Character.prototype.ANIMATION_SPAN = 2;


// 初期化
Character.prototype.init = function() {
	//BaseObject.prototype.init.apply(this, arguments);

	// 自機の初期位置
	this.x = (this.stage.width / 2);
	this.y = ( this.stage.height - 100);
};

// フレーム処理
Character.prototype.run = function(){
	//BaseObject.prototype.run.apply(this, arguments);
	this.frame_count++;

	// 自機移動
	if(this.stage.isKeyDown(this.stage.BUTTON_LEFT)) {
		this.x -= this.SPEED;
	}
	if(this.stage.isKeyDown(this.stage.BUTTON_RIGHT)) {
		this.x += this.SPEED;
	}
	if(this.stage.isKeyDown(this.stage.BUTTON_DOWN)) {
		this.y += this.SPEED;
	}
	if(this.stage.isKeyDown(this.stage.BUTTON_UP)) {
		this.y -= this.SPEED;
	}

	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.stage.isKeyDown(this.stage.BUTTON_LEFT)) {
		this.indexY = 1;
	}
	else if(this.stage.isKeyDown(this.stage.BUTTON_RIGHT)) {
		this.indexY = 2;
	}
	else {
		this.indexY = 0;
	}

	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % this.ANIMATION_SPAN === 0) {
		// 次のスプライトに
		this.indexX++;

		// 自機が未移動状態かつスプライトを全て表示しきったら
		if(this.indexY === 0 && this.indexX > 7) {
			// 最初のスプライトに戻る
			this.indexX = 0 ;
		}
		// 自機が移動状態かつスプライトを全て表示しきったら
		else if((this.indexY === 1 || this.indexY === 2) && this.indexX > 7) {
			// 移動中を除く最初のスプライトに戻る
			this.indexX = 4 ;
		}
	}
};

// 画面更新
Character.prototype.updateDisplay = function(){
	var character_image = this.game.getImage('reimu');

	// 自機描画
	this.game.surface.drawImage(character_image,
		// スプライトの位置
		this.WIDTH  * this.indexX, this.HEIGHT * this.indexY,
		// スプライトのサイズ
		this.WIDTH,                this.HEIGHT,
		// 自機のゲーム上の位置
		this.x,                    this.y,
		// 自機のゲーム上のサイズ
		this.WIDTH,                this.HEIGHT
	);
};

module.exports = Character;
