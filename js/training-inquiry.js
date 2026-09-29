/* Keep the existing contact workflow, with a focused L-29 training entry point. */
(function () {
  "use strict";
  if (new URLSearchParams(window.location.search).get("training") !== "l29") return;
  var form = document.getElementById("contactForm");
  if (!form) return;
  document.querySelector(".form-title").textContent = "SCHEDULE L-29 TRAINING";
  document.querySelector(".contact-lead").textContent = "Ready for your L-29 checkout? Tell us about your flight experience, preferred dates and whether you would like to train at Double Eagle or Moriarty.";
  form.querySelector('[name="_subject"]').value = "L-29 training inquiry — LBAeroFlight.com";
  form.querySelector('[name="message"]').placeholder = "Flight experience, preferred dates and training location";
  form.querySelector('button[type="submit"]').textContent = "REQUEST L-29 TRAINING";
})();
