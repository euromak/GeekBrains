'use strict';

var slider = {
    currentSlide: 0,
    images: ['url(img/bg.jpg)', 'url(img/bg3.jpg)', 'url(img/bg4.jpg)'],
    next: function(){
        let $slide = document.getElementById('slider');


        for(let i = this.currentSlide; i < this.images.length; i++){
            if(this.currentSlide === this.images.length-1){
                this.currentSlide = 0;
                $slide.style.background = slider.images[0];
                return this.currentSlide;
            }

            $slide.style.background = slider.images[i+1];
            this.currentSlide++;
            console.log(slider.images[i]);
            break;
        }


},
    prev: function(){
        let $slide = document.getElementById('slider');

        for(var i = this.currentSlide; i < this.images.length; i++){
            if(this.currentSlide === 0){
                this.currentSlide = 2;
                $slide.style.background = slider.images[2];
                return this.currentSlide;
            }

            $slide.style.background = slider.images[i-1];
            this.currentSlide--;
            console.log(slider.images[i]);
            break;
        }
    },
    navigation: function(){
        let $slide = document.getElementById('slider');
        let $slideNext = document.createElement('div');
        $slideNext.id = 'slider__next';
        $slideNext.innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
        $slide.appendChild($slideNext);


        let $slidePrev = $slideNext.cloneNode(true);
        $slide.appendChild($slidePrev);
        $slidePrev.id = 'slider__prev';
        $slidePrev.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';

        return true;
    }

}

slider.navigation();

