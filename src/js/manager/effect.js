'use strict';

/* エフェクト(被弾時など)を管理するクラス */

// lodash
var _ = require('lodash');

var EffectFactory = require('../factory/effect');
// 基底クラス
var BaseManager = require('./base');

// constructor
var EffectManager = function(scene) {
	// 継承元new呼び出し
	BaseManager.apply(this, arguments);

	// 弾生成クラス
	this.factory = new EffectFactory(this);
};

// 基底クラスを継承
_.extend(EffectManager.prototype, BaseManager.prototype);
_.extend(EffectManager, BaseManager);

// 初期化
EffectManager.prototype.init = function() {
	BaseManager.prototype.init.apply(this, arguments);
};

EffectManager.prototype.create = function(obj) {
	BaseManager.prototype.create.apply(this, arguments);
};

EffectManager.prototype.remove = function(id) {
	BaseManager.prototype.remove.apply(this, arguments);
};

// フレーム処理
EffectManager.prototype.run = function(){
	BaseManager.prototype.run.apply(this, arguments);
};

// 画面更新
EffectManager.prototype.updateDisplay = function(){
	BaseManager.prototype.updateDisplay.apply(this, arguments);
};

module.exports = EffectManager;
