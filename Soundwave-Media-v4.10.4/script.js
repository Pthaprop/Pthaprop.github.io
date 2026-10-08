/*
  SOUNDWAVE QUICK EDIT AREA
  -------------------------
  Tell ChatGPT what you want changed and this file can be updated for you.

  For cover art / videos you add yourself:
  1. Put files inside the /assets folder.
  2. Change the paths below, e.g. image: "assets/my-cover.jpg"
  3. For a local video use mediaType: "video" and media: "assets/video.mp4"
  4. For YouTube use mediaType: "youtube" and media: the YouTube video ID.
  5. For a thumbnail/link use mediaType: "image" and media: "assets/thumb.jpg".
*/

const releases = [
  { title: "APARTHEID", artist: "PTHAPROPHET", type: "SINGLE", date: "OUT NOW", image: "assets/apartheid.jpg", link: "https://open.spotify.com/album/0CdQds6cEWWneYqF11mmyo?si=RncvQIXqSWOBXAcTPdq1UQ" },
  { title: "WELCOME 2 THA JUNGLE", artist: "SOUNDWAVE", type: "SINGLE", date: "OUT NOW", image: "assets/welcome-2-tha-jungle.jpg", link: "https://open.spotify.com/album/3iw68Ble1jbpUcNcvneCNu?si=g9wevyR9RM6LusGYKyouoA" },
  { title: "OUCH!", artist: "PTHAPROPHET", type: "SINGLE", date: "OUT NOW", image: "assets/ouch.jpg", link: "https://open.spotify.com/track/5BFv2g3IfQyHyKOkEMwIk6?si=2d007da431d74d26" }
];



const $ = (selector) => document.querySelector(selector);
const pad = (n) => String(n).padStart(2, "0");

// Mobile navigation
const menuButton = $(".menu-button");
const nav = $(".nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

// Releases carousel
let releaseIndex = 0;
function renderRelease() {
  const item = releases[releaseIndex];
  const stage = $(".release-stage");
  $("#release-title").textContent = item.title;
  $("#release-artist").textContent = item.artist;
  $("#release-type").textContent = item.type;
  $("#release-date").textContent = item.date;
  $("#release-count").textContent = `${pad(releaseIndex + 1)} / ${pad(releases.length)}`;
  $("#release-link").href = item.link || "#";

  const img = $("#release-image");
  const placeholder = $("#release-placeholder");
  if (item.image) {
    img.src = item.image;
    img.alt = `${item.title} cover art`;
    img.hidden = false;
    placeholder.hidden = true;
  } else {
    img.hidden = true;
    placeholder.hidden = false;
  }
  stage.classList.remove("fade-swap");
  void stage.offsetWidth;
  stage.classList.add("fade-swap");
}
$("#release-prev").addEventListener("click", () => { releaseIndex = (releaseIndex - 1 + releases.length) % releases.length; renderRelease(); });
$("#release-next").addEventListener("click", () => { releaseIndex = (releaseIndex + 1) % releases.length; renderRelease(); });

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

$("#year").textContent = new Date().getFullYear();
renderRelease();


// V4.5 — PTHAPROPHET destination chooser
const pthaTrigger = document.querySelector('.artist-choice-trigger');
const pthaOverlay = document.querySelector('#ptha-links');
const pthaClose = pthaOverlay?.querySelector('.artist-link-close');
const pthaBackdrop = pthaOverlay?.querySelector('.artist-overlay-backdrop');
let pthaLastFocus = null;
function openPthaLinks() {
  if (!pthaOverlay) return;
  pthaLastFocus = document.activeElement;
  pthaOverlay.hidden = false;
  const catalog = pthaOverlay.querySelector('[data-src]');
  if (catalog && !catalog.getAttribute('src')) catalog.src = catalog.dataset.src;
  document.body.classList.add('artist-overlay-open');
  requestAnimationFrame(() => pthaClose?.focus());
}
function closePthaLinks() {
  if (!pthaOverlay) return;
  pthaOverlay.hidden = true;
  document.body.classList.remove('artist-overlay-open');
  pthaLastFocus?.focus?.();
}
pthaTrigger?.addEventListener('click', openPthaLinks);
pthaClose?.addEventListener('click', closePthaLinks);
pthaBackdrop?.addEventListener('click', closePthaLinks);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && pthaOverlay && !pthaOverlay.hidden) closePthaLinks(); });

// Keep keyboard navigation inside the open chooser.
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab' || !pthaOverlay || pthaOverlay.hidden) return;
  const items = [...pthaOverlay.querySelectorAll('a[href], button, iframe')].filter(el => !el.classList.contains('artist-overlay-backdrop'));
  const first = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

// V4.10 roster Spotify dropdowns
document.querySelectorAll(".roster-preview-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.parentElement.querySelector(".roster-spotify-preview");
    const opening = panel.hidden;
    panel.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
  });
});
