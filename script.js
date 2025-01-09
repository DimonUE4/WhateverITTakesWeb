// Переключение этапов сюрприза
document.getElementById("open-btn").addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("gift-box").classList.remove("hidden");
  });
  
  document.querySelector(".box").addEventListener("click", () => {
    const box = document.querySelector(".box");
    box.classList.add("open");
    startConfetti(); // Запуск конфетти
  
    setTimeout(() => {
      document.getElementById("gift-box").classList.add("hidden");
      document.getElementById("card").classList.remove("hidden");
      stopConfetti(); // Остановка конфетти через 3 секунды
    }, 1000);
  });
  
  document.getElementById("more-btn").addEventListener("click", () => {
    document.getElementById("card").classList.add("hidden");
    alert("Сюрпризы не заканчиваются! ❤️");
  });
  
  // Конфетти
  let confetti;
  function startConfetti() {
    confetti = document.getElementById("confetti");
    confetti.classList.remove("hidden");
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;
  
    const context = confetti.getContext("2d");
    const particles = [];
    const colors = ["#FFD700", "#FF4500", "#FF69B4", "#ADFF2F", "#1E90FF"];
  
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * confetti.width,
        y: Math.random() * confetti.height - confetti.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 5 + 2,
        speed: Math.random() * 3 + 1,
      });
    }
  
    function draw() {
      context.clearRect(0, 0, confetti.width, confetti.height);
      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += Math.sin(particle.y / 20) * 2;
  
        if (particle.y > confetti.height) {
          particle.y = -10;
        }
  
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        context.fillStyle = particle.color;
        context.fill();
      });
  
      requestAnimationFrame(draw);
    }
  
    draw();
  }
  
  function stopConfetti() {
    const context = confetti.getContext("2d");
    context.clearRect(0, 0, confetti.width, confetti.height);
  }
  