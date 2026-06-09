document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const coffeeItems = document.querySelectorAll('.coffee-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((button) => {
        button.classList.remove('active', 'btn-coffee');
        button.classList.add('btn-outline-coffee');
      });

      btn.classList.add('active', 'btn-coffee');
      btn.classList.remove('btn-outline-coffee');

      const category = btn.dataset.category;
      coffeeItems.forEach((item) => {
        item.style.display = category === 'all' || item.dataset.category === category ? '' : 'none';
      });
    });
  });

  const addButtons = document.querySelectorAll('.add-to-order-btn');
  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.Cart) {
        window.Cart.add({
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: Number(btn.dataset.price),
          image: btn.dataset.image
        });
      }

      btn.innerHTML = '<i class="bi bi-check-circle me-1"></i>Added!';
      btn.classList.remove('btn-coffee');
      btn.classList.add('btn-success');

      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-plus-circle me-1"></i>Add to Order';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-coffee');
      }, 1500);
    });
  });
});
