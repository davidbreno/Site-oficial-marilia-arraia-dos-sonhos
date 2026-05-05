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
  photoBanner.addEventListener("mousemove", (event) => {
    const rect = photoBanner.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    photoBanner.style.setProperty("--shine-x", `${x}%`);
    photoBanner.style.setProperty("--shine-y", `${y}%`);
  });
});
