const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    products.forEach((product) => {
      const shouldShow = filter === "todos" || product.dataset.category === filter;
      product.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

document.querySelectorAll(".full-photo-banner").forEach((photoBanner) => {
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  photoBanner.style.position = "relative";
  photoBanner.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = canvas.width = photoBanner.offsetWidth;
  let height = canvas.height = photoBanner.offsetHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = photoBanner.offsetWidth;
    height = canvas.height = photoBanner.offsetHeight;
  });

  const particles = [];
  const maxParticles = 150; // Reduzido de 300 para 150

  const greenColors = ["#00ff88","#22ffaa","#33ffaa"];
  const pinkColors = ["#ff88cc","#ff66aa","#ff99dd"];

  function randomColor(array) {
    return array[Math.floor(Math.random()*array.length)];
  }

  function addParticles(x, y) {
    // Menos partículas por movimento (reduzido de 3 para 2)
    for(let i=0;i<2;i++){
      if(particles.length >= maxParticles) particles.shift();
      const angle = Math.random()*Math.PI*2;
      const speed = 0.5 + Math.random();
      particles.push({
        x: x + (Math.random()-0.5)*10,
        y: y + (Math.random()-0.5)*10,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed,
        size: 3 + Math.random()*4,
        color: i%2===0 ? randomColor(greenColors) : randomColor(pinkColors),
        alpha: 0.3 + Math.random()*0.7
      });
    }
  }

  function animate() {
    ctx.clearRect(0,0,width,height);
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.alpha -= 0.005;
      if(p.alpha<=0){
        particles.splice(i,1);
        i--;
        continue;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();

  function handleMove(clientX, clientY){
    const rect = photoBanner.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    addParticles(x,y);

    const shineX = ((clientX - rect.left)/rect.width)*100;
    const shineY = ((clientY - rect.top)/rect.height)*100;
    photoBanner.style.setProperty("--shine-x", `${shineX}%`);
    photoBanner.style.setProperty("--shine-y", `${shineY}%`);
  }

  // Mouse
  photoBanner.addEventListener("mousemove", (e)=>handleMove(e.clientX,e.clientY));

  // Touch multi-toque
  photoBanner.addEventListener("touchmove", (e)=>{
    e.preventDefault();
    Array.from(e.touches).forEach(touch => handleMove(touch.clientX, touch.clientY));
    
  },{passive:false});
});