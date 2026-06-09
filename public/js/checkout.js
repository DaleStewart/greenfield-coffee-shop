document.addEventListener('DOMContentLoaded', () => {
  const TAX_RATE = 0.085;

  const checkoutContent = document.getElementById('checkoutContent');
  const emptyCartState = document.getElementById('emptyCartState');
  const cartItemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('summarySubtotal');
  const taxEl = document.getElementById('summaryTax');
  const totalEl = document.getElementById('summaryTotal');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const pickupTimeEl = document.getElementById('pickupTime');

  function money(value) {
    return `$${value.toFixed(2)}`;
  }

  function nextQuarterHour(date) {
    const next = new Date(date);
    next.setSeconds(0, 0);
    const minutes = next.getMinutes();
    const remainder = minutes % 15;
    next.setMinutes(minutes + (remainder === 0 ? 15 : 15 - remainder));
    return next;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function buildPickupSlots() {
    if (!pickupTimeEl || pickupTimeEl.dataset.ready === 'true') return;

    let slot = nextQuarterHour(new Date());
    for (let i = 0; i < 8; i += 1) {
      const option = document.createElement('option');
      option.value = slot.toISOString();
      option.textContent = formatTime(slot);
      pickupTimeEl.appendChild(option);
      slot = new Date(slot.getTime() + 15 * 60 * 1000);
    }

    pickupTimeEl.dataset.ready = 'true';
  }

  function render() {
    const items = window.Cart ? window.Cart.items() : [];
    const isEmpty = items.length === 0;

    checkoutContent.classList.toggle('d-none', isEmpty);
    emptyCartState.classList.toggle('d-none', !isEmpty);

    if (isEmpty) {
      cartItemsEl.innerHTML = '';
      subtotalEl.textContent = money(0);
      taxEl.textContent = money(0);
      totalEl.textContent = money(0);
      placeOrderBtn.disabled = true;
      return;
    }

    const lines = items.map((item) => {
      const lineTotal = item.price * item.qty;
      return `
        <div class="d-flex align-items-center py-3 border-bottom" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="rounded me-3" width="56" height="56" style="object-fit:cover;">
          <div class="flex-grow-1">
            <h6 class="mb-1">${item.name}</h6>
            <div class="text-muted small">${money(item.price)} each</div>
            <button type="button" class="btn btn-link btn-sm p-0 mt-1 text-danger" data-action="remove">Remove</button>
          </div>
          <div class="text-end ms-3">
            <div class="qty-stepper mb-1" role="group" aria-label="Quantity controls">
              <button type="button" class="btn btn-outline-secondary btn-sm" data-action="decrement">-</button>
              <span class="px-2">${item.qty}</span>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-action="increment">+</button>
            </div>
            <div class="fw-semibold">${money(lineTotal)}</div>
          </div>
        </div>
      `;
    });

    cartItemsEl.innerHTML = lines.join('');

    const subtotal = window.Cart.subtotal();
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    subtotalEl.textContent = money(subtotal);
    taxEl.textContent = money(tax);
    totalEl.textContent = money(total);
    placeOrderBtn.disabled = false;
  }

  cartItemsEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button || !window.Cart) return;

    const row = button.closest('[data-id]');
    if (!row) return;

    const itemId = row.dataset.id;
    const item = window.Cart.items().find((entry) => entry.id === itemId);
    if (!item) return;

    if (button.dataset.action === 'increment') {
      window.Cart.add(item);
      return;
    }

    if (button.dataset.action === 'decrement') {
      window.Cart.remove(itemId);
      return;
    }

    if (button.dataset.action === 'remove') {
      window.Cart.remove(itemId, true);
    }
  });

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!window.Cart || window.Cart.count() === 0) return;

    window.Cart.clear();
    window.location.href = '/checkout/confirmation';
  });

  window.addEventListener('cart:changed', render);

  buildPickupSlots();
  render();
});
