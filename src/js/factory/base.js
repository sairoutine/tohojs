'use strict';

/* オブジェクトの生成をする基底クラス */

// lodash
var _ = require('lodash');

// constructor
var BaseFactory = function(manager) {
	// ステージシーン
	this.stage = manager.stage;

	// 生成したオブジェクト
	this.pool = [];

	// オブジェクトに付与する一意なID(連番)
	this.incremental_id = 0;
};

// オブジェクトを生成
BaseFactory.prototype.get = function(params) {
	console.error('get method must be overridden');
};

// オブジェクトを削除
BaseFactory.prototype.free = function(id) {
	console.error('get method must be overridden');
};

module.exports = BaseFactory;
