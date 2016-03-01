'use strict';

/* 自機弾オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var Shot = function(scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 弾を一意に特定するID
	this.id = 1; // TODO:

	console.log('shot is made');
};

// 基底クラスを継承
_.extend(Shot.prototype, BaseObject.prototype);
_.extend(Shot, BaseObject);

// 自機のスプライトサイズ
Shot.prototype.WIDTH  = 32;
Shot.prototype.HEIGHT = 48;

// 自機の移動速度
Shot.prototype.SPEED = 4;

// Nフレーム毎に自機をアニメーション
Shot.prototype.ANIMATION_SPAN = 2;


// 初期化
Shot.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);
};

// フレーム処理
Shot.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

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
Shot.prototype.updateDisplay = function(){
	// スプライトの描画開始座標
	var sprite_x = Math.round(this.x - this.WIDTH / 2);
	var sprite_y = Math.round(this.y - this.HEIGHT / 2);

	var character_image = this.game.getImage('reimu');

	this.game.surface.save();
	// 自機描画
	this.game.surface.drawImage(character_image,
		// スプライトの取得位置
		this.WIDTH  * this.indexX, this.HEIGHT * this.indexY,
		// スプライトのサイズ
		this.WIDTH,                this.HEIGHT,
		// 自機のゲーム上の位置
		sprite_x,                  sprite_y,
		// 自機のゲーム上のサイズ
		this.WIDTH,                this.HEIGHT
	);

	this.game.surface.restore();
};

module.exports = Shot;
