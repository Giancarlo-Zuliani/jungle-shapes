
var user = {
  monkeyPoints : 0,
  elephPoints : 5,
}

$('section').hide();

$('#monkey').html(user.monkeyPoints);
$('#eleph').html(user.elephPoints);

$('main button').click(function(){
  for(i=0; i< $('main button').length ; i++){
    $('main button')[i].animate({
      'right':'800px',
      'opacity':'0',
    },(i+1)*700)
  }
  $('main').fadeOut(900);
})


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
$('#level15').click(function(){
  animateBanner(5)
})
$('#level6').click(function(){
  animateBanner(6)
})
$('#level7').click(function(){
  animateBanner(7)
})


function animateBanner(n){
  $('.banner').empty()
  $('.banner').css('opacity', '0').css('width' , '100px').css( 'height' , '70px');
  $('.banner').show(100);
  let banner = $('<h3> Level'+ n + '</h3>  <button onclick="levelstart(' + n +')" id ="levelstart">GO!</button> <h3>find the shapes!</h3>');
  $('.banner').append(banner);
  $('.banner').animate({
    'width':'590px',
    'height':'400px',
    'opacity' : '1',
  },700,)
}

function levelstart(n){
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
    renderShapes( generateRandomNum(30,30) , "field");
    renderShapes( generateRandomNum(4,30) , "picked");
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
  $('header img').fadeOut(10000,()=>{
    $('section').fadeIn(()=>{
      $('section').fadeOut(100000,()=>{
        $('main').show()
      })
    })
  })
}

function generateRandomNum(length,maxNum){
  var arr = [];
  for(i=0;i < length ; i++){
  let n = Math.floor(Math.random()* maxNum ) + 1;
  arr.includes(n) ? i-- : arr.push(n);
  }
  return arr
};

var pickedShape;
var targetShape=[];

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

function rightShape(shape){
  $(shape).attr('src', "resources/monkeyface.svg")
  $(shape).unbind('click')
    user.monkeyPoints += 1;
  $('#monkey').html(user.monkeyPoints);
}

function wrongShape(shape){
$(shape).attr('src', "resources/elephface.png")
$(shape).unbind('click')
user.elephPoints-=1;
$('#eleph').html(user.elephPoints);
  if(user.elephPoints === 0){
    alert('u luse')
  }
}


function checkMonkey(){
  var btn = $('main button')
  if(user.monkeyPoints > 23){
    for(i = 0 ; i < btn.length;i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if (user.monkeyPoints > 18 && user.monkeyPoints < 23){
    for(i=0;i< (btn.length -1);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if(user.monkeyPoints < 23 && user.monkeyPoints > 13){
    for(i=0;i< (btn.length -2);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if(user.monkeyPoints < 13 && user.monkeyPoints > 9){
    for(i=0;i< (btn.length -3);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if(user.monkeyPoints < 9 && user.monkeyPoints > 6){
    for(i=0;i< (btn.length -4);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }else if (user.monkeyPoints < 6 && user.monkeyPoints > 2){
    for(i=0;i< (btn.length -5);i++){
      btn.eq(i).attr('disabled' , false).removeClass('disabled');
      btn.eq(i).children('span').html('');
    }
  }
}
