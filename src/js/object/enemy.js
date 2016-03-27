'use strict';

/* 敵オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Shot = require('./shot');

// constructor
var Enemy = function(id, scene) {
	// 継承元new呼び出し
	VectorBaseObject.apply(this, arguments);

	// 敵のスプライト上の位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
_.extend(Enemy.prototype, VectorBaseObject.prototype);
_.extend(Enemy, VectorBaseObject);

// Nフレーム毎に自機をアニメーション
Enemy.prototype.ANIMATION_SPAN = 5;

// 当たり判定サイズ
Enemy.prototype.collisionWidth  = function() { return this.spriteWidth();  };
Enemy.prototype.collisionHeight = function() { return this.spriteHeight(); };

// スプライトの開始位置
Enemy.prototype.spriteX = function() { return this.indexX; };
Enemy.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Enemy.prototype.spriteImage = function() { return 'enemy'; };

// スプライトのサイズ
Enemy.prototype.spriteWidth  = function() { return 32; };
Enemy.prototype.spriteHeight = function() { return 32; };

// 初期化
Enemy.prototype.init = function(params) {
	// ベクトルを設定
	VectorBaseObject.prototype.init.apply(this, arguments);

	// 敵の初期位置
	this.x = params.x || 0;
	this.y = params.y || 0;

	// 敵の体力
	this.vital = params.vital;

	// 撃破された時にパワーアップアイテムを生成するかどうか
	this.powerItem = params.powerItem;

	// 撃破された時にスコア獲得アイテムを生成するかどうか
	this.scoreItem = params.scoreItem;

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

// 衝突した時
Enemy.prototype.notifyCollision = function(obj) {
	// 自機弾と衝突
	if(obj instanceof Shot) {
		// 自分を消す
		this.stage.enemymanager.remove(this.id);

		// SEの再生
		this.game.playSound('enemy_vanish');

		// スコアの加算
		this.stage.score += 100;

		// 死亡エフェクト再生
		this.stage.effectmanager.create(this);

		// ポイントアイテムの生成
		if(this.powerItem || this.scoreItem) {
			this.stage.itemmanager.create(this);
		}
	}
};

module.exports = Enemy;
