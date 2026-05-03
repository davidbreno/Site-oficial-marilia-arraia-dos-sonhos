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
