// text_iife.js: Rotating text in the main section
(function() {
  const spanEl = document.querySelector("main h2 span");
  const txtArr = ['Developer', 'Designer', 'Creator'];
  let index = 0;
  let currentTxt = txtArr[index].split("");
  function writeTxt() {
    spanEl.textContent += currentTxt.shift();
    if (currentTxt.length !== 0) {
      setTimeout(writeTxt, Math.random() * 100);
    } else {
      currentTxt = spanEl.textContent.split("");
      setTimeout(deleteTxt, 3000);
    }
  }
  function deleteTxt() {
    currentTxt.pop();
    spanEl.textContent = currentTxt.join("");
    if (currentTxt.length !== 0) {
      setTimeout(deleteTxt, Math.random() * 100);
    } else {
      index = (index + 1) % txtArr.length;
      currentTxt = txtArr[index].split("");
      writeTxt();
    }
  }
  writeTxt();
})();

// scroll_request.js: Sticky header activation
const headerEl = document.querySelector("header");
window.addEventListener("scroll", function() {
  requestAnimationFrame(scrollCheck);
});
function scrollCheck() {
  const browserScrollY = window.scrollY || window.pageYOffset;
  if (browserScrollY > 0) {
    headerEl.classList.add("active");
  } else {
    headerEl.classList.remove("active");
  }
}

// form_submission.js: Handle contact form submissions
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const responseMessage = document.getElementById("responseMessage");
  responseMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
});
