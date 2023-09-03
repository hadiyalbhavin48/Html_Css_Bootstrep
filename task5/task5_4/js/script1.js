const wrapper1 = document.querySelector(".wrapper1");
const carousel1 = document.querySelector(".testimonial_slider1");
const firstCardWidth1 = carousel1.querySelector(".card1").offsetWidth;
const arrowBtns1 = document.querySelectorAll(".wrapper1 i");
const carouselChildrens1 = [...carousel1.children];

let isDragging1 = false, isAutoPlay1 = true, startX1, startScrollLeft1, timeoutId1;

// Get the number of cards that can fit in the carousel1 at once
let cardPerView1 = Math.round(carousel1.offsetWidth / firstCardWidth1);

// Insert copies of the last few cards to beginning of carousel1 for infinite scrolling
carouselChildrens1.slice(-cardPerView1).reverse().forEach(card1 => {
    carousel1.insertAdjacentHTML("afterbegin", card1.outerHTML);
});

// Insert copies of the first few cards to end of carousel1 for infinite scrolling
carouselChildrens1.slice(0, cardPerView1).forEach(card1 => {
    carousel1.insertAdjacentHTML("beforeend", card1.outerHTML);
});

// Scroll the carousel1 at appropriate postition to hide first few duplicate cards on Firefox
carousel1.classList.add("no-transition");
carousel1.scrollLeft = carousel1.offsetWidth;
carousel1.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel1 left and right
arrowBtns1.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel1.scrollLeft += btn.id == "left" ? -firstCardWidth1 : firstCardWidth1;
    });
});

const dragStart1 = (e) => {
    isDragging1 = true;
    carousel1.classList.add("dragging1");
    // Records the initial cursor and scroll position of the carousel1
    startX1 = e.pageX;
    startScrollLeft1 = carousel1.scrollLeft;
}

const dragging1 = (e) => {
    if (!isDragging1) return; // if isDragging1 is false return from here
    // Updates the scroll position of the carousel1 based on the cursor movement
    carousel1.scrollLeft = startScrollLeft1 - (e.pageX - startX1);
}

const dragStop1 = () => {
    isDragging1 = false;
    carousel1.classList.remove("dragging1");
}

const infiniteScroll1 = () => {
    // If the carousel1 is at the beginning, scroll to the end
    if (carousel1.scrollLeft === 0) {
        carousel1.classList.add("no-transition");
        carousel1.scrollLeft = carousel1.scrollWidth - (2 * carousel1.offsetWidth);
        carousel1.classList.remove("no-transition");
    }
    // If the carousel1 is at the end, scroll to the beginning
    else if (Math.ceil(carousel1.scrollLeft) === carousel1.scrollWidth - carousel1.offsetWidth) {
        carousel1.classList.add("no-transition");
        carousel1.scrollLeft = carousel1.offsetWidth;
        carousel1.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel1
    clearTimeout(timeoutId1);
    if (!wrapper1.matches(":hover")) autoPlay1();
}

const autoPlay1 = () => {
    if (window.innerWidth < 800 || !isAutoPlay1) return; // Return if window is smaller than 800 or isAutoPlay1 is false
    // Autoplay the carousel1 after every 2500 ms
    timeoutId1 = setTimeout(() => carousel1.scrollLeft += firstCardWidth1, 2500);
}
autoPlay1();

carousel1.addEventListener("mousedown", dragStart1);
carousel1.addEventListener("mousemove", dragging1);
document.addEventListener("mouseup", dragStop1);
carousel1.addEventListener("scroll", infiniteScroll1);
wrapper1.addEventListener("mouseenter", () => clearTimeout(timeoutId1));
wrapper1.addEventListener("mouseleave", autoPlay1);



// product 2


