'use strict';

/* 敵オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var VectorBaseObject = require('./vector_base');

// constructor
var Enemy = function(id, scene) {
	// 継承元new呼び出し
	VectorBaseObject.apply(this, arguments);

	// 敵のスプライト上の位置
	this.indexX = 0; this.indexY = 0; //TODO:
};

// 基底クラスを継承
_.extend(Enemy.prototype, VectorBaseObject.prototype);
_.extend(Enemy, VectorBaseObject);

// 敵のスプライトサイズ
Enemy.prototype.WIDTH = 32 ;
Enemy.prototype.HEIGHT = 32 ;

// 敵画像
Enemy.prototype.IMAGE_KEY = 'enemy';

Enemy.prototype.ANIMATION_SPAN = 5;

// 初期化
Enemy.prototype.init = function(params) {
	// ベクトルを設定
	VectorBaseObject.prototype.init.apply(this, arguments);

	// 敵の初期位置
	this.x = params.x || 0;
	this.y = params.y || 0;

	// 敵の体力
	this.vital = params.vital;

	// 敵の撃つ弾の設定
	this.shots = params.s;
	// どの弾を撃つ設定を適用するか
	this.shotCountIndex = 0;
};

// フレーム処理
Enemy.prototype.run = function(){
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);

	// 弾を撃つ
	this.shot();

	// Nフレーム毎に敵をアニメーション
	if(this.frame_count % this.ANIMATION_SPAN === 0) {
		this.indexX++;
		if(this.indexX > 2) {
			this.indexX = 0;
		}
	}

};

// 弾を撃つ
Enemy.prototype.shot = function(){
	if(!this.shots) {
		return;
	}

	if(this.shots.shotCount[ this.shotCountIndex ] &&
	   this.shots.shotCount[ this.shotCountIndex ] <= this.frame_count) {
		this.shotCountIndex++;

		this.stage.bulletmanager.create(this);
		this.game.playSound('shot');
	}
};


module.exports = Enemy;
