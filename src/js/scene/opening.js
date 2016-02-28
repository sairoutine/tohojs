'use strict';

/* オープニング画面 */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseScene = require('./base');

// constructor
var OpeningScene = function(game) {
	// 継承元new呼び出し
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
_.extend(OpeningScene.prototype, BaseScene.prototype);
_.extend(OpeningScene, BaseScene);

// 初期化
OpeningScene.prototype.init = function() {
};

// フレーム処理
OpeningScene.prototype.run = function(){
};

// 画面更新
OpeningScene.prototype.updateDisplay = function(){
};

module.exports = OpeningScene;
