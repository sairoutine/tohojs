'use strict';

/* 自機オブジェクト */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseObject = require('./base');

var Enemy = require('./enemy');
var Bullet = require('./bullet');

// constructor
var Character = function(id, scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
_.extend(Character.prototype, BaseObject.prototype);
_.extend(Character, BaseObject);

// 自機のスプライトサイズ
Character.prototype.WIDTH  = 32;
Character.prototype.HEIGHT = 48;

// 霊夢画像
Character.prototype.IMAGE_KEY = 'reimu';

// 自機の移動速度
Character.prototype.SPEED = 4;

// Nフレーム毎に自機をアニメーション
Character.prototype.ANIMATION_SPAN = 2;

// 死亡時の無敵時間
Character.prototype.UNHITTABLE_COUNT = 100;


// 初期化
Character.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 自機の初期位置
	this.x = (this.stage.width / 2);
	this.y = ( this.stage.height - 100);

	// 初期ライフ3
	this.life = 3;

	// ステージ開始直後は無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = 0;
};

// TODO: init に混ぜたい
// 自機を死亡
Character.prototype.die = function() {
	// 自機の初期位置に戻す
	this.x = (this.stage.width / 2);
	this.y = ( this.stage.height - 100);

	// 自機を減らす
	this.life -= 1;

	// 無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = this.frame_count;
};

// フレーム処理
Character.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(this.game.BUTTON_Z)) {
		// 5フレーム置きにショットを生成 TODO:
		if(this.frame_count % 5 === 0) {
			this.stage.shotmanager.create();
			this.game.playSound('shot');
		}
	}

	// 自機移動
	if(this.game.isKeyDown(this.game.BUTTON_LEFT)) {
		this.x -= this.SPEED;
	}
	if(this.game.isKeyDown(this.game.BUTTON_RIGHT)) {
		this.x += this.SPEED;
	}
	if(this.game.isKeyDown(this.game.BUTTON_DOWN)) {
		this.y += this.SPEED;
	}
	if(this.game.isKeyDown(this.game.BUTTON_UP)) {
		this.y -= this.SPEED;
	}

	// 画面外に出させない
	if(this.x < 0) {
		this.x = 0;
	}
	if(this.x > this.stage.width) {
		this.x = this.stage.width;
	}
	if(this.y < 0) {
		this.y = 0;
	}
	if(this.y > this.stage.height) {
		this.y = this.stage.height;
	}


	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.game.isKeyDown(this.game.BUTTON_LEFT) && !this.game.isKeyDown(this.game.BUTTON_RIGHT)) {
		// 左移動中
		this.indexY = 1;
	}
	else if(this.game.isKeyDown(this.game.BUTTON_RIGHT) && !this.game.isKeyDown(this.game.BUTTON_LEFT)) {
		// 右移動中
		this.indexY = 2;
	}
	else {
		// 左右には未移動
		this.indexY = 0;
	}

	// 自機が無敵状態なら無敵切れか判定
	if(this.is_unhittable && this.unhittable_count + this.UNHITTABLE_COUNT < this.frame_count) {
		this.is_unhittable = false;
	}

	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % this.ANIMATION_SPAN === 0) {
		// 次のスプライトに
		this.indexX++;

		// 自機が未移動状態かつスプライトを全て表示しきったら
		if(this.indexY === 0 && this.indexX > 7) {
			// 最初のスプライトに戻る
			this.indexX = 0 ;
		}
		// 自機が移動状態かつスプライトを全て表示しきったら
		else if((this.indexY === 1 || this.indexY === 2) && this.indexX > 7) {
			// 移動中を除く最初のスプライトに戻る
			this.indexX = 4 ;
		}
	}
};

// 自機を描画
Character.prototype.updateDisplay = function(){
	// 無敵状態ならば半透明に
	if (this.is_unhittable) {
		this.game.surface.globalAlpha = 0.7;
	}

	// 描画
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	if (this.is_unhittable) {
		this.game.surface.globalAlpha = 1.0;
	}
};


// 衝突判定
Character.prototype.checkCollision = function(obj) {
	// 無敵中なら衝突しない
	if(this.is_unhittable) {
		return false;
	}

	return BaseObject.prototype.checkCollision.apply(this, arguments);
};

// 衝突した時
Character.prototype.notifyCollision = function(obj) {
	// 敵もしくは敵弾にぶつかったら
	if(obj instanceof Bullet || obj instanceof Enemy) {
		// 死亡音再生
		this.game.playSound('dead');

		//TODO: 自機死亡エフェクト生成

		// 自機を死亡
		this.die();

		// 残機がなくなればゲームオーバー画面表示
		if(this.life === 0) {
			this.stage.notifyCharacterDead();
		}
	}
};

module.exports = Character;
