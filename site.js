// Shared pieces for the mock-up: header, hero buttons, section CTAs, the
// call + form block, the location block, footer and the mobile bar. Each page
// drops in <div data-slot="..."></div> and this fills it, so pages stay identical.
// Static front-end only: nothing here talks to a server.

const PHONE = "(205) 937-9960";
const TEL = "tel:+12059379960";
const EMAIL = "tommy@themajorslawfirm.com";
const ADDRESS = "3684 Cahaba Beach Rd, Birmingham, AL 35242";
const MAP = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);
// Keyless Google Maps embed; works from static hosting.
const MAP_EMBED = "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&output=embed";
const CTA = "Tell us about your matter";
const AREAS = ["Real Property Law", "Business Facilitation", "Estate Planning", "Not sure yet"];

// Marks details that are assumed for the mock-up and need Tommy's sign-off.
const TBC = '<span class="tbc">To confirm</span>';

const phoneIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';

const page = document.body.dataset.page || "";
const cur = (name) => (page === name ? ' aria-current="page"' : "");

const buttons = () => `
  <div class="pair">
    <a class="btn btn-call" href="${TEL}">${phoneIcon}Call ${PHONE}</a>
    <a class="btn btn-form" href="#consult">${CTA}</a>
  </div>`;

const hours = () => `
  <p class="hours">Monday to Friday, 8:30 AM to 5:30 PM. Closed Saturday and Sunday. Visits by appointment. ${TBC}</p>`;

const formFields = (area, withMessage) => `
  <form class="consult-form" novalidate>
    <label>Your name
      <input name="name" autocomplete="name" required>
    </label>
    <label>Email
      <input name="email" type="email" autocomplete="email">
    </label>
    <label>Phone
      <input name="phone" type="tel" autocomplete="tel">
    </label>
    <label>Practice area
      <select name="area">
        ${AREAS.map((a) => `<option${a === area ? " selected" : ""}>${a}</option>`).join("")}
      </select>
    </label>
    ${withMessage ? `<label>Message <small>A sentence or two is plenty.</small>
      <textarea name="message"></textarea>
    </label>` : ""}
    <button class="btn btn-form" type="submit">Send</button>
    <p class="form-msg" role="status"></p>
  </form>
  <p class="terms">Initial consultation: about 30 minutes, by phone or in person, by appointment. ${TBC}</p>`;

