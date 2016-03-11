'use strict';

/* アイテムオブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var VectorBase = require('./vector_base');

// constructor
var Item = function(id, scene) {
	// 継承元new呼び出し
	VectorBase.apply(this, arguments);

	// スプライトの開始位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
_.extend(Item.prototype, VectorBase.prototype);
_.extend(Item, VectorBase);

// 当たり判定サイズ
Item.prototype.collisionWidth  = function() { return 50; };
Item.prototype.collisionHeight = function() { return 50; };

// スプライトの開始位置
Item.prototype.spriteX = function() { return this.indexX; };
Item.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Item.prototype.spriteImage = function() { return 'item'; };

// スプライトのサイズ
Item.prototype.spriteWidth  = function() { return 12; };
Item.prototype.spriteHeight = function() { return 12; };

// 初期化
Item.prototype.init = function(enemy) {
	// ベクトルを設定
	VectorBase.prototype.init.apply(this, [
		{
			'v': { 'r': 4, 'theta': 270, 'w': 0, 'ra':-0.1, 'wa': 0 }
		}
	]);

	// アイテムの初期位置は敵の位置
	this.x = enemy.x;
	this.y = enemy.y;

	if(enemy.powerItem) {
		this.powerItem = true;

		// 弾のスプライト上の位置
		this.indexX = 0; this.indexY = 0;
	}
	else if(enemy.scoreItem) {
		this.scoreItem = true;

		// 弾のスプライト上の位置
		this.indexX = 1; this.indexY = 0;
	}

};

// フレーム処理
Item.prototype.run = function(){
	VectorBase.prototype.run.apply(this, arguments);
};

// 衝突した時
Item.prototype.notifyCollision = function(obj) {
	// 獲得したアイテムを消す
	this.stage.itemmanager.remove(this.id);

	// グレイズSEの再生
	this.game.playSound('graze');

	// TODO: スコアアイテムとパワーアップアイテムで処理を分ける
	this.stage.score += 1000;
};

module.exports = Item;
