////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage;
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	const gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas",{ antialias: true });
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var safeZoneGuide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, exitContainer, optionsContainer, shareContainer, shareSaveContainer, socialContainer;
var guideline, bg, bgP, logo, logoP;
var itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel;
var itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt, buttonShare, buttonSave;
var resultTitleOutlineTxt,resultDescOutlineTxt,resultShareTxt,resultShareOutlineTxt,popTitleOutlineTxt,popDescOutlineTxt;
var buttonSettings, buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit;
$.share = {};

var buttonStart,stateContainer,stateBonusContainer,plinkoContainer,plinkoItemContainer,plinkoCoinContainer,plinkoCoinTextContainer,plinkoGuideContainer,plinkoBonusContainer,plinkoBonusItemContainer,plinkoBonusGuideContainer,dollarContainer,betContainer,chanceContainer;
var itemPlinko,itemCoin,itemBall,itemDollar,itemArrow,statusTxt,dollarTxt,itemBet,buttonPlus,buttonMinus,betTxt,itemChance,chanceTxt,itemBonus,itemPlinkoBonus,itemBallBonus,itemArrowBonus,statusBonusTxt,resultDescTxt,resultScoreTxt,buttonContinue,popTitleTxt,popDescTxt;
$.drop = {};
$.move = {};
$.prize = {};
$.coins = {};
$.arrow = {};

