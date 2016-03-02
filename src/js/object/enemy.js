'use strict';

/* 敵オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var Enemy = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 敵のスプライト上の位置
	this.indexX = 0; this.indexY = 0; //TODO:
};

// 基底クラスを継承
_.extend(Enemy.prototype, BaseObject.prototype);
_.extend(Enemy, BaseObject);

// 敵のスプライトサイズ
Enemy.prototype.WIDTH = 32 ;
Enemy.prototype.HEIGHT = 32 ;

// 敵画像
Enemy.prototype.IMAGE_KEY = 'enemy';

Enemy.prototype.ANIMATION_SPAN = 5;

// 初期化
Enemy.prototype.init = function(params) {
	BaseObject.prototype.init.apply(this, arguments);

	// 敵の初期位置
	this.x = params.x;
	this.y = params.y;

	// 敵の体力
	this.vital = params.vital;

	// 敵の動き
	this.vector = params.v;
};

// フレーム処理
Enemy.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// Nフレーム毎に敵をアニメーション
	if(this.frame_count % this.ANIMATION_SPAN === 0) {
		this.indexX++;
		if(this.indexX > 2) {
			this.indexX = 0;
		}
	}

};

module.exports = Enemy;
