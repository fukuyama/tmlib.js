/*
 * splash
 */

;(function() {
    var SPLASH_IMAGE_PATH = "https://files.gitter.im/phi-jp/tmlib.js/t5F7/splash.png";

    tm.define("SplashScene", {
        superClass: "tm.app.Scene",

        init: function(param) {
            this.superInit();

            this.param = param;

            this.splashImage = tm.asset.Texture(param.path || SPLASH_IMAGE_PATH);
            this.splashImage.onload = this._init.bind(this);
        },

        _init: function() {
            var width = this.param.width;
            var height = this.param.height;
            var x = width / 2;
            var y = height / 2;

            var rw = width / this.splashImage.width;
            var rh = height / this.splashImage.height;
            var iw = width;
            var ih = height;
            
            tm.display.Shape({
                x: x,
                y: y,
                width: width,
                height: height,
                bgColor: "white"
            }).addChildTo(this);

            if (rw > rh) {
                iw = this.splashImage.width * rh;
            }
            if (rw < rh) {
                ih = this.splashImage.height * rw;
            }

            tm.display.Sprite(this.splashImage, iw, ih)
                .setPosition(x,y)
                .setAlpha(0)
                .addChildTo(this)
                .tweener
                    .clear()
                    .wait(250)
                    .fadeIn(500)
                    .wait(1000)
                    .fadeOut(500)
                    .wait(250)
                    .call(function() {
                        this.app.popScene();
                    }.bind(this));
        },
    });
})();