const slots = {
  header: () => `
    <div class="mock-note">Design mock-up. Dashed boxes are placeholders. “To confirm” marks details Tommy must approve before publishing.</div>
    <header class="site-header">
      <div class="wrap header-inner">
        <div class="header-row">
          <a class="brand" href="index.html">
            <img src="majorlogo.png" alt="The Majors Law Firm, home" width="884" height="165">
          </a>
          <div class="header-actions">
            <a class="btn btn-call" href="${TEL}">${phoneIcon}<span>${PHONE}</span></a>
            <a class="btn btn-form" href="#consult">${CTA}</a>
          </div>
        </div>
        <nav class="nav" aria-label="Main">
          <a href="index.html#practice-areas"${cur("practice")}>Practice Areas</a>
          <a href="about.html"${cur("about")}>About</a>
          <a href="contact.html"${cur("contact")}>Contact</a>
        </nav>
      </div>
    </header>`,

  // The equal call / form buttons used in every hero, with the address beneath.
  pair: () => `
    ${buttons()}
    <p class="hero-addr"><a href="${MAP}" target="_blank" rel="noopener">${ADDRESS}</a></p>`,

  // Short form that sits beside the hero copy; data-area preselects the topic.
  heroform: (el) => `
    <div class="hero-form">
      <h2>${CTA}</h2>
      ${formFields(el.dataset.area, false)}
    </div>`,

  // Call + form buttons that close each section.
  next: (el) => `
    <div class="cta">
      <strong>${el.dataset.text || "Ready to talk?"}</strong>
      ${buttons()}
      ${el.dataset.link ? `<a class="more-link" href="${el.dataset.link}">${el.dataset.linkText} →</a>` : ""}
    </div>`,

  consult: () => `
    <section id="consult" class="tint">
      <div class="wrap">
        <p class="eyebrow">Talk with Tommy</p>
        <h2>Call or write. Whichever is easier.</h2>
        <div class="consult-grid">
          <div class="panel">
            <h3>Call</h3>
            <a class="big-phone" href="${TEL}">${PHONE}</a>
            <a class="btn btn-call" href="${TEL}">${phoneIcon}Tap to call</a>
            <ul class="contact-list">
              <li><b>Email</b><a href="mailto:${EMAIL}">${EMAIL}</a></li>
              <li><b>Office</b><a href="${MAP}" target="_blank" rel="noopener">${ADDRESS}</a></li>
              <li><b>Hours</b>${hours()}</li>
            </ul>
          </div>
          <div class="panel">
            <h3>${CTA}</h3>
            ${formFields("Not sure yet", true)}
          </div>
        </div>
      </div>
    </section>`,

  location: () => `
    <section id="location">
      <div class="wrap">
        <p class="eyebrow">Find the office</p>
        <h2>3684 Cahaba Beach Rd, Birmingham</h2>
        <div class="location-grid">
          <iframe class="map" title="Map showing ${ADDRESS}" src="${MAP_EMBED}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
          <div>
            <figure class="building">
              <img src="buildingphoto.jpg" alt="Brick office building with a parking lot in front" width="1600" height="1200" loading="lazy">
              <figcaption>The office building. ${TBC}</figcaption>
            </figure>
            <p>${ADDRESS}</p>
            ${hours()}
            <p><a class="btn" href="${MAP}" target="_blank" rel="noopener">Get directions</a></p>
          </div>
        </div>
        ${slots.next({ dataset: { text: "Coming by? Set up a time first." } })}
      </div>
    </section>`,

  footer: () => `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <img class="footer-logo" src="majorlogo.png" alt="The Majors Law Firm" width="884" height="165" loading="lazy">
            <p>The Majors Law Firm, LLC<br><a href="${MAP}" target="_blank" rel="noopener">${ADDRESS}</a></p>
            <p><a href="${TEL}">${PHONE}</a><br><a href="mailto:${EMAIL}">${EMAIL}</a></p>
          </div>
          <div>
            <h3>Practice Areas</h3>
            <ul>
              <li><a href="real-property.html">Real Property Law</a></li>
              <li><a href="business-facilitation.html">Business Facilitation</a></li>
              <li><a href="estate-planning.html">Estate Planning</a></li>
            </ul>
          </div>
          <div>
            <h3>Firm</h3>
            <ul>
              <li><a href="about.html">About Tommy</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="#consult">${CTA}</a></li>
            </ul>
          </div>
        </div>
        <p class="fine">“No representation is made that the quality of the legal services to be performed is greater than the quality of legal services performed by other lawyers.” Attorney Advertising. This website is for general information only and is not legal advice. Contacting the firm does not create an attorney-client relationship. ${TBC}</p>
        <p class="fine">© The Majors Law Firm, LLC. Mock-up for review; not the live site.</p>
      </div>
    </footer>
    <div class="mobile-bar">
      <a class="btn btn-call" href="${TEL}">${phoneIcon}Call</a>
      <a class="btn btn-form" href="#consult">${CTA}</a>
    </div>`,
};

document.querySelectorAll("[data-slot]").forEach((el) => {
  const make = slots[el.dataset.slot];
  if (make) el.outerHTML = make(el);
});

// The form is a mock-up: validate, then confirm on the page without sending.
document.querySelectorAll(".consult-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.querySelector(".form-msg");
    const name = form.elements.name;
    const email = form.elements.email;
    const phone = form.elements.phone;
    let problem = "";
    let field = null;
    if (!name.value.trim()) {
      problem = "Please add your name.";
      field = name;
    } else if (!email.value.trim() && !phone.value.trim()) {
      problem = "Please add an email or a phone number so Tommy can reply.";
      field = email;
    }
    msg.classList.add("show");
    if (problem) {
      msg.textContent = problem;
      field.focus();
      return;
    }
    msg.textContent = `Mock-up only: nothing was sent. On the live site this would confirm your message. To reach Tommy now, call ${PHONE}.`;
  });
});
