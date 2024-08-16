// Page Loading
var pageLoading = document.querySelector('.status-loading');

if (pageLoading) {
  function hideLoadStatus() {
    pageLoading.classList.add('hide');
  
    setTimeout(() => {
      pageLoading.style.display = 'none';
    }, 1000);
  }
  
  function showLoadStatus() {
    pageLoading.style.display = 'flex';
  
    setTimeout(() => {
      pageLoading.classList.remove('hide');
    }, 150);
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      hideLoadStatus();
    }, 1000);
  })
}

// Scrolling
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}

// Navbar
const navbarToggle = document.querySelector('[data-web-toggle=navbar-collapse]');

navbarToggle.addEventListener('click',function(){
  const dataTarget = this.dataset.webTarget,
        targetElement = document.getElementById(dataTarget),
        isExpanded = this.ariaExpanded === 'true';

  if (!targetElement) {
    return;
  }

  targetElement.classList.toggle('show');
  this.ariaExpanded = !isExpanded;
})

// Change Sticky Navbar
window.addEventListener('scroll',function(){
  const nav = document.querySelector('.navbar');
  
  if (this.scrollY >= 30) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
})

// Color Scheme
const colorScheme = document.querySelector('[data-web-trigger=color-scheme]'),
      html = document.querySelector('html');

window.addEventListener('load',function(){
  var storage = localStorage.getItem('Inazuma_WebTheme');

  if (storage == 'light') {
    colorScheme.innerHTML = '<i class="lni lni-night"></i>';
  } else if (storage == 'dark') {
    colorScheme.innerHTML = '<i class="lni lni-sun"></i>';
  } else {
    storage = 'light';
    localStorage.setItem('Inazuma_WebTheme',storage);
    colorScheme.innerHTML = '<i class="lni lni-night"></i>';
  }

  html.dataset.webTheme = storage;
})

colorScheme.addEventListener('click',function(){
  var storage = localStorage.getItem('Inazuma_WebTheme');

  if (storage == 'dark') {
    storage = 'light';
    colorScheme.innerHTML = '<i class="lni lni-night"></i>';
  } else {
    storage = 'dark';
    colorScheme.innerHTML = '<i class="lni lni-sun"></i>';
  }
  
  localStorage.setItem('Inazuma_WebTheme',storage);
  html.dataset.webTheme = storage;
})

// Scrollspy
function scrollspy(event) {
  var sections = document.querySelectorAll('.page-scroll'),
      scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  for (let i = 0; i < sections.length; i++) {
    var currentLink = sections[i],
        val = currentLink.getAttribute('href'),
        refElement = document.querySelector(val),
        scrollTopMinus = scrollPos + 74;

    if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
      document.querySelector('.page-scroll').classList.remove('active');
      currentLink.classList.add('active');
    } else {
      currentLink.classList.remove('active');
    }
  }
}

window.document.addEventListener('scroll',scrollspy);

// Menu Scroll
const pageLink = document.querySelectorAll('.page-scroll');

pageLink.forEach(link => {
  link.addEventListener('click',function(e){
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      offsetTop: 1- 60,
    });
    
    const navMenu = e.target.closest = document.querySelector('.navbar-collapse');
    navMenu.classList.remove('show');
  })
});

// Scroll Reveal
// const sr = ScrollReveal({
//   origin: 'top',
//   distance: '30px',
//   duration: 2000,
//   reset: true,
// });

// sr.reveal(`.scroll-revealed`, {
//   interval: 200,
// })

// Tabs
const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  const links = document.querySelectorAll('.tabs-nav .nav-link'),
        contents = document.querySelectorAll('.tabs-content');

  if (!contents) {
    return;
  }

  window.addEventListener('load',function(){
    for (let i = 0; i < contents.length; i++) {
      contents[i].classList.add('hide');
    }

    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
      links[i].ariaSelected = false;
    }

    links[0].classList.add('active');
    links[0].ariaSelected = true;
    
    const dataTarget = links[0].dataset.webTarget,
          targetElement = document.getElementById(dataTarget);

    targetElement.classList.remove('hide');
  })

  links.forEach(link => {
    const dataTarget = link.dataset.webTarget,
          targetElement = document.getElementById(dataTarget);

    if (targetElement) {
      link.addEventListener('click',function(){
        for (let i = 0; i < contents.length; i++) {
          contents[i].classList.add('hide');
        }

        for (let i = 0; i < links.length; i++) {
          links[i].classList.remove('active');
          links[i].ariaSelected = false;
        }

        link.classList.add('active');
        link.ariaSelected = true;
        targetElement.classList.remove('hide');
      })
    } else {
      link.disabled = true;
    }
  });
});

// Portfolio Filter
const portfolioFilters = document.querySelectorAll('.portfolio-menu button');

portfolioFilters.forEach(filter => {
  filter.addEventListener('click',function(){
    let btn = portfolioFilters[0];

    while (btn) {
      if (btn.tagName === 'BUTTON') {
        btn.classList.remove('active');
      }

      btn = btn.nextSibling;
    }

    this.classList.add('active');

    let selected = filter.getAttribute('data-filter'),
        itemsToHide = document.querySelectorAll('.portfolio-grid .portfolio:not([data-filter="' + selected + '"])'),
        itemsToShow = document.querySelectorAll('.portfolio-grid .portfolio[data-filter="' + selected + '"]');

    if (selected == 'all') {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll('.portfolio-grid .portfolio[data-filter]');
    }

    itemsToHide.forEach(el => {
      el.classList.add('hide');
      el.classList.remove('show');
    });

    itemsToShow.forEach(el => {
      el.classList.remove('hide');
      el.classList.add('show');
    });
  })
});

// Scroll to Top
var st = document.querySelector('[data-web-trigger=scroll-top]');

if (st) {
  window.addEventListener('scroll', function () {
    st.classList.toggle("visible", window.scrollY > 50)
  })

  st.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

// GLightBox
GLightbox({
  selector: '.video-player',
  href: 'https://www.youtube.com/watch?v=r44RKWyfcFw&fbclid=IwAR21beSJORalzmzokxDRcGfkZA1AtRTE__l5N4r09HcGS5Y6vOluyouM9EM',
  type: 'video',
  source: 'youtube',
  width: 900,
  autoplayVideos: true,
});

const myGallery3 = GLightbox({
  selector: ".portfolio-box",
  type: "image",
  width: 900,
});
