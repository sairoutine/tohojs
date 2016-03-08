'use strict';

/* アイテムを生成するクラス */

// lodash
var _ = require('lodash');

// アイテムクラス
var Item = require('../object/item');

// 基底クラス
var BaseFactory = require('./base');

// constructor
var ItemFactory = function(manager) {
	// 継承元new呼び出し
	BaseFactory.apply(this, arguments);
};

// 基底クラスを継承
_.extend(ItemFactory.prototype, BaseFactory.prototype);
_.extend(ItemFactory, BaseFactory);

// アイテムを生成
ItemFactory.prototype.get = function(enemy) {
	this.incremental_id++;

	var item = new Item(this.incremental_id, this.stage);
	// 初期化
	item.init(enemy);

	return item;
};

// アイテムを削除
ItemFactory.prototype.free = function(id) {

};

module.exports = ItemFactory;
