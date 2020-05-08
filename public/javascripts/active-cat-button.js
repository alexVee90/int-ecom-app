
var links = Array.from(document.getElementsByClassName("nav-link"));

links.forEach( (link, index, linksArray) => {
  link.addEventListener('click', () => { 
    linksArray.forEach( l => l.className = 'nav-link')
    link.className = 'nav-link';
    link.className += ' active-nav-tag';
  })
})

