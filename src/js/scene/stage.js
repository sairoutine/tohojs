'use strict';

/* ゲームステージ画面 */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseScene = require('./base');

var Character = require('../object/character');
var ShotManager = require('../manager/shot');
var EnemyManager = require('../manager/enemy');
var BulletManager = require('../manager/bullet');
var ItemManager = require('../manager/item');

// constructor
var StageScene = function(game) {
	// 継承元new呼び出し
	BaseScene.apply(this, arguments);

	// スコア
	this.score = 0;
	// 自機
	this.character = new Character(1, this); //TODO:

	// 自機の弾
	this.shotmanager = new ShotManager(this);

	// 敵
	this.enemymanager = new EnemyManager(this);

	// 敵の弾
	this.bulletmanager = new BulletManager(this);

	// アイテム
	this.itemmanager = new ItemManager(this);

	// キー押下フラグ
	this.keyflag = 0x0;

	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - this.SIDE_WIDTH;
	this.height= this.game.height;
};

// 基底クラスを継承
_.extend(StageScene.prototype, BaseScene.prototype);
_.extend(StageScene, BaseScene);

// キー押下フラグ
StageScene.prototype.BUTTON_LEFT  = 0x01;
StageScene.prototype.BUTTON_UP    = 0x02;
StageScene.prototype.BUTTON_RIGHT = 0x04;
StageScene.prototype.BUTTON_DOWN  = 0x08;
StageScene.prototype.BUTTON_Z     = 0x10;
StageScene.prototype.BUTTON_X     = 0x20;
StageScene.prototype.BUTTON_SHIFT = 0x40;
StageScene.prototype.BUTTON_SPACE = 0x80;

// サイドバーの横の長さ
StageScene.prototype.SIDE_WIDTH = 160;

// 背景画像のスクロールスピード
StageScene.prototype.BACKGROUND_SCROLL_SPEED = 3;

// ステージタイトルの表示秒数
StageScene.prototype.SHOW_TITLE_COUNT = 300;

// 初期化
StageScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	// 自機を初期化
	this.character.init();

	// 自機弾を初期化
	this.shotmanager.init();

	// 敵を初期化
	this.enemymanager.init();

	// 敵弾を初期化
	this.bulletmanager.init();

	// アイテムを初期化
	this.itemmanager.init();


	// BGM再生
	this.game.playBGM('stage1');

};

// キー押下
StageScene.prototype.handleKeyDown = function(e){
	this.keyflag |= this._keyCodeToBitCode(e.keyCode);
};

// キー押下解除
StageScene.prototype.handleKeyUp   = function(e){
	this.keyflag &= ~this._keyCodeToBitCode(e.keyCode);
};

// 指定のキーが押下状態か確認する
StageScene.prototype.isKeyDown = function(flag) {
	return this.keyflag & flag;
};

// キーコードをBitに変換
StageScene.prototype._keyCodeToBitCode = function(keyCode) {
	var flag;
	switch(keyCode) {
		case 16: // shift
			flag = this.BUTTON_SHIFT;
			break;
		case 32: // space
			flag = this.BUTTON_SPACE;
			break;
		case 37: // left
			flag = this.BUTTON_LEFT;
			break;
		case 38: // up
			flag = this.BUTTON_UP;
			break;
		case 39: // right
			flag = this.BUTTON_RIGHT;
			break;
		case 40: // down
			flag = this.BUTTON_DOWN;
			break;
		case 88: // x
			flag = this.BUTTON_X;
			break;
		case 90: // z
			flag = this.BUTTON_Z;
			break;
	}
	return flag;
};

// フレーム処理
StageScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// 自機
	this.character.run();

	// 自機弾
	this.shotmanager.run();

	// 敵
	this.enemymanager.run();

	// 敵弾
	this.bulletmanager.run();

	// アイテム
	this.itemmanager.run();

	// 自機弾と敵の衝突判定
	this.shotmanager.checkCollisionWithEnemies(this.enemymanager);

	// 敵弾と自機の衝突判定
	this.bulletmanager.checkCollisionWithCharacter(this.character);
};

