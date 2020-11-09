
var user = {
  monkeyPoints : 0,
  elephPoints : 5,
}

// $('header').hide();
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
  animateBanner()
})

function animateBanner(){
  $('.banner').empty()
  $('.banner').css('opacity', '0').css('width' , '100px').css( 'height' , '70px');
  $('.banner').show(100);
  let banner = $('<h3> Level 1/3  </h3>  <button onclick="levelstart()" id ="levelstart">GO!</button>');
  $('.banner').append(banner);
  $('.banner').animate({
    'width':'590px',
    'height':'400px',
    'opacity' : '1',
  },700,)

}

function levelstart(){
  $('.banner').hide(300);
  renderShapes( generateRandomNum(2,20) , "picked");
  renderShapes( generateRandomNum(20,20) , "field");
  $('header img').fadeOut(10000,function(){
    $('section').fadeIn(10000,function(){
      $('section').fadeOut(10000,()=>{
        animateBanner();
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

var pickedShape
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
  user.monkeyPoints += 1;
  $('#monkey').html(user.monkeyPoints);
}

function wrongShape(shape){
$(shape).attr('src', "resources/elephface.png")
user.elephPoints-=1;
$('#eleph').html(user.elephPoints);
if(user.elephPoints === 0){
  alert('u luse')
}
}
