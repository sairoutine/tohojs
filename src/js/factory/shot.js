'use strict';

/* 自機の弾を生成するクラス */

// lodash
var _ = require('lodash');

// 自機弾クラス
var Shot = require('../object/shot');

// 基底クラス
var BaseFactory = require('./base');

// constructor
var ShotFactory = function(manager) {
	// 継承元new呼び出し
	BaseFactory.apply(this, arguments);
};

// 基底クラスを継承
_.extend(ShotFactory.prototype, BaseFactory.prototype);
_.extend(ShotFactory, BaseFactory);

// 弾を生成
ShotFactory.prototype.get = function() {
	this.incremental_id++;

	var shot = new Shot(this.incremental_id, this.stage);
	// 初期化
	shot.init();

	return shot;
};

// 弾を削除
ShotFactory.prototype.free = function(id) {

};

module.exports = ShotFactory;
