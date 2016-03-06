'use strict';

/* ベクトルを使って動くオブジェクトの基底クラス */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

// constructor
var VectorBase = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
_.extend(VectorBase.prototype, BaseObject.prototype);
_.extend(VectorBase, BaseObject);

// 初期化
VectorBase.prototype.init = function(params) {
	BaseObject.prototype.init.apply(this, arguments);

	// 敵の動き(ベクトル)
	this.vectors = [];

	// どの動きを適用してるか
	this.vector_index = 0;

	var vector;
	// 敵設定に動きが複数設定されている場合
	if(params.v && params.v instanceof Array) {
		for( var i = 0; i < params.v.length; i++ ) {
			vector = {};

			// どのフレームからこの動きを適用するか
			vector.count = params.v[i].count;

			// ベクトルの大きさ(速度)
			vector.r = params.v[i].v.r;

			// ベクトルの角度(方向)
			vector.theta = params.v[i].v.theta || 90;

			// 加速度
			vector.w = params.v[i].v.w || 0;

			// 角度の加速度
			vector.ra = params.v[i].v.ra || 0;

			// 加速度の加速度
			vector.wa = params.v[i].v.wa || 0;

			// 角度の加速度の加速度
			vector.raa = params.v[i].v.raa || 0;

			// 加速度の加速度の加速度
			vector.waa = params.v[i].v.waa || 0;

			// 速度の最大値
			vector.trange = params.v[i].v.trange || null;

			// 角度の最大値
			vector.rrange = params.v[i].v.rrange || null;

			// 速度の加速度の最大値
			vector.wrange = params.v[i].v.wrange || null;

			// 角度の加速度の最大値
			vector.rarange = params.v[i].v.rarange || null;

			// 速度の加速度の加速度の最大値
			vector.warange = params.v[i].v.warange || null;

			this.vectors.push(vector);
		}
	}
	// 敵設定に動きが一つ設定されている場合
	else if (params.v) {
		vector = {};

		// どのフレームからこの動きを適用するか
		vector.count = 0;

		// ベクトルの大きさ(速度)
		vector.r = params.v.r;

		// ベクトルの角度(方向)
		vector.theta = params.v.theta || 90;

		// 加速度
		vector.w = params.v.w || 0;

		// 角度の加速度
		vector.ra = params.v.ra || 0;

		// 加速度の加速度
		vector.wa = params.v.wa || 0;

		// 角度の加速度の加速度
		vector.raa = params.v.raa || 0;

		// 加速度の加速度の加速度
		vector.waa = params.v.waa || 0;

		// 速度の最大値
		vector.trange = params.v.trange || null;

		// 角度の最大値
		vector.rrange = params.v.rrange || null;

		// 速度の加速度の最大値
		vector.wrange = params.v.wrange || null;

		// 角度の加速度の最大値
		vector.rarange = params.v.rarange || null;

		// 速度の加速度の加速度の最大値
		vector.warange = params.v.warange || null;

		this.vectors.push(vector) ;
	}
};

// フレーム処理
VectorBase.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 次の動きに変更するか
	if(this.vectors[this.vector_index + 1] &&
	   this.vectors[this.vector_index + 1].count <= this.frame_count) {
		this.vector_index++;
	}

	// 敵を動かす
	this.x += this.calc_moveX();
	this.y += this.calc_moveY();

	// 加速度を追加
	this.vectors[this.vector_index].theta += this.vectors[this.vector_index].w;
	this.vectors[this.vector_index].r     += this.vectors[this.vector_index].ra;
	this.vectors[this.vector_index].w     += this.vectors[this.vector_index].wa;
	this.vectors[this.vector_index].ra    += this.vectors[this.vector_index].raa;
	this.vectors[this.vector_index].wa    += this.vectors[this.vector_index].waa;

	// 最大値を超えないようにする
	this.vectors[this.vector_index].theta = this._beInRange( this.vectors[this.vector_index].theta, this.vectors[this.vector_index].trange);
	this.vectors[this.vector_index].r     = this._beInRange( this.vectors[this.vector_index].r,     this.vectors[this.vector_index].rrange);
	this.vectors[this.vector_index].w     = this._beInRange( this.vectors[this.vector_index].w,     this.vectors[this.vector_index].wrange);
	this.vectors[this.vector_index].ra    = this._beInRange( this.vectors[this.vector_index].ra,    this.vectors[this.vector_index].rarange);
	this.vectors[this.vector_index].wa    = this._beInRange( this.vectors[this.vector_index].wa,    this.vectors[this.vector_index].warange);

};

VectorBase.prototype._beInRange = function(value, range) {
	if(range === null) {
		return value;
	}

	if(range.max !== void 0 && value > range.max) {
		value = range.max;
	}

	if(range.min !== void 0 && value < range.min) {
		value = range.min;
	}
	return value;
};


VectorBase.prototype._getRadian = function(){
	var radian = this.vectors[this.vector_index].theta / 180 * Math.PI;
	return radian;
};


// X軸の移動を計算
VectorBase.prototype.calc_moveX = function() {
	var move_x = this.vectors[this.vector_index].r * Math.cos(this._getRadian());
	return move_x;
};

// Y軸の移動を計算
VectorBase.prototype.calc_moveY = function() {
	var move_y = this.vectors[this.vector_index].r * Math.sin(this._getRadian());
	return move_y;
} ;

module.exports = VectorBase;
