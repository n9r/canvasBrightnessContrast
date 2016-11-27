/**
 * Created by n92 on 2016-11-25.
 */
window.onload = function () {

   // get input and output elements
   anImage = document.querySelector('.road-image');
   myCanvas = document.querySelector('.result-canvas');


   //initialize image
   myImage.setImage(anImage);
   myImage.setCanvas(myCanvas);
   myImage.drawImage();

   //sliders setup
   brightnessContrastSliderSetup();


   //temporary filter
};


// sliders setup

var brightnessContrastSliderSetup = function () {

   var eb = document.querySelector('#brightness');
   var ec = document.querySelector('#contrast');

   eb.min = -255;
   eb.max = 256;
   eb.value = 0;
   eb.step = 1;

   ec.min = -255;
   ec.max = 256;
   ec.value = 0;
   ec.step = 1;

   ec.addEventListener('click', function () {
      myImage.modifyBrightnessContrast(Number(eb.value), Number(ec.value) );
   });

   eb.addEventListener('click', function () {
      myImage.modifyBrightnessContrast(Number(eb.value), Number(ec.value) );
   });
};

// image operations

var myImage = (function () {

   // PRIVATE PARTS ****************
   var image, outputCanvas, ctx, ctxData;

   var createCanvas = function ( w , h ) {
      var el = document.createElement("canvas");
      el.width = w;
      el.height = h;
      return el;
   };

   // PUBLIC PARTS ****************

   //logs image to console
   var consolelog = function () {
     console.log(image);
   };

   //sets image value from users input
   var setImage = function (img) {
     image = img;
   };

   //sets canvas value from users input
   var setCanvas = function (canvas) {
     outputCanvas = canvas;
   };

   // draws image to the canvas
   var drawImage = function () {

      var myCanvas = createCanvas(image.width, image.height);
      ctx = myCanvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      ctxData = ctx.getImageData(0, 0, image.width, image.height);

      // attaches canvas to given html element
      outputCanvas.appendChild(myCanvas);
   };

   // modifiers functions

   var modifyBrightnessContrast = function (eb, ec) {
      var f1,f2,f3,c1,c2,c3;
      eb = eb || 0;
      ec = ec || 0;

      var modImage = ctx.getImageData(0, 0, ctxData.width, ctxData.height);

      for (var i = 0; i < modImage.data.length; i += 4) {

         c1 = ctxData.data[i] + eb;
         c2 = ctxData.data[i+1] + eb;
         c3 = ctxData.data[i+2] + eb;

         f1 = ( 259 * (ec + 255) ) / ( 255 * (259 - ec) );
         f2 = ( 259 * (ec + 255) ) / ( 255 * (259 - ec) );
         f3 = ( 259 * (ec + 255) ) / ( 255 * (259 - ec) );

         modImage.data[i] = f1 * (c1 - 128) + 128;
         modImage.data[i+1] = f2 * (c2 - 128) + 128;
         modImage.data[i+2] = f3 * (c3 - 128) + 128;
      }

      ctx.putImageData(modImage, 0, 0);
   };


   // return public methods
   return {
      setImage: setImage,
      setCanvas: setCanvas,
      drawImage: drawImage,
      console: consolelog,
      modifyBrightnessContrast: modifyBrightnessContrast
   }
})();