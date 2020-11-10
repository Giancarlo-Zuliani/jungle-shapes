//USER VARIABLES
var user = {
  monkeyPoints : 0,
  elephPoints : 5,
  levelPoints : 0
}

//SHAPES VARIABLES
var pickedShape;
var targetShape=[];

//TIME VARIABLES
var timewidth = 100;
var timer;
var stp = 0;

//SOUND
var soundtrack = new Audio ('resources/audio/maintheme.mp3');
soundtrack.volume = 0.05;
soundtrack.loop = true;
var elphSound = new Audio ('resources/audio/eleph.mp3');
elphSound.volume = 0.1;
var introSound = new Audio ('resources/audio/entersfx.mp3');
introSound.volume = 0.2;
var loseSound = new Audio ('resources/audio/lose.mp3');
loseSound.volume = 0.2;
var winSound = new Audio ('resources/audio/complete.mp3');
winSound.volulme = 0.2;
var tick =new Audio ('resources/audio/ticktick.mp3');
tick.volume = 0.2;
var alarm = new Audio ('resources/audio/alarm.mp3');
alarm.volume=0.2;



$('section').hide();
$('#monkey').html(user.monkeyPoints);
$('#eleph').html(user.elephPoints);



//LEVELS TRIGGERS
$('#level1').click(function(){
  animateBanner(1)
})
$('#level2').click(function(){
  animateBanner(2)
})
$('#level3').click(function(){
  animateBanner(3)
})
$('#level4').click(function(){
  animateBanner(4)
})
$('#level5').click(function(){
  animateBanner(5)
})
$('#level6').click(function(){
  animateBanner(6)
})
$('#level7').click(function(){
  animateBanner(7)
})

//MAIN MENU BUTTON ANIMATION
$('main button').click(function(){
  for(i=1; i <= $('main button').length ; i++){
    $('main button')[i-1].animate({
      'right':'800px',
      'opacity':'0',
    },i*700)
  }
  $('main').fadeOut(900);
})

//POP UP BANNER ON STARTING LEVEL
function animateBanner(n){
  $('.banner').empty()
  $('.banner').css('opacity', '0').css('width' , '100px').css( 'height' , '70px');
  $('.banner').show(200);
  let banner = $('<h3> Level '+ n + '</h3>  <button onclick="levelstart(' + n +')" id ="levelstart">GO!</button> <h3>find the shapes!</h3>');
  $('.banner').append(banner);
  $('.banner').animate({
    'width':'590px',
    'height':'400px',
    'opacity' : '1',
  },300,)
}

//GENERATE RANDOM NUMS FOR CPU PICK SHAPES AND SHAPES RENDER RETURN AN ARRAY
function generateRandomNum(length,maxNum){
  var arr = [];
  for(i=0;i < length ; i++){
    let n = Math.floor(Math.random()* maxNum ) + 1;
    arr.includes(n) ? i-- : arr.push(n);
  }
  return arr
};

//FUNCTION FOR RENDER SHAPES ON PAGE
function renderShapes(arr,target){
  if(target === "field"){
    $('section').empty();
    for(i=0; i < arr.length ;i++){
      let img = $('<img></img>').attr('src','obj/shape' + arr[i] +'.png');
      $('section').append(img);
    }
    $('section img').click(function(){
      let n = this.src;
      console.log(this.src)
      targetShape.includes(n) ? rightShape(this) : wrongShape(this);
    })
  }else if(target === "picked"){
    targetShape =[];
    $('header').empty();
    for(i=0; i < arr.length;i++){
      let img = $('<img></img>').attr('src','obj/shape' + arr[i] +'.png');
      $('header').append(img);
    }
    pickedShape = $('header img')
    for(i=0; i<pickedShape.length ; i++){
      let ur = pickedShape[i].src
      targetShape.push(ur);
    }
  }
}

//LEVELS GENERATORS
function levelstart(n){
  introSound.play();
  $('.banner').hide(300);
  switch(n){
    case 1 :
    renderShapes( generateRandomNum(20,20) , "field");
    renderShapes( generateRandomNum(3,20) , "picked");
    break;
    case 2 :
    renderShapes( generateRandomNum(30,30) , "field");
    renderShapes( generateRandomNum(4,30) , "picked");
    break;
    case 3 :
    renderShapes( generateRandomNum(40,40) , "field");
    renderShapes( generateRandomNum(4,40) , "picked");
    break;
    case 4 :
    renderShapes( generateRandomNum(40,40) , "field");
    renderShapes( generateRandomNum(5,40) , "picked");
    break;
    case 5 :
    renderShapes( generateRandomNum(50,50) , "field");
    renderShapes( generateRandomNum(5,50) , "picked");
    break;
    case 6 :
    renderShapes( generateRandomNum(60,60) , "field");
    renderShapes( generateRandomNum(5,60) , "picked");
    break;
    case 7 :
    renderShapes( generateRandomNum(70,70) , "field");
    renderShapes( generateRandomNum(6,70) , "picked");
    break;
  }
  $('header').fadeIn(500)
  setTimeout(function(){
    $('header img').fadeOut()
    $('section').fadeIn()
  },5000)
  setTimeout(timebar , 6000);
};

