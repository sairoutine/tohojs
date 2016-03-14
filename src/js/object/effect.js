'use strict';

/* エフェクトオブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var Effect = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
_.extend(Effect.prototype, BaseObject.prototype);
_.extend(Effect, BaseObject);

// 初期化
Effect.prototype.init = function(obj) {
	// アイテムの初期位置は敵の位置
	this.x = obj.x;
	this.y = obj.y;
};

// フレーム処理
Effect.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);
};

// 描画
Effect.prototype.updateDisplay = function() {

};

module.exports = Effect;
