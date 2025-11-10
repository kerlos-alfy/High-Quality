
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href && href.endsWith(path)) a.classList.add('active');
  });
})();

function initVideoWithFallback(videoId, imgId){
  const v = document.getElementById(videoId);
  const img = document.getElementById(imgId);
  if(!v) return;
  const showImg = ()=>{ if(img){ img.classList.remove('hidden'); } v.classList.add('hidden'); };
  v.addEventListener('error', showImg);
  v.addEventListener('stalled', showImg);
  const tryPlay = ()=> v.play().catch(()=>{});
  if (document.visibilityState === 'visible') tryPlay();
  document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='visible') tryPlay(); });
  if (!('play' in v)) showImg();
}
['logoHeader','logoHero','logoFooter'].forEach(id=>initVideoWithFallback(id, id+'Fallback'));


// Simple Lightbox
document.addEventListener('click', function(e){
  const a = e.target.closest('a.glink');
  if(!a) return;
  e.preventDefault();
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;';
  const img = document.createElement('img');
  img.src = a.getAttribute('href');
  img.style.cssText = 'max-width:96vw;max-height:92vh;border-radius:12px;box-shadow:0 40px 80px rgba(0,0,0,.6)';
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', ()=> overlay.remove());
  window.addEventListener('keydown', (ev)=>{ if(ev.key==='Escape') overlay.remove(); }, {once:true});
});
