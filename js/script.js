

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
  setTimeout(()=>{
  let banner = $('<h2>  <h2>').attr('class','levelbanner');
  $('.banner').append(banner);
  $('.levelbanner').animate({
    'width':'570px',
    'height' : '400px',
  },300,() => {
    setTimeout(() =>{
      $('.levelbanner').hide()
    },1500);
  })
},500)
}
function generateRandomNum(length,maxNum){
  var arr = [];
  for(i=0;i < length ; i++){
  let n = Math.floor(Math.random()* maxNum ) + 1;
  arr.includes(n) ? i-- : arr.push(n);
  }
  return arr
};


function renderShapes(arr,target){
  if(target === "field"){
    for(i=0; i < arr.length ;i++){
      let img = $('<img></img>').attr('src','obj/shape' + arr[i] +'.png');
      $('section').append(img);
    }
  }else if(target === "picked"){
      for(i=0; i < arr.length;i++){
        let img = $('<img></img>').attr('src','obj/shape' + arr[i] +'.png');
        $('header').append(img);
      }
    }
}





// renderShapes( generateRandomNum(2,20) , "picked");
// renderShapes( generateRandomNum(20,20) , "field");

// $('header').fadeOut(10000,function(){
//     $('section').fadeIn(5000,function(){
//       $('section').fadeOut(20000)
//     });
// });

var pickedShape=$('header img');
var targetShape=[];

for(i=0;i<pickedShape.length;i++){
  let ur = pickedShape[i].src
  targetShape.push(ur);
}

function rightShape(shape){
$(shape).fadeOut(300);
}


function wrongShape(){

}

$('section img').click(function(){
  let n = this.src;
  targetShape.includes(n) ? rightShape(this) : wrongShape(this);
})
