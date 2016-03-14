'use strict';

/* エフェクトを生成するクラス */

// lodash
var _ = require('lodash');

var Effect = require('../object/effect');

// 基底クラス
var BaseFactory = require('./base');

// constructor
var EffectFactory = function(manager) {
	// 継承元new呼び出し
	BaseFactory.apply(this, arguments);
};

// 基底クラスを継承
_.extend(EffectFactory.prototype, BaseFactory.prototype);
_.extend(EffectFactory, BaseFactory);

EffectFactory.prototype.get = function(obj) {
	this.incremental_id++;

	var effect = new Effect(this.incremental_id, this.stage);
	// 初期化
	effect.init(obj);

	return effect;
};

EffectFactory.prototype.free = function(id) {

};

module.exports = EffectFactory;