// 画面更新
StageScene.prototype.updateDisplay = function(){
	// 初期化
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height);

	// 背景画像表示
	this._showBackground();

	// 自機描画
	this.character.updateDisplay();

	// 自機弾
	this.shotmanager.updateDisplay();

	// 敵
	this.enemymanager.updateDisplay();

	// 敵弾
	this.bulletmanager.updateDisplay();

	// アイテム
	this.itemmanager.updateDisplay();



	// サイドバー表示
	this._showSidebar();

	// ステージタイトル表示
	this._showStageTitle();
};

// サイドバー表示
StageScene.prototype._showSidebar = function(){
	var x = this.game.width - this.SIDE_WIDTH;
	var y = 0;

	this.game.surface.save();
	this.game.surface.fillStyle = 'rgb(0, 0, 0)';
	this.game.surface.fillRect(x, y, this.SIDE_WIDTH, this.game.height);
	this.game.surface.fillStyle = 'rgb(255, 255, 255)';

	this.game.surface.font = "16px 'Comic Sans MS'" ;
	this.game.surface.textAlign = 'right';
	this.game.surface.fillText('Score:', x + 70, y + 100);
	this.game.surface.fillText(this.score, x + 140, y + 100);

	this.game.surface.fillText('Player:', x + 70, y + 140);
	this.game.surface.fillText(this.character.life, x + 140, y + 140);

	/* TODO: imply BOMB
	this.game.surface.fillText('Bomb:', x + 70, y + 180);
	this.game.surface.fillText('0', x + 140, y + 180); // TODO:
	*/

	this.game.surface.restore();
};

// 背景画像表示
StageScene.prototype._showBackground = function() {
	var x = 0;
	// 背景画像をスクロールさせる
	var y = (this.frame_count * this.BACKGROUND_SCROLL_SPEED) % this.game.height;

	this.game.surface.save();

	var stage1_bg = this.game.getImage('stage1_bg');
	this.game.surface.drawImage(stage1_bg,
		0,
		0,
		stage1_bg.width,
		stage1_bg.height,
		x,
		y,
		this.game.width - this.SIDE_WIDTH,
		this.game.height
	);

	this.game.surface.drawImage(stage1_bg,
		0,
		0,
		stage1_bg.width,
		stage1_bg.height,
		x,
		y - this.game.height,
		this.game.width - this.SIDE_WIDTH,
		this.game.height
	);

	this.game.surface.restore();
};

// ステージタイトルの表示
StageScene.prototype._showStageTitle = function() {
	// タイトル表示時間を過ぎたら表示しない
	if(this.frame_count > this.SHOW_TITLE_COUNT) {
		return;
	}

	this.game.surface.save( ) ;

	var alpha = 1.0 ;
	if( this.frame_count < (this.SHOW_TITLE_COUNT / 3)) {
		// 最初の1/3はフェードイン
		alpha = (this.frame_count * 3) / this.SHOW_TITLE_COUNT;
	}
	else if(this.SHOW_TITLE_COUNT / 3 < this.frame_count && this.frame_count < this.SHOW_TITLE_COUNT * 2 / 3) {
		// 真ん中の1/3は表示
		alpha = 1.0;
	}
	else if(this.SHOW_TITLE_COUNT * 2 / 3 < this.frame_count) {
		// 最後の1/3はフェードアウト
		alpha = (this.SHOW_TITLE_COUNT - this.frame_count) * 3 / this.SHOW_TITLE_COUNT;
	}

	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;
	this.game.surface.globalAlpha = alpha * 0.5; // タイトル背景黒は半透明
	this.game.surface.fillRect( 0, 170, 480, 100 ) ;

	this.game.surface.globalAlpha = alpha ;
	this.game.surface.fillStyle = 'rgb( 255, 255, 255 )' ;
	this.game.surface.textAlign = 'left' ;
	this.game.surface.font = '16px Arial' ;
	this.game.surface.fillText( 'Stage 1', 100, 210 ) ;
	this.game.surface.textAlign = 'right' ;
	this.game.surface.fillText('夢幻夜行絵巻 ～ Mystic Flier', 380, 250 ) ;
	// ステージ名とタイトルの間の白い棒線
	this.game.surface.fillRect( 100, 225, 280, 1 ) ;
	this.game.surface.restore();
} ;

module.exports = StageScene;
