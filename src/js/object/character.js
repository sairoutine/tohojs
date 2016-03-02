'use strict';

/* 自機オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var Character = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
_.extend(Character.prototype, BaseObject.prototype);
_.extend(Character, BaseObject);

// 自機のスプライトサイズ
Character.prototype.WIDTH  = 32;
Character.prototype.HEIGHT = 48;

// 霊夢画像
Character.prototype.IMAGE_KEY = 'reimu';

// 自機の移動速度
Character.prototype.SPEED = 4;

// Nフレーム毎に自機をアニメーション
Character.prototype.ANIMATION_SPAN = 2;


// 初期化
Character.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 自機の初期位置
	this.x = (this.stage.width / 2);
	this.y = ( this.stage.height - 100);
};

// フレーム処理
Character.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// Zが押下されていればショット生成
	if(this.stage.isKeyDown(this.stage.BUTTON_Z)) {
		// 5フレーム置きにショットを生成 TODO:
		if(this.frame_count % 5 == 0) {
			this.stage.shotmanager.create();
			this.game.playSound('shot');
		}
	}

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

	// 画面外に出させない
	if(this.x < 0) {
		this.x = 0;
	}
	if(this.x > this.stage.width) {
		this.x = this.stage.width;
	}
	if(this.y < 0) {
		this.y = 0;
	}
	if(this.y > this.stage.height) {
		this.y = this.stage.height;
	}


	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.stage.isKeyDown(this.stage.BUTTON_LEFT) && !this.stage.isKeyDown(this.stage.BUTTON_RIGHT)) {
		// 左移動中
		this.indexY = 1;
	}
	else if(this.stage.isKeyDown(this.stage.BUTTON_RIGHT) && !this.stage.isKeyDown(this.stage.BUTTON_LEFT)) {
		// 右移動中
		this.indexY = 2;
	}
	else {
		// 左右には未移動
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

module.exports = Character;
