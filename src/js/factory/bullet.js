'use strict';

/* 自機の弾を生成するクラス */

// lodash
var _ = require('lodash');

// 自機弾クラス
var Bullet = require('../object/bullet');

// 基底クラス
var BaseFactory = require('./base');

// constructor
var BulletFactory = function(manager) {
	// 継承元new呼び出し
	BaseFactory.apply(this, arguments);
};

// 基底クラスを継承
_.extend(BulletFactory.prototype, BaseFactory.prototype);
_.extend(BulletFactory, BaseFactory);

// 弾を生成
BulletFactory.prototype.get = function(enemy, params) {
	this.incremental_id++;
	var bullet = new Bullet(this.incremental_id, this.stage);
	// 初期化
	bullet.init(enemy, params);

	return bullet;
};

// 弾を削除
BulletFactory.prototype.free = function(id) {

};

module.exports = BulletFactory;
