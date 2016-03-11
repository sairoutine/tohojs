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
			vector.theta = params.v[i].v.theta || 0;

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

			// 自機狙いかどうか
			vector.aimed = params.v.aimed;

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
		vector.theta = params.v.theta || 0;

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

		// 自機狙いかどうか
		vector.aimed = params.v.aimed;

		this.vectors.push(vector) ;
	}

	this._calculateAimedVector();

};

// フレーム処理
VectorBase.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 次の動きに変更するか
	if(this.vectors[this.vector_index + 1] &&
	   this.vectors[this.vector_index + 1].count <= this.frame_count) {

		var pre_theta = this.vectors[this.vector_index].theta;

		// 次の動きに変更
		this.vector_index++;

		// 次の動きの角度が空なら前回の角度を引き継ぐ
		if(pre_theta && ! this.vectors[this.vector_index].theta) {
			this.vectors[this.vector_index].theta = pre_theta;
		}
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


// θ -> ラジアンに変換
VectorBase.prototype._theta_to_radian = function(theta){
	var radian = this.vectors[this.vector_index].theta / 180 * Math.PI;
	return radian;
};

// ラジアン -> θ に変換
VectorBase.prototype._radian_to_theta = function(radian) {
	return (radian * 180 / Math.PI) | 0;
};


// X軸の移動を計算
VectorBase.prototype.calc_moveX = function() {
	var vector = this.vectors[this.vector_index];

	var move_x = vector.r * Math.cos(this._theta_to_radian(vector.theta));
	return move_x;
};

// Y軸の移動を計算
VectorBase.prototype.calc_moveY = function() {
	var vector = this.vectors[this.vector_index];

	var move_y = vector.r * Math.sin(this._theta_to_radian(vector.theta));
	return move_y;
} ;

// TODO: count: 0 移行のベクトルも自機狙いするようにする
// 自機狙いにする
VectorBase.prototype._calculateAimedVector = function() {
	// 自機狙い設定がされているか確認
	if( ! this.vectors[this.vector_index].aimed){ return; }

	// 自機
	var character = this.stage.character;

	var ax = character.x - this.x;
	var ay = character.y - this.y;

	this.vectors[this.vector_index].theta = this._radian_to_theta(Math.atan2(ay, ax));
};




module.exports = VectorBase;
