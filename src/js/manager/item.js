'use strict';

/* アイテムを管理するクラス */

// lodash
var _ = require('lodash');

// アイテムを生成するクラス
var ItemFactory = require('../factory/item');
// 基底クラス
var BaseManager = require('./base');

// constructor
var ItemManager = function(scene) {
	// 継承元new呼び出し
	BaseManager.apply(this, arguments);

	// 弾生成クラス
	this.factory = new ItemFactory(this);
};

// 基底クラスを継承
_.extend(ItemManager.prototype, BaseManager.prototype);
_.extend(ItemManager, BaseManager);

// 初期化
ItemManager.prototype.init = function() {
	BaseManager.prototype.init.apply(this, arguments);
};

// アイテム生成
ItemManager.prototype.create = function(enemy) {
	BaseManager.prototype.create.apply(this, arguments);
};

// アイテムを全て自機に吸引
ItemManager.prototype.homingAll = function(character) {
	// アイテムを全て
	for(var id in this.objects) {
		// ターゲットを自分に
		this.objects[id].setTarget(character);
	}
} ;

// 弾削除
ItemManager.prototype.remove = function(id) {
	BaseManager.prototype.remove.apply(this, arguments);
};

// フレーム処理
ItemManager.prototype.run = function(){
	BaseManager.prototype.run.apply(this, arguments);
};

// 画面更新
ItemManager.prototype.updateDisplay = function(){
	BaseManager.prototype.updateDisplay.apply(this, arguments);
};

// 自機との衝突判定
ItemManager.prototype.checkCollisionWithCharacter = function(character) {
	// 衝突判定
	for(var id in this.objects) {
		if(this.objects[id].checkCollision(character)) {
			var item = this.objects[id];

			// アイテムに衝突を通知
			item.notifyCollision(character);
			// 自機に衝突を通知
			character.notifyCollision(item);

			break;
		}
	}
};



module.exports = ItemManager;
