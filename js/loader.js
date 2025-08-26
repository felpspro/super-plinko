////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/button_start.png', id:'buttonStart'},
			
			{src:'assets/item_plinko.png', id:'itemPlinko'},
			{src:'assets/item_plinko_bonus.png', id:'itemPlinkoBonus'},
			{src:'assets/item_ball.png', id:'itemBall'},
			{src:'assets/item_ball_bonus.png', id:'itemBallBonus'},
			{src:'assets/item_dollar.png', id:'itemDollar'},
			{src:'assets/item_bet.png', id:'itemBet'},
			{src:'assets/button_plus.png', id:'buttonPlus'},
			{src:'assets/button_minus.png', id:'buttonMinus'},
			{src:'assets/item_droparrow.png', id:'itemArrow'},
			{src:'assets/item_droparrow_bonus.png', id:'itemArrowBonus'},
			{src:'assets/item_coin.png', id:'itemCoin'},
			{src:'assets/item_bonus.png', id:'itemBonus'},

			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},

			{src:'assets/button_share.png', id:'buttonShare'},
			{src:'assets/button_save.png', id:'buttonSave'},
			{src:'assets/social/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/social/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/social/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/social/button_telegram.png', id:'buttonTelegram'},
			{src:'assets/social/button_reddit.png', id:'buttonReddit'},
			{src:'assets/social/button_linkedin.png', id:'buttonLinkedin'},
		
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}];

	for(var n=0; n<plinkoSettings.prizes.length; n++){
		if(plinkoSettings.prizes[n].image != undefined){
			if(plinkoSettings.prizes[n].image != ''){
				manifest.push({src:plinkoSettings.prizes[n].image, id:'prize'+n});
			}
		}
	}

	for(var n=0; n<plinkoBonusSettings.prizes.length; n++){
		if(plinkoBonusSettings.prizes[n].image != undefined){
			if(plinkoBonusSettings.prizes[n].image != ''){
				manifest.push({src:plinkoBonusSettings.prizes[n].image, id:'prizeBonus'+n});
			}
		}
	}
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		addMemberRewardAssets();
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	audioOn = true;
	if(!isDesktop){
		if(!enableMobileAudio){
			audioOn=false;
		}
	}else{
		if(!enableDesktopAudio){
			audioOn=false;
		}
	}
	
	if(audioOn){
		manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/sound_button.ogg', id:'soundClick'});
		manifest.push({src:'assets/sounds/sound_start.ogg', id:'soundStart'});
		manifest.push({src:'assets/sounds/sound_nowin.ogg', id:'soundLose'});
		manifest.push({src:'assets/sounds/sound_score.ogg', id:'soundWin'});
		manifest.push({src:'assets/sounds/sound_hit1.ogg', id:'soundHit1'});
		manifest.push({src:'assets/sounds/sound_hit2.ogg', id:'soundHit2'});
		manifest.push({src:'assets/sounds/sound_hit3.ogg', id:'soundHit3'});
		manifest.push({src:'assets/sounds/sound_coin.ogg', id:'soundCoin'});
		manifest.push({src:'assets/sounds/sound_chips.ogg', id:'soundChips'});
		manifest.push({src:'assets/sounds/sound_bonus.ogg', id:'soundBonus'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}