// Carousel
let next = document.getElementById('next'); //	get the next button
let prev = document.getElementById('prev'); // get the prev button
let carousel = document.querySelector('.carousel'); // get the carousel
let items = document.querySelectorAll('.carousel .item'); // get all items
let countItem = items.length; // get the number of items
let active = 1; // active item
let other_1 = null;	// other item
let other_2 = null; // other item

// Auto sliding
next.onclick = () => { // click the next button
    carousel.classList.remove('prev'); // remove the prev class
    carousel.classList.add('next'); // add the next class
    active =active + 1 >= countItem ? 0 : active + 1; // active = active + 1
    other_1 =active - 1 < 0 ? countItem -1 : active - 1; // other_1 = active - 1
    other_2 = active + 1 >= countItem ? 0 : active + 1; // other_2 = active + 1
    changeSlider(); 
}

// Manual sliding
prev.onclick = () => {
    carousel.classList.remove('next'); 
    carousel.classList.add('prev');
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    other_1 = active + 1 >= countItem ? 0 : active + 1;
    other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
    changeSlider();
}

// Change slider
const changeSlider = () => { 
    let itemOldActive = document.querySelector('.carousel .item.active'); // get the active item
    if(itemOldActive) itemOldActive.classList.remove('active');

    let itemOldOther_1 = document.querySelector('.carousel .item.other_1');
    if(itemOldOther_1) itemOldOther_1.classList.remove('other_1');

    let itemOldOther_2 = document.querySelector('.carousel .item.other_2');
    if(itemOldOther_2) itemOldOther_2.classList.remove('other_2');

    items.forEach(e => {
        e.querySelector('.image img').style.animation = 'none'; // stop the animation
        e.querySelector('.image figcaption').style.animation = 'none';
        void e.offsetWidth; // reflow
        e.querySelector('.image img').style.animation = ''; // start the animation
        e.querySelector('.image figcaption').style.animation = ''; 
    })
    
	// Change indicators
    items[active].classList.add('active'); 
    items[other_1].classList.add('other_1');
    items[other_2].classList.add('other_2');

	// Change content
    clearInterval(autoPlay); // stop auto sliding
    autoPlay = setInterval(() => { // start auto sliding
        next.click(); // click the next button
    }, 5000);
} // end changeSlider

// Auto sliding
let autoPlay = setInterval(() => { 
    next.click(); 
}, 5000);

// testimonials
	// Access the testimonials
	let testSlide = document.querySelectorAll('.testItem');
	// Access the indicators
	let dots = document.querySelectorAll('.dot');

	var counter = 0;

	// Add click event to the indicators
	function switchTest(currentTest){ // get the current test
		currentTest.classList.add('active'); // add active class
		var testId = currentTest.getAttribute('attr'); // get the test id
		if(testId > counter){
			testSlide[counter].style.animation = 'next1 0.5s ease-in forwards'; // next animation
			counter = testId;
			testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
		}
		else if(testId == counter){return;}
		else{
			testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards'; // previous animation
			counter = testId;
			testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
		}
		indicators(); // add active class to the indicators
	}

	// Add and remove active class from the indicators
	function indicators(){
		for(i = 0; i < dots.length; i++){
			dots[i].className = dots[i].className.replace(' active', '');
		}
		dots[counter].className += ' active';
	}

	// Code for auto sliding
	function slideNext(){
		testSlide[counter].style.animation = 'next1 0.5s ease-in forwards'; // next animation
		if(counter >= testSlide.length - 1){
			counter = 0;
		}
		else{
			counter++;
		}
		testSlide[counter].style.animation = 'next2 0.5s ease-in forwards'; // next animation
		indicators();
	}
	function autoSliding(){
		deleteInterval = setInterval(timer, 2000); // start auto sliding
		function timer(){
			slideNext();
			indicators();
		}
	}
	autoSliding();

	// Stop auto sliding when mouse is over the indicators
	const container = document.querySelector('.indicators'); 
	container.addEventListener('mouseover', pause);
	function pause(){
		clearInterval(deleteInterval);
	}

	// Resume sliding when mouse is out of the indicators
	container.addEventListener('mouseout', autoSliding);