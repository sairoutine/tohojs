'use strict';

/* 敵オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var Enemy = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 敵のスプライト上の位置
	this.indexX = 0; this.indexY = 0; //TODO:
};

// 基底クラスを継承
_.extend(Enemy.prototype, BaseObject.prototype);
_.extend(Enemy, BaseObject);

// 敵のスプライトサイズ
Enemy.prototype.WIDTH = 32 ;
Enemy.prototype.HEIGHT = 32 ;

// 敵画像
Enemy.prototype.IMAGE_KEY = 'enemy';

Enemy.prototype.ANIMATION_SPAN = 5;

// 初期化
Enemy.prototype.init = function(params) {
	BaseObject.prototype.init.apply(this, arguments);

	// 敵の初期位置
	this.x = params.x || 0;
	this.y = params.y || 0;

	// 敵の体力
	this.vital = params.vital;

	// 敵の動き(ベクトル)
	this.vectors = [];

	// どの動きを適用してるか
	this.vector_index = 0;

	// 敵設定に動きが複数設定されている場合
	if(params.v && params.v instanceof Array) {
		for( var i = 0; i < params.v.length; i++ ) {
			var vector = {};

			// どのフレームからこの動きを適用するか
			vector.count = params.v[i].count;

			// ベクトルの大きさ(速度)
			vector.r = params.v[i].v.r;

			// ベクトルの角度(方向)
			vector.theta = params.v[i].v.theta || 90;

			this.vectors.push(vector);
		}
	}
	// 敵設定に動きが一つ設定されている場合
	else if (params.v) {
		var vector = {};

		// どのフレームからこの動きを適用するか
		vector.count = 0;

		// ベクトルの大きさ(速度)
		vector.r = params.v.r;

		// ベクトルの角度(方向)
		vector.theta = params.v.theta || 90;

		this.vectors.push(vector) ;
	}
};

// フレーム処理
Enemy.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 次の動き変更するか
	if(this.vectors[this.vector_index + 1] &&
	   this.vectors[this.vector_index + 1].count <= this.frame_count) {
		this.vector_index++;
	}

	// 敵を動かす
	this.x += Math.floor(this.calc_moveX());
	this.y += Math.floor(this.calc_moveY());

	// Nフレーム毎に敵をアニメーション
	if(this.frame_count % this.ANIMATION_SPAN === 0) {
		this.indexX++;
		if(this.indexX > 2) {
			this.indexX = 0;
		}
	}

};

Enemy.prototype._getRadian = function(){
	var radian = this.vectors[this.vector_index].theta / 180 * Math.PI;
	return radian;
};


Enemy.prototype.calc_moveX = function() {
	var move_x = this.vectors[this.vector_index].r * Math.cos(this._getRadian());
	return move_x;
};


Enemy.prototype.calc_moveY = function() {
	var move_y = this.vectors[this.vector_index].r * Math.sin(this._getRadian());
	return move_y;
} ;

module.exports = Enemy;
