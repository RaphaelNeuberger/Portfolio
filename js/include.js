// Simple JS include for header and footer

function includeHTML(selector, url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    });
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('#header-include')) {
    includeHTML('#header-include', 'header.html');
  }
  if (document.querySelector('#footer-include')) {
    includeHTML('#footer-include', 'footer.html');
  }
});
