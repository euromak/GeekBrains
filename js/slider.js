'use strict';

let slider = {
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
        $slideNext.addEventListener('click', next);

        function next() {
            if(event.target.id == 'slider__next'){
                slider.next();
                showCurrentSlide();
            }
        }

        let $slidePrev = $slideNext.cloneNode(true);
        $slide.appendChild($slidePrev);
        $slidePrev.id = 'slider__prev';
        $slidePrev.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';
        $slidePrev.addEventListener('click', prev);

        function prev() {
            if(event.target.id == 'slider__prev'){
                slider.prev();
                showCurrentSlide();
            }
        }

        let $navigationPoints = document.createElement('div');
        $slide.appendChild($navigationPoints);
        $navigationPoints.classList.add('navPointsBlock');

        for(let i = 0; i < slider.images.length; i++){
            let $point = document.createElement('div');
            $point.classList.add('navPoint');
            $navigationPoints.appendChild($point);
        }

        function showCurrentSlide(){
            for(let j = 0; j < slider.images.length; j++){
                let $points = document.getElementsByClassName('navPoint')[j];
                if(j === slider.currentSlide){
                    $points.classList.add('navPointActive');
                    console.log(j);
                }
                else{
                    $points.classList.remove('navPointActive');
                }
            }
        }

        showCurrentSlide();

        return true;
    },
    speed: function(){
        //setInterval(function(){slider.next();}, 5000);
    }

};


function init(){
    slider.navigation();
    slider.speed();
}

window.addEventListener('load', init);

