////////////////////////////////////////////////////////////
// CANVAS LOADER REVISADO PARA OFFLINE
////////////////////////////////////////////////////////////

function initPreload() {
  toggleLoader(true);
  checkMobileEvent();

  $(window).resize(function () {
    resizeGameFunc();
  });
  resizeGameFunc();

  loader = new createjs.LoadQueue(false);

  // Habilita plugin de som
  audioOn = true;
  if (!isDesktop) {
    if (!enableMobileAudio) audioOn = false;
  } else {
    if (!enableDesktopAudio) audioOn = false;
  }
  if (audioOn) {
    createjs.Sound.alternateExtensions = ["mp3"];
    loader.installPlugin(createjs.Sound);
  }

  // Lista de imagens e sons para pré-carregar
  let manifest = [
    { src: '/assets/background.png', id: 'background' },
    { src: '/assets/logo.png', id: 'logo' },
    { src: '/assets/button_start.png', id: 'buttonStart' },

    { src: '/assets/item_plinko.png', id: 'itemPlinko' },
    { src: '/assets/item_plinko_bonus.png', id: 'itemPlinkoBonus' },
    { src: '/assets/item_ball.png', id: 'itemBall' },
    { src: '/assets/item_ball_bonus.png', id: 'itemBallBonus' },
    { src: '/assets/item_dollar.png', id: 'itemDollar' },
    { src: '/assets/item_bet.png', id: 'itemBet' },
    { src: '/assets/button_plus.png', id: 'buttonPlus' },
    { src: '/assets/button_minus.png', id: 'buttonMinus' },
    { src: '/assets/item_droparrow.png', id: 'itemArrow' },
    { src: '/assets/item_droparrow_bonus.png', id: 'itemArrowBonus' },
    { src: '/assets/item_coin.png', id: 'itemCoin' },
    { src: '/assets/item_bonus.png', id: 'itemBonus' },

    { src: '/assets/button_confirm.png', id: 'buttonConfirm' },
    { src: '/assets/button_cancel.png', id: 'buttonCancel' },
    { src: '/assets/item_exit.png', id: 'itemExit' },

    { src: '/assets/button_share.png', id: 'buttonShare' },
    { src: '/assets/button_save.png', id: 'buttonSave' },
    { src: '/assets/social/button_facebook.png', id: 'buttonFacebook' },
    { src: '/assets/social/button_twitter.png', id: 'buttonTwitter' },
    { src: '/assets/social/button_whatsapp.png', id: 'buttonWhatsapp' },
	{ src: '/assets/social/button_telegram.png', id: 'buttonTelegram' },
	{ src: '/assets/social/button_reddit.png', id: 'buttonReddit' },
	{ src: '/assets/social/button_linkedin.png', id: 'buttonLinkedin' },

    { src: '/assets/button_continue.png', id: 'buttonContinue' },
    { src: '/assets/item_result.png', id: 'itemResult' },
    { src: '/assets/button_fullscreen.png', id: 'buttonFullscreen' },
    { src: '/assets/button_sound_on.png', id: 'buttonSoundOn' },
    { src: '/assets/button_sound_off.png', id: 'buttonSoundOff' },
    { src: '/assets/button_exit.png', id: 'buttonExit' },
    { src: '/assets/button_settings.png', id: 'buttonSettings' },
  ];

  // Adiciona imagens de prêmios dinâmicos
  plinkoSettings.prizes.forEach((p, i) => {
    if (p.image) manifest.push({ src: p.image.startsWith('/') ? p.image : '/' + p.image, id: 'prize' + i });
  });
  plinkoBonusSettings.prizes.forEach((p, i) => {
    if (p.image) manifest.push({ src: p.image.startsWith('/') ? p.image : '/' + p.image, id: 'prizeBonus' + i });
  });

  // Membership e scoreboard (se houver)
  if (typeof memberData !== 'undefined' && memberSettings.enableMembership) addMemberRewardAssets();
  if (typeof addScoreboardAssets === 'function') addScoreboardAssets();

  // Sons
  if (audioOn) {
    const sounds = [
      'sound_result', 'soundClick', 'soundStart', 'soundLose',
      'soundWin', 'soundHit1', 'soundHit2', 'soundHit3',
      'soundCoin', 'soundChips', 'soundBonus'
    ];
    sounds.forEach(s => {
      let src = `/assets/sounds/${s.replace(/([A-Z])/g, m => '_' + m.toLowerCase())}.ogg`;
      manifest.push({ src, id: s });
    });
  }

  // Eventos do loader
  loader.addEventListener('complete', handleComplete);
  loader.addEventListener('fileload', fileComplete);
  loader.addEventListener('error', handleFileError);
  loader.on('progress', handleProgress, this);

  loader.loadManifest(manifest);
}

// Eventos do loader
function fileComplete(evt) { /* opcional: console.log(evt.item.id); */ }
function handleFileError(evt) { console.log("Loader error", evt); }
function handleProgress() { $('#mainLoader span').html(Math.round(loader.progress * 100) + '%'); }
function handleComplete() { toggleLoader(false); initMain(); }
function toggleLoader(show) { if (show) $('#mainLoader').show(); else $('#mainLoader').hide(); }
