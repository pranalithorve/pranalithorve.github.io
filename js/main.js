// Main interaction for portfolio: theme toggle, form submit, scroll animations
document.addEventListener('DOMContentLoaded',function(){
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  // Simple theme toggle -- keeps dark by default; stores pref in localStorage
  toggle.addEventListener('click',()=>{
    if(document.documentElement.hasAttribute('data-theme') && document.documentElement.getAttribute('data-theme') === 'light'){
      document.documentElement.removeAttribute('data-theme');
      toggle.textContent = '🌙';
      localStorage.setItem('theme','dark');
    } else {
      document.documentElement.setAttribute('data-theme','light');
      toggle.textContent = '☀️';
      localStorage.setItem('theme','light');
    }
  });
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){
    document.documentElement.setAttribute('data-theme','light');
    toggle.textContent = '☀️';
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    })
  });

  // Intersection observer for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    })
  },{threshold:0.12});
  document.querySelectorAll('[data-anim]').forEach(el=>io.observe(el));

  // Contact form submit (uses Formspree or similar). Update action attribute with your endpoint.
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      const status = form.querySelector('.form-status');
      status.textContent = 'Sending...';
      const action = form.getAttribute('action');
      const formData = new FormData(form);
      try{
        const res = await fetch(action,{
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();
        if(res.ok){
          status.textContent = 'Thanks — I will get back to you soon.';
          form.reset();
        } else {
          status.textContent = (data && data.error) ? data.error : 'There was a problem submitting the form.';
        }
      } catch(err){
        status.textContent = 'Network error. Try email: hello@example.com';
      }
    })
  }
});