//FUNCTION ON CLICKED DOWN THE RIGHT SHAPE
function rightShape(shape){
  $(shape).attr('src', "resources/monkeyface.svg")
  $(shape).unbind('click')
    user.monkeyPoints += 1;
    user.levelPoints += 1;
    if(user.levelPoints === targetShape.length){
      leveldoneBanner('win');
    }
  $('#monkey').html(user.monkeyPoints);
}

//FUNCTION ON CLICKED DOWN THE WRONG SHAPE
function wrongShape(shape){
  elphSound.play();
  $(shape).attr('src', "resources/elephface.png")
  $(shape).unbind('click')
  user.elephPoints-=1;
  $('#eleph').html(user.elephPoints);
  if(user.elephPoints === 0){
    leveldoneBanner('fail')
  }
}

//POP UP ON WIN,LOSE OR TIME'S UP
function leveldoneBanner(cond){
  $('.banner').empty()
  $('.banner').css('opacity', '0').css('width' , '100px').css( 'height' , '70px');
  $('.banner').show(100);
  user.levelPoints = 0;
  user.elephPoints = 5;
  $('#eleph').html(user.elephPoints);
  timewidth = 100;
  stp = 0;
  var banner;
  if(cond === "win"){
    winSound.play();
    $('#container').hide();
    clearInterval(timer);
     banner = $('<h3> LEVEL COMPLETE </h3>  <button onclick="showMainMenu()" >BACK!</button>');
  }else if(cond === "endtime"){
    $('#container').hide();
    alarm.play();
     banner = $("<h3> TIME'S UP</h3>  <button onclick='showMainMenu()'>BACK!</button>");
  }else if(cond === "fail"){
    loseSound.play();
    $('#container').hide();
    clearInterval(timer)
     banner = $('<h3> YOU FAIL! </h3>  <button onclick="showMainMenu()" >BACK!</button>');
  };
  setTimeout(function(){

  $('header').hide();
  $('section').hide();
  $('.banner').append(banner);
  $('.banner').animate({
    'width':'590px',
    'height':'400px',
    'opacity' : '1',
  },300,)
},500)
}

//FUNCTION FOR RETURN ON MAIN MENU
function showMainMenu(){
  $('main').show();
  $('banner').empty()
  $('.banner').css('opacity', '0').css('width' , '100px').css( 'height' , '70px');
  checkMonkey()
}

//CHECK MONKEYS NUM FOR UNLOCK FURTHER LEVELS
function checkMonkey(){
  var btn = $('main button')
  if(user.monkeyPoints >= 23){
    for(i = 0 ; i < btn.length;i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if (user.monkeyPoints >= 18 && user.monkeyPoints < 23){
    for(i=0;i< (btn.length -1);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if(user.monkeyPoints < 23 && user.monkeyPoints >= 13){
    for(i=0;i< (btn.length -2);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if(user.monkeyPoints < 13 && user.monkeyPoints >= 9){
    for(i=0;i< (btn.length -3);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if(user.monkeyPoints < 9 && user.monkeyPoints >= 6){
    for(i=0;i< (btn.length -4);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if (user.monkeyPoints < 6 && user.monkeyPoints >= 2){
    for(i=0;i< (btn.length -5);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }
}

var soundSwitch = false;

$('#soundPlayer').click(() =>{
  if(soundSwitch){
    soundtrack.pause();
    soundSwitch = false;
  }else{
    soundtrack.play();
    soundSwitch = true;
  }
})

// TIMEBAR
$('#container').hide();
var bar = document.getElementById('timebar');
function timebar(){
  $('#container').show();
  if(stp == 0){
    timer = setInterval(timebar , 4)
    stp = 1
    timewidth=100;
  }
  timewidth -= .05
  if(timewidth <= 20){
    tick.play();
  }
  if(timewidth <= 0){
    clearInterval(timer);
    leveldoneBanner('endtime');
  }
  $('#timebar').width(timewidth + '%');
  $('#timebar').html(timewidth.toFixed(0) + '%')
};
