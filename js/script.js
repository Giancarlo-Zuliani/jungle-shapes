 $('section img').click(function(){
   let n = this.src;
   n = n.slice(-5,-4);
   n = parseInt(n);
   console.log(n);
 })
