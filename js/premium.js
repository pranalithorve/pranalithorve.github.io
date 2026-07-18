// premium.js - refined interactions: typing phrases, counters, particles, copy email, active nav highlighting
(function(){
  document.addEventListener('DOMContentLoaded',function(){
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(()=>{loader.classList.add('hidden')},700);

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if(saved === 'light') { root.setAttribute('data-theme','light'); themeToggle.textContent='☀️' }
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
      const pct = (h.scrollTop||document.body.scrollTop)/(h.scrollHeight - h.clientHeight) || 0;
      progress.style.width = (pct*100)+'%';
    }
    window.addEventListener('scroll',updateProgress,{passive:true});
    updateProgress();

    // Typing effect -- updated phrases per spec
    const phrases = [
      'Scalable Backend Systems',
      'Cloud Native Applications',
      'AI Integration',
      'High Performance APIs',
      'Microservices Architecture',
      'Distributed Systems',
      'Performance Optimization'
    ];
    let pIndex=0,charIndex=0;const typed=document.getElementById('typed-text');
    function type(){
      const current = phrases[pIndex];
      typed.textContent = current.slice(0,charIndex);
      charIndex++;
      if(charIndex>current.length){
        setTimeout(()=>{charIndex=0;pIndex=(pIndex+1)%phrases.length;type()},1200);
      } else setTimeout(type,36);
    }
    if(typed) type();

    // Particles - performantly light
    const canvas = document.getElementById('particles');
    if(canvas && canvas.getContext){
      const ctx = canvas.getContext('2d');
      let w=canvas.width=canvas.offsetWidth;let h=canvas.height=canvas.offsetHeight;window.addEventListener('resize',()=>{w=canvas.width=canvas.offsetWidth;h=canvas.height=canvas.offsetHeight});
      const particles=[];const count=Math.max(18,Math.floor((w*h)/60000));
      for(let i=0;i<count;i++)particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.4,vx:(Math.random()-0.5)/2,vy:(Math.random()-0.5)/2,alpha:0.12+Math.random()*0.5});
      function loop(){ctx.clearRect(0,0,w,h);for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.fillStyle='rgba(255,255,255,'+p.alpha+')';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(loop);}loop();
    }

    // Counters animation
    const nums = document.querySelectorAll('.num');
    const io = new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;const target = Number(el.getAttribute('data-target'))||0;let start=0;const step=Math.max(1,Math.ceil(target/70));
          const t = setInterval(()=>{start+=step; if(start>=target){el.textContent = target.toLocaleString();clearInterval(t)} else el.textContent=start.toLocaleString()},20);
          obs.unobserve(el);
        }
      })
    },{threshold:0.2});
    nums.forEach(n=>io.observe(n));

    // In-view reveal animations
    const reveals = document.querySelectorAll('.section, .timeline-card, .project-card, .expertise-card, .profile-card');
    const io2 = new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:0.12});
    reveals.forEach(r=>io2.observe(r));

    // Copy email buttons
    function copyEmail(){navigator.clipboard.writeText('pranalithorve@gmail.com').then(()=>{const notice='Email copied to clipboard';console.info(notice)})}
    const copyBtn = document.getElementById('copy-email');if(copyBtn)copyBtn.addEventListener('click',()=>{copyEmail();copyBtn.textContent='Copied ✓';setTimeout(()=>copyBtn.textContent='Copy Email',1800)});
    const copyBtn2 = document.getElementById('copy-email-2');if(copyBtn2)copyBtn2.addEventListener('click',()=>{copyEmail();copyBtn2.textContent='Copied ✓';setTimeout(()=>copyBtn2.textContent='Copy Email',1800)});

    // Contact form submission (Formspree placeholder)
    const form = document.getElementById('contact-form');
    if(form){form.addEventListener('submit',async(e)=>{e.preventDefault();const status=form.querySelector('.form-status');status.textContent='Sending...';const action=form.getAttribute('action');const fd=new FormData(form);try{const res=await fetch(action,{method:'POST',body:fd,headers:{'Accept':'application/json'}});if(res.ok){status.textContent='Thanks — I will get back to you soon.';form.reset()}else{const data=await res.json();status.textContent=data.error||'Submission error'}}catch(err){status.textContent='Network error — try pranalithorve@gmail.com'}})}

    // Active nav highlight on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(a=>document.querySelector(a.getAttribute('href')));
    function onScroll(){const y=window.scrollY+120;sections.forEach((sec,i)=>{if(sec){const top=sec.offsetTop;const bottom=top+sec.offsetHeight;if(y>=top && y<bottom){navLinks.forEach(n=>n.classList.remove('active'));navLinks[i].classList.add('active')}})}
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();

    // Accessibility: focus outlines for keyboard users
    function handleFirstTab(e){if(e.key==='Tab'){document.body.classList.add('user-is-tabbing');window.removeEventListener('keydown',handleFirstTab)}}
    window.addEventListener('keydown',handleFirstTab);

  });
})();
