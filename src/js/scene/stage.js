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
var EffectManager = require('../manager/effect');
var BombManager = require('../manager/bomb');

// constructor
var StageScene = function(game) {
	// 継承元new呼び出し
	BaseScene.apply(this, arguments);

	// 現在のステージの状態
	this.state = null;

	// スコア
	this.score = 0;

	// プレイヤーのボム所持数
	this.bomb = null;

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

	// エフェクト
	this.effectmanager = new EffectManager(this);

	// ボム
	this.bombmanager = new BombManager(this);


	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - this.SIDE_WIDTH;
	this.height= this.game.height;

	// コンティニュー画面にて Continue or Quit どっちにフォーカスがあるか
	this.continue_select_index = 0;

	// 前回FPSを計算した時刻(ミリ秒)
	this.before_time = 0;

	// FPS
	this.fps = 0;
};

// 基底クラスを継承
_.extend(StageScene.prototype, BaseScene.prototype);
_.extend(StageScene, BaseScene);

// ステージの状態
StageScene.prototype.STATE_SHOOTING  = 1;
StageScene.prototype.STATE_GAMEOVER  = 2;
StageScene.prototype.STATE_CLEAR     = 3;

// サイドバーの横の長さ
StageScene.prototype.SIDE_WIDTH = 160;

// 背景画像のスクロールスピード
StageScene.prototype.BACKGROUND_SCROLL_SPEED = 3;

// ステージタイトルの表示フレーム数
StageScene.prototype.SHOW_TITLE_COUNT = 300;

// リザルトの表示フレーム数
StageScene.prototype.SHOW_RESULT_COUNT = 300;

// ステージ終了カウント
StageScene.prototype.STAGE_END_COUNT = 3500;

// FPSの更新タイミング(フレーム)
StageScene.prototype.FPS_SPAN = 30;




// 初期化
StageScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	// ステージの状態
	this.state = this.STATE_SHOOTING;

	// スコア初期化
	this.score = 0;

	// ボム所持数初期化
	this.bomb = 2;

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

	// エフェクトを初期化
	this.effectmanager.init();

	// ボムを初期化
	this.bombmanager.init();

	// コンティニュー画面にて Continue or Quit どっちにフォーカスがあるか
	this.continue_select_index = 0;

	// BGM再生
	this.game.playBGM('stage1');

};

// フレーム処理
StageScene.prototype.run = function(){
	// TODO: リファクタ
	// ゲームオーバー画面ならば
	if(this.state === this.STATE_GAMEOVER) {
		this._runContinue();
		return;
	}
	// ゲームクリア画面ならば
	if(this.state === this.STATE_CLEAR) {
		this._runClear();
	}

	// ゲーム中
	BaseScene.prototype.run.apply(this, arguments);

	// FPS計算
	this._calculateFps();

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

	// エフェクト
	this.effectmanager.run();

	// ボム
	this.bombmanager.run();


	// アイテムと自機の衝突判定
	this.itemmanager.checkCollisionWithCharacter(this.character);

	// 自機弾と敵の衝突判定
	this.shotmanager.checkCollisionWithEnemies(this.enemymanager);

	// 敵と自機の衝突判定
	this.enemymanager.checkCollisionWithCharacter(this.character);

	// 敵弾と自機の衝突判定
	this.bulletmanager.checkCollisionWithCharacter(this.character);

	// ステージ終了かどうか判定
	this._checkStageEnd();
};


// コンティニュー時のフレーム処理
StageScene.prototype._runContinue = function(){
	// TODO: ボタンおしっぱなしの時にコンティニューしないようにしたい
	// TODO: 死んだ時に初期位置に戻ってコンティニュ画面になるの治したい

	// カーソルを上に移動
	if(this.game.isKeyPush(this.game.BUTTON_UP)) {
		this.game.playSound('select');
		this.continue_select_index = 0;
	}
	else if(this.game.isKeyPush(this.game.BUTTON_DOWN)) {
		this.game.playSound('select');
		this.continue_select_index = 1;
	}
	else if(this.game.isKeyPush(this.game.BUTTON_Z)) {
		this.game.playSound('select');

		if(this.continue_select_index === 0) {
			// コンティニュー
			this.character.init();
			// ゲームを継続
			this.changeState(this.STATE_SHOOTING);

			// FPS計算用の時刻をリセット
			this.before_time = 0;
		}
		else if(this.continue_select_index === 1) {
			// オープニングに戻る
			this.game.notifySelectQuit();
		}
	}
};

// ゲームクリア時のフレーム処理
StageScene.prototype._runClear = function(){
	// Zが押下されたら
	if(this.game.isKeyPush(this.game.BUTTON_Z)) {
		this.game.playSound('select') ;

		// オープニングに戻る
		this.game.notifySelectQuit();
	}
};