$.dropBonus = {};
$.moveBonus = {};
$.prizeBonus = {};
$.arrowBonus = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	exitContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	shareContainer = new createjs.Container();
	shareSaveContainer = new createjs.Container();
	socialContainer = new createjs.Container();

	stateContainer = new createjs.Container();
	stateBonusContainer = new createjs.Container();
	plinkoContainer = new createjs.Container();
	plinkoItemContainer = new createjs.Container();
	plinkoCoinContainer = new createjs.Container();
	plinkoCoinTextContainer = new createjs.Container();
	plinkoGuideContainer = new createjs.Container();
	plinkoBonusContainer = new createjs.Container();
	plinkoBonusItemContainer = new createjs.Container();
	plinkoBonusGuideContainer = new createjs.Container();
	dollarContainer = new createjs.Container();
	betContainer = new createjs.Container();
	chanceContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 65;
	
	//game
	itemPlinko = new createjs.Bitmap(loader.getResult('itemPlinko'));
	centerReg(itemPlinko);
	
	itemCoin = new createjs.Bitmap(loader.getResult('itemCoin'));
	centerReg(itemCoin);
	itemCoin.visible = false;

	itemBall = new createjs.Bitmap(loader.getResult('itemBall'));
	centerReg(itemBall);

	itemDollar = new createjs.Bitmap(loader.getResult('itemDollar'));
	centerReg(itemDollar);

	itemArrow = new createjs.Bitmap(loader.getResult('itemArrow'));
	centerReg(itemArrow);
	itemArrow.visible = false;

	statusTxt = new createjs.Text();
	statusTxt.font = "25px azonixregular";
	statusTxt.color = '#fff';
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.text = '';

	dollarTxt = new createjs.Text();
	dollarTxt.font = "30px azonixregular";
	dollarTxt.color = '#fff';
	dollarTxt.textAlign = "center";
	dollarTxt.textBaseline='alphabetic';
	dollarTxt.text = '1,000';

	dollarContainer.addChild(itemDollar, dollarTxt);

	itemBet = new createjs.Bitmap(loader.getResult('itemBet'));
	centerReg(itemBet);

	buttonPlus = new createjs.Bitmap(loader.getResult('buttonPlus'));
	centerReg(buttonPlus);

	buttonMinus = new createjs.Bitmap(loader.getResult('buttonMinus'));
	centerReg(buttonMinus);

	buttonPlus.x += 105;
	buttonMinus.x -= 105;

	betTxt = new createjs.Text();
	betTxt.font = "30px azonixregular";
	betTxt.color = '#fff';
	betTxt.textAlign = "center";
	betTxt.textBaseline='alphabetic';
	betTxt.text = '100';

	dollarContainer.x = canvasW/100 * 30;
	betContainer.addChild(itemBet, betTxt, buttonPlus, buttonMinus);

	itemChance = new createjs.Bitmap(loader.getResult('itemBet'));
	centerReg(itemChance);

	chanceTxt = new createjs.Text();
	chanceTxt.font = "30px azonixregular";
	chanceTxt.color = '#fff';
	chanceTxt.textAlign = "center";
	chanceTxt.textBaseline='alphabetic';
	chanceTxt.text = 'x7';

	chanceContainer.addChild(itemChance, chanceTxt);

	//bonus
	itemBonus = new createjs.Bitmap(loader.getResult('itemBonus'));
	centerReg(itemBonus);
	itemBonus.x = itemBonus.oriX = canvasW/2;
	itemBonus.y = itemBonus.oriY = canvasH/2;

	itemPlinkoBonus = new createjs.Bitmap(loader.getResult('itemPlinkoBonus'));
	centerReg(itemPlinkoBonus);

	itemBallBonus = new createjs.Bitmap(loader.getResult('itemBallBonus'));
	centerReg(itemBallBonus);

	itemArrowBonus = new createjs.Bitmap(loader.getResult('itemArrowBonus'));
	centerReg(itemArrowBonus);
	itemArrowBonus.visible = false;

	statusBonusTxt = new createjs.Text();
	statusBonusTxt.font = "25px azonixregular";
	statusBonusTxt.color = '#fff';
	statusBonusTxt.textAlign = "center";
	statusBonusTxt.textBaseline='alphabetic';
	statusBonusTxt.text = '';
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemResult'));

	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "20px azonixregular";
	resultShareTxt.color = '#5e06b2';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textStrings.share;
	shareContainer.x = shareSaveContainer.x = canvasW/2;
	shareContainer.y = shareSaveContainer.y = canvasH/100 * 52;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "50px azonixregular";
	resultTitleTxt.color = '#fff';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textStrings.resultTitle;
	resultTitleTxt.x = canvasW/2;
	resultTitleTxt.y = canvasH/100 * 33;

	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "30px azonixregular";
	resultDescTxt.color = '#fff';
	resultDescTxt.textAlign = "center";
	resultDescTxt.textBaseline='alphabetic';
	resultDescTxt.text = textStrings.resultDesc;
	resultDescTxt.x = canvasW/2;
	resultDescTxt.y = canvasH/100 * 40;

	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "35px azonixregular";
	resultScoreTxt.color = '#fff';
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.text = '1,000';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100 * 47;
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	buttonContinue.x = canvasW/2;
	buttonContinue.y = canvasH/100 * 70;

	socialContainer.visible = false;
    socialContainer.scale = .9;
    shareContainer.addChild(resultShareTxt, socialContainer);

    if(shareSettings.enable){
        buttonShare = new createjs.Bitmap(loader.getResult('buttonShare'));
        centerReg(buttonShare);
        
        var pos = {x:0, y:45, spaceX:65};
        pos.x = -(((shareSettings.options.length-1) * pos.spaceX)/2)
        for(let n=0; n<shareSettings.options.length; n++){
            var shareOption = shareSettings.options[n];
            var shareAsset = String(shareOption[0]).toUpperCase() + String(shareOption).slice(1);
            $.share['button'+n] = new createjs.Bitmap(loader.getResult('button'+shareAsset));
            $.share['button'+n].shareOption = shareOption;
            centerReg($.share['button'+n]);
            $.share['button'+n].x = pos.x;
            $.share['button'+n].y = pos.y;
            socialContainer.addChild($.share['button'+n]);
            pos.x += pos.spaceX;
        }
        buttonShare.y = (buttonShare.image.naturalHeight/2) + 10;
        shareContainer.addChild();
    }

    if ( typeof toggleScoreboardSave == 'function' ) { 
        buttonSave = new createjs.Bitmap(loader.getResult('buttonSave'));
        centerReg(buttonSave);
        buttonSave.y = (buttonSave.image.naturalHeight/2) + 10;
        shareSaveContainer.addChild(buttonSave);
    }
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	buttonConfirm.x = canvasW/100* 35;
	buttonConfirm.y = canvasH/100 * 70;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	buttonCancel.x = canvasW/100 * 65;
	buttonCancel.y = canvasH/100 * 70;

	popTitleTxt = new createjs.Text();
	popTitleTxt.font = "50px azonixregular";
	popTitleTxt.color = "#fff";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textStrings.exitTitle;
	popTitleTxt.x = canvasW/2;
	popTitleTxt.y = canvasH/100 * 36;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "30px azonixregular";
	popDescTxt.lineHeight = 35;
	popDescTxt.color = "#fff";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textStrings.exitMessage;
	popDescTxt.x = canvasW/2;
	popDescTxt.y = canvasH/100 * 48;
	
	exitContainer.addChild(itemExit, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	exitContainer.visible = false;
	
	guideline = new createjs.Shape();
	
	mainContainer.addChild(logo, buttonStart);
	stateContainer.addChild(itemArrow, statusTxt);
	stateBonusContainer.addChild(itemArrowBonus, statusBonusTxt);
	
	plinkoContainer.addChild(itemPlinko, plinkoGuideContainer, plinkoItemContainer, plinkoCoinContainer, plinkoCoinTextContainer, stateContainer, itemBall);
	plinkoBonusContainer.addChild(itemPlinkoBonus, plinkoBonusGuideContainer, plinkoBonusItemContainer, stateBonusContainer, itemBallBonus);
	gameContainer.addChild(itemCoin, plinkoContainer, plinkoBonusContainer, dollarContainer, betContainer, chanceContainer, itemBonus);
	resultContainer.addChild(itemResult, resultTitleTxt, resultScoreTxt, resultDescTxt, buttonContinue, shareContainer, shareSaveContainer);
	optionsContainer.addChild(buttonExit, buttonFullscreen, buttonSoundOn, buttonSoundOff);
	optionsContainer.visible = false;
	
	canvasContainer.addChild(bg, mainContainer, gameContainer, resultContainer, exitContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		const cssWidth = stageW * scalePercent;
		const cssHeight = stageH * scalePercent;

		const gameCanvas = document.getElementById("gameCanvas");
		gameCanvas.style.width = cssWidth + "px";
		gameCanvas.style.height = cssHeight + "px";

		gameCanvas.style.left = (offset.left/2) + "px";
		gameCanvas.style.top = (offset.top/2) + "px";
		
		gameCanvas.width = stageW * dpr;
		gameCanvas.height = stageH * dpr;

		stage.scaleX = stage.scaleY = dpr;
	
		if(safeZoneGuide){	
			guideline.graphics.clear().setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
		}

		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 60;
		
		var distanceNum = 105;
		var nextCount = 0;
		buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
		buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
		buttonSoundOn.x = buttonSoundOff.x;
		buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
		if (typeof buttonMusicOn != "undefined") {
			buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
			buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
			buttonMusicOn.x = buttonMusicOff.x;
			buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
			nextCount = 2;
		}else{
			nextCount = 1;
		}
		buttonFullscreen.x = buttonSettings.x;
		buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));

		if(curPage == 'main' || curPage == 'result'){
			buttonExit.visible = false;			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}

		if(curPage == 'game'){
			betContainer.x = canvasW/100 * 67;
			chanceContainer.x = canvasW/100 * 74;
			dollarContainer.y = betContainer.y = chanceContainer.y = (canvasH - offset.y) - 55;
		}		
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}