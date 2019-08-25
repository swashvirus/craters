module.exports = {
    /** Determine the proper pixel ratio for the canvas */
    getPixelRatio : function getPixelRatio(context) {
      console.log('Determining pixel ratio.');
      var backingStores = [
        'webkitBackingStorePixelRatio',
        'mozBackingStorePixelRatio',
        'msBackingStorePixelRatio',
        'oBackingStorePixelRatio',
        'backingStorePixelRatio'
      ];

      var deviceRatio = window.devicePixelRatio;

      // Iterate through our backing store props and determine the proper backing ratio.
      var backingRatio = backingStores.reduce(function(prev, curr) {
        return (context.hasOwnProperty(curr) ? context[curr] : 1);
      });

      // Return the proper pixel ratio by dividing the device ratio by the backing ratio
      return deviceRatio / backingRatio;
    },

    /** Generate a canvas with the proper width / height
     * Based on: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
     */
    generateCanvas : function generateCanvas(w, h) {
      console.log('Generating canvas.');

      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');
      // Pass our canvas' context to our getPixelRatio method
      var ratio = this.getPixelRatio(context);

      // Set the canvas' width then downscale via CSS
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      canvas.style.width = w +'px';
      canvas.style.height = h +'px';
      // Scale the context so we get accurate pixel density
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      return canvas;
    }
};