// ステージが終了かどうか判定
StageScene.prototype._checkStageEnd = function(){
	// 一定フレーム超えたらステージ終了
	if(this.frame_count > this.STAGE_END_COUNT) {
		this.changeState(this.STATE_CLEAR);
	}
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

	// エフェクト
	this.effectmanager.updateDisplay();

	// ボム
	this.bombmanager.updateDisplay();

	// サイドバー表示
	this._showSidebar();

	// ステージタイトル表示
	this._showStageTitle();

	// コンティニュー表示
	this._showContinue();

	// リザルト表示
	this._showResult();
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

	// FPS
	this.game.surface.fillText('FPS:', x + 70, y + 180);
	if(this.fps) {
		this.game.surface.fillText(this.fps, x + 140, y + 180);
	}
	// DEGUG
	//this.game.surface.fillText('Frame:', x + 70, y + 220);
	//this.game.surface.fillText(this.frame_count, x + 140, y + 220);


	/* TODO: imply BOMB
	this.game.surface.fillText('Bomb:', x + 70, y + 180);
	this.game.surface.fillText('0', x + 140, y + 180);
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

// コンティニュー表示
StageScene.prototype._showContinue = function() {
	// ゲームオーバー時のみ表示
	if(this.state !== this.STATE_GAMEOVER) {
		return;
	}

	this.game.surface.save( ) ;

	// コンティニュー背景
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;
	this.game.surface.globalAlpha = 0.5 ;
	this.game.surface.fillRect( 0, 170, 480, 100 ) ;

	this.game.surface.fillStyle = 'rgb( 255, 255, 255 )' ;
	this.game.surface.textAlign = 'center' ;
	//this.game.surface.textBaseline = 'middle' ;
	this.game.surface.font = '16px Arial' ;

	this.game.surface.globalAlpha = this.continue_select_index === 0 ? 1.0 : 0.2;

	this.game.surface.fillText( 'Continue', 240, 200 ) ;

	this.game.surface.globalAlpha = this.continue_select_index === 1 ? 1.0 : 0.2;

	this.game.surface.fillText( 'Quit',     240, 240 ) ;
	this.game.surface.restore( ) ;
} ;

// スコア結果画面表示
StageScene.prototype._showResult = function() {
	// クリア時のみ表示
	if(this.state !== this.STATE_CLEAR) {
		return;
	}

	// ステージ終了から経過した時間
	var frame_count_after_stage_end = this.frame_count - this.STAGE_END_COUNT;

	this.game.surface.save( ) ;

	var alpha = 1.0 ;
	if( frame_count_after_stage_end < (this.SHOW_RESULT_COUNT / 2)) {
		// 最初の1/2はフェードイン
		alpha = (frame_count_after_stage_end * 2) / this.SHOW_RESULT_COUNT;
	}
	else if(this.SHOW_RESULT_COUNT / 2 < frame_count_after_stage_end) {
		// 最後の1/3はフェードアウト
		alpha = 1.0;
	}

	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;
	this.game.surface.globalAlpha = alpha * 0.5; // タイトル背景黒は半透明
	this.game.surface.fillRect( 0, 170, 480, 100 ) ;

	this.game.surface.globalAlpha = alpha ;
	this.game.surface.fillStyle = 'rgb( 255, 255, 255 )' ;
	this.game.surface.textAlign = 'left' ;
	this.game.surface.font = '16px Arial' ;
	this.game.surface.fillText( 'Result', 100, 210 ) ;
	this.game.surface.textAlign = 'right' ;
	this.game.surface.fillText('Score: ' + this.score, 380, 210 ) ;
	// ステージ名とタイトルの間の白い棒線
	this.game.surface.fillRect( 100, 225, 280, 1 ) ;
	this.game.surface.fillText('Press Z to Quit', 300, 250 ) ;
	this.game.surface.restore();
} ;

// FPSを計算
StageScene.prototype._calculateFps = function() {
	if((this.frame_count % this.FPS_SPAN) !== 0) {
		return;
	}

	// 現在時刻(ミリ秒)を取得
	var newTime = Date.now();
	if(this.before_time) {
		this.fps = parseInt(1000 * this.FPS_SPAN / ( newTime - this.before_time ));
	}
	this.before_time = newTime;
} ;

// ステージの状態の切り替え
StageScene.prototype.changeState = function(state) {
	this.state = state;
};

// キャラクターが死んだ時
StageScene.prototype.notifyCharacterDead = function() {
	// ゲームオーバー画面に変更
	this.changeState(this.STATE_GAMEOVER);
};

// プレイヤーがボムを使用した時
StageScene.prototype.notifyUseBomb = function() {
	if( this.bomb <= 0) {
		return ;
	}

	// ボム使用中でないか確かめる
	if( this.is_bomb_using === true) {
		return;
	}

	console.log('use bomb!');
	// ボムの数を減らす
	//this.bomb--;

	//this.is_bomb_using = true;

	// 敵を全滅させる
	//this.enemymanager.remove_all();

	// 敵弾を全滅させる
	//this.bulletmanager.remove_all();

	// 全てのアイテムを自機に吸引
	//this.itemmanager.homing_all(this.character);

	// 自機のスペルカードの使用を表示
	//this.spellCardManager.create(this.character);

	// ボム生成
	//this.bombmanager.create(this.character);

	// スペルカード使用音再生
	//this.game.playSound('spellcard');
};

module.exports = StageScene;
