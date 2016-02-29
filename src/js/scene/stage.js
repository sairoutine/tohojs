'use strict';

/* ゲームステージ画面 */

// lodash
var _ = require('lodash');

// 基底クラス
var BaseScene = require('./base');

// constructor
var StageScene = function(game) {
	// 継承元new呼び出し
	BaseScene.apply(this, arguments);

	// スコア
	this.score = 0;
};

// 基底クラスを継承
_.extend(StageScene.prototype, BaseScene.prototype);
_.extend(StageScene, BaseScene);

// サイドバーの横の長さ
StageScene.prototype.SIDE_WIDTH = 160;

// 背景画像のスクロールスピード
StageScene.prototype.BACKGROUND_SCROLL_SPEED = 3;

// ステージタイトルの表示秒数
StageScene.prototype.SHOW_TITLE_COUNT = 300;

// 初期化
StageScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.game.playBGM('stage1');

};

// フレーム処理
StageScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);
};

// 画面更新
StageScene.prototype.updateDisplay = function(){
	// 初期化
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height);

	// サイドバー表示
	this._showSidebar();

	// 背景画像表示
	this._showBackground();

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
	this.game.surface.fillText('0', x + 140, y + 140); // TODO:

	this.game.surface.fillText('Bomb:', x + 70, y + 180);
	this.game.surface.fillText('0', x + 140, y + 180); // TODO:

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
