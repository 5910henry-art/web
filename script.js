// THEME TOGGLE
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('dark') ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// TYPEWRITER HEADER
const text = "Hi, I’m Henry 🌍";
let i = 0;
function typeWriter() {
    if(i < text.length){
        document.getElementById("header-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

// FADE-IN SECTIONS
const faders = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.2 });
faders.forEach(fader => fadeObserver.observe(fader));

// SKILLS ANIMATION
const skills = document.querySelectorAll('.progress-bar');
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.width = entry.target.getAttribute('data-progress');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
skills.forEach(skill => skillObserver.observe(skill));

// SLIDE-IN
const slideLeftElems = document.querySelectorAll('.slide-left');
const slideRightElems = document.querySelectorAll('.slide-right');
const slideObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            if(entry.target.classList.contains('slide-left')) entry.target.classList.add('visible-left');
            if(entry.target.classList.contains('slide-right')) entry.target.classList.add('visible-right');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
slideLeftElems.forEach(el => slideObserver.observe(el));
slideRightElems.forEach(el => slideObserver.observe(el));

// BACK TO TOP BUTTON
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

// CONTACT FORM HANDLER
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageInput = document.getElementById('messageInput').value;
    console.log(`Name: ${name}, Email: ${email}, Message: ${messageInput}`);
    formMessage.textContent = "Thank you! Your message has been sent. 🙌";
    contactForm.reset();
});

// PARTICLE BACKGROUND
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particlesArray = [];
const colors = ["#ffffff","#4b6cb7","#182848"];
class Particle { constructor(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*3+1; this.speedX=Math.random()*1-0.5; this.speedY=Math.random()*1-0.5; this.color=colors[Math.floor(Math.random()*colors.length)]; }
update(){ this.x+=this.speedX; this.y+=this.speedY; if(this.x>canvas.width)this.x=0; if(this.x<0)this.x=canvas.width; if(this.y>canvas.height)this.y=0; if(this.y<0)this.y=canvas.height; }
draw(){ ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); } }
function initParticles(num){ particlesArray=[]; for(let i=0;i<num;i++)particlesArray.push(new Particle()); }
initParticles(100);
function animateParticles(){ ctx.clearRect(0,0,canvas.width,canvas.height); particlesArray.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animateParticles); }
animateParticles();
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; initParticles(100); });
