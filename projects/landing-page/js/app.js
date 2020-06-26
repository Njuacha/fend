/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const navBarList = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * This method returns true when an element's visibility in viewport is above the the percentVisible arguement
*/
const isElementXPercentInViewport = (el, percentVisible) => {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};

/**
 * This function scrolls smoothly to an element
*/
const scrollToElement = (target) => {
    // determine height from top + nav bar height
    let section = document.querySelector(target.hash);
    let height = section.offsetTop - navBarList.offsetHeight;

    scrollTo({
        top      : height,
        behavior : 'smooth'
    });
};


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/


/**
 * build the nav
*/
const sections = document.querySelectorAll('[data-nav]');
const navMenuFragment = document.createDocumentFragment();

for (const section of sections) {
  const id = section.getAttribute('id');
  const sectionName = section.getAttribute('data-nav');
  // create list item an append to navMenuFragment
  const menuItem = document.createElement('li');
  menuItem.innerHTML = `<a href= #${id} class="menu__link"> ${sectionName} </a>`;

  navMenuFragment.appendChild(menuItem);
}

navBarList.appendChild(navMenuFragment);



/*
* This section adds class active to section when near top of viewport
*/
let currentlyActiveSection ;
window.addEventListener('scroll', function(){
  let count = 0;
  for (section of sections) {
    // check if section is above 50% visible in the view port
    if(isElementXPercentInViewport(section, 50)) {
      // if the section is not already active then set it as active
      if (currentlyActiveSection != section){
        // make the previous section and it's corresponding nav menu link inactive
        if (currentlyActiveSection != null){
          currentlyActiveSection.classList.remove('active');
          const id1 = currentlyActiveSection.id;
          navBarList.querySelector("li a[href='#"+ id1 + "']").classList.remove('active');
        }
        // make the current section and it's corresponding nav menu link active
        section.classList.add('active');
        const id2 = section.id;

        navBarList.querySelector("li a[href='#"+ id2 + "']").classList.add('active');
        currentlyActiveSection = section;
      }

      break;
    }

  }
});

// Scroll to anchor ID using scrollTO event
navBarList.addEventListener('click', function(e) {
  // prevent default behavoir which makes the page jump to section
   event.preventDefault();
   if(e.target.nodeName === 'A') {
     scrollToElement(e.target);
   }
  // TODO: Make the scrolling to be smooth or animated and not just a jump
});

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
