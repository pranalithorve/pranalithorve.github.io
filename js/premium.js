// premium.js - animations, particles, typing, counters, theme toggle, accessibility
(function(){
  // Wait for DOM
  document.addEventListener('DOMContentLoaded',function(){
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(()=>{loader.classList.add('hidden')},800);

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if(saved === 'light') root.setAttribute('data-theme','light');
    themeToggle.addEventListener('click',()=>{
      if(root.getAttribute('data-theme')==='light'){root.removeAttribute('data-theme');localStorage.setItem('theme','dark');themeToggle.textContent='🌙'}else{root.setAttribute('data-theme','light');localStorage.setItem('theme','light');themeToggle.textContent='☀️'}
    });

    // Scroll to top
    const topBtn = document.getElementById('scroll-top');
    topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

    // Scroll progress
    const progress = document.getElementById('progress-bar');
    function updateProgress(){
      const h = document.documentElement;
      const pct = (h.scrollTop||document.body.scrollTop)/(h.scrollHeight - h.clientHeight);
      progress.style.width = (pct*100)+'%';
    }
    window.addEventListener('scroll',updateProgress,{passive:true});
    updateProgress();

    // Typing effect
    const phrases = ['Backend Architecture','Cloud-native Applications','AI Integrations','Performance & Scalability'];
    let pIndex=0,charIndex=0;const typed=document.getElementById('typed-text');
    function type(){
      const current = phrases[pIndex];
      typed.textContent = current.slice(0,charIndex);
      charIndex++;
      if(charIndex>current.length){
        setTimeout(()=>{charIndex=0;pIndex=(pIndex+1)%phrases.length;type()},1000);
      } else setTimeout(type,40);
    }
    type();

    // Particles - simple floating dots
    const canvas = document.getElementById('particles');
    if(canvas && canvas.getContext){
      const ctx = canvas.getContext('2d');
      let w=canvas.width=canvas.offsetWidth;let h=canvas.height=canvas.offsetHeight;window.addEventListener('resize',()=>{w=canvas.width=canvas.offsetWidth;h=canvas.height=canvas.offsetHeight});
      const particles=[];const count=Math.max(24,Math.floor((w*h)/40000));
      for(let i=0;i<count;i++)particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+0.6,vx:(Math.random()-0.5)/1.5,vy:(Math.random()-0.5)/1.5,alpha:0.2+Math.random()*0.6});
      function loop(){ctx.clearRect(0,0,w,h);for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.fillStyle='rgba(255,255,255,'+p.alpha+')';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(loop);}loop();
    }

    // Counters animation
    const nums = document.querySelectorAll('.num');
    const io = new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;const target = Number(el.getAttribute('data-target'))||0;let start=0;const step=Math.ceil(target/70);
          const t = setInterval(()=>{start+=step; if(start>=target){el.textContent = target.toLocaleString();clearInterval(t)} else el.textContent=start.toLocaleString()},20);
          obs.unobserve(el);
        }
      })
    },{threshold:0.2});
    nums.forEach(n=>io.observe(n));

    // Smooth in-view animations for sections
    const reveals = document.querySelectorAll('.section, .hero-copy, .profile-card, .project-card, .tl-item, .timeline-card');
    const io2 = new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:0.12});
    reveals.forEach(r=>io2.observe(r));

    // Contact form submission
    const form = document.getElementById('contact-form');
    if(form){form.addEventListener('submit',async(e)=>{e.preventDefault();const status=form.querySelector('.form-status');status.textContent='Sending...';const action=form.getAttribute('action');const fd=new FormData(form);try{const res=await fetch(action,{method:'POST',body:fd,headers:{'Accept':'application/json'}});if(res.ok){status.textContent='Thanks — I will get back to you soon.';form.reset()}else{const data=await res.json();status.textContent=data.error||'Submission error'}}catch(err){status.textContent='Network error — try pranalithorve@gmail.com'}})}

    // Lazy loading images - if any
    if('loading' in HTMLImageElement.prototype){const imgs=document.querySelectorAll('img[loading="lazy"]');imgs.forEach(i=>{});} // placeholder

  });
})();
