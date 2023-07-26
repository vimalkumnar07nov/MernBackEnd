
// -----------image slider code

let counter = 1


setInterval(()=>{
	document.querySelector('.imgslider.show').classList.remove('show')
	const imgslider = document.querySelector(`.imgslider-${counter}`)
	imgslider.classList.add('show')
	counter++

	if(counter >4){
		counter = 1
	}


}, 2000)

// --------mobile menu icone hide and show on click-----

var navLink = document.getElementById("navLink");
 
	function showMenu(){
		navLink.style.top = "0px";
		
	}
	function hideMenu(){
		navLink.style.top = "-500px"
		// navLink.style.display = "hidden";
	}

	var bar = document.getElementById("bar");
	var circle=document.getElementById("circle");

	bar.addEventListener('click',function(){
		bar.style.visibility= "hidden";
	});

	circle.addEventListener('click',function(){
		bar.style.visibility= "visible";
	});

// =============end----------------

// text animation code start here-----------

const txt = document.querySelector(".txt-2");

const txtLoad = () => {
	setTimeout(() => { 
		// Change the innerHTML property of your element to whatever you want
		txt.innerHTML = "vimalkumar";
		txt.style.color = "pink";
		
	},0)
	setTimeout(() => { 
		// Change the innerHTML property of your element to whatever you want
		txt.innerHTML = "Javascript";
		txt.style.color = "#f0db4f";
	},4000)
	setTimeout(() => { 

		txt.innerHTML = "React js";
		txt.style.color = "#0fd1fe";
	},8000)
	setTimeout(() => { 
		txt.innerHTML = "Node js";
		txt.style.color = "#333333";
	},12000)
	setTimeout(() => { 
		txt.innerHTML = "MongoDB";
		txt.style.color = "darkgreen";
	},16000)
}
txtLoad();
setInterval(txtLoad, 20000);



// --------------Swiper js auto slider code-----------

var swiper = new Swiper(".mySwiper", {
	slidesPerView: 3,
	spaceBetween: 30,
	// effect: "fade",
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});


var swiper2 = new Swiper(".mySwiper5", {
  grabCursor: true,
  effect: "creative",
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-120%", 0, -500],
    },
    next: {
      shadow: true,
      translate: ["120%", 0, -500],
    },
  },
});



// slider 3  -------slider 3----------------- slider 3----------

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

var swiper = new Swiper(".mySwiper3", {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},
	on: {
		autoplayTimeLeft(s, time, progress) {
			progressCircle.style.setProperty("--progress", 1 - progress);
			progressContent.textContent = `${Math.ceil(time / 1000)}s`;
		}
	}
});



// let counter = 1;

// setInterval(() => {
//     document.querySelector(".imgslider .show").classList.remove('show')
//     const imgslider = document.querySelector(`.img-${counter}`)
//     imgslider.classList.add('show')
//     counter++;

//     if (counter>5) {
//         counter = 1
//     }
// }, 2000)
