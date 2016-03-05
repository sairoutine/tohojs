'use strict';

/* 敵を生成するクラス */

// lodash
var _ = require('lodash');

// 敵クラス
var Enemy = require('../object/enemy');

// 基底クラス
var BaseFactory = require('./base');

// constructor
var EnemyFactory = function(manager) {
	// 継承元new呼び出し
	BaseFactory.apply(this, arguments);
};

// 基底クラスを継承
_.extend(EnemyFactory.prototype, BaseFactory.prototype);
_.extend(EnemyFactory, BaseFactory);

// 敵を生成
EnemyFactory.prototype.get = function(params) {
	this.incremental_id++;

	var enemy = new Enemy(this.incremental_id, this.stage);
	// 初期化
	enemy.init(params);

	return enemy;
};

// 弾を削除
EnemyFactory.prototype.free = function(id) {

};

module.exports = EnemyFactory;
