document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  // ضبط الأيقونة
  if (document.documentElement.classList.contains("dark-mode")) {
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    if (document.documentElement.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      btn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      btn.textContent = "🌙";
    }
  });
});

