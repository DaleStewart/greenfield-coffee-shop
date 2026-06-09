(function () {
  const STORAGE_KEY = 'greenfield.cart';

  function read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function normalize(item) {
    return {
      id: String(item.id),
      name: item.name,
      price: Number(item.price),
      image: item.image,
      qty: Math.max(1, Number(item.qty) || 1)
    };
  }

  function changed() {
    window.dispatchEvent(new CustomEvent('cart:changed', {
      detail: {
        count: Cart.count(),
        subtotal: Cart.subtotal(),
        items: Cart.items()
      }
    }));
  }

  const Cart = {
    items() {
      return read();
    },

    count() {
      return read().reduce((sum, item) => sum + item.qty, 0);
    },

    subtotal() {
      return read().reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    add(item, qty = 1) {
      const items = read();
      const normalized = normalize({ ...item, qty });
      const existing = items.find((entry) => entry.id === normalized.id);

      if (existing) {
        existing.qty += normalized.qty;
      } else {
        items.push(normalized);
      }

      write(items);
      changed();
    },

    remove(id, removeAll = false) {
      const key = String(id);
      const items = read();
      const index = items.findIndex((item) => item.id === key);
      if (index === -1) return;

      if (removeAll || items[index].qty <= 1) {
        items.splice(index, 1);
      } else {
        items[index].qty -= 1;
      }

      write(items);
      changed();
    },

    clear() {
      write([]);
      changed();
    }
  };

  window.Cart = Cart;
})();
