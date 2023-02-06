const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cart = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');

let cartData = [];
let total = 0;

function addToCart(e) {
  const name = e.target.dataset.name;
  const price = e.target.dataset.price;
  const quantity = 1;

  // Check if the item is already in the cart
  let itemIndex = -1;
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i].name === name) {
      itemIndex = i;
      break;
    }
  }

  // If the item is already in the cart, just increase its quantity
  if (itemIndex > -1) {
    cartData[itemIndex].quantity += 1;
  } else {
    // If the item is not in the cart, add it to the cartData array
    const item = { name, price, quantity };
    cartData.push(item);
  }

  renderCart();
}

function renderCart() {
  // Clear the current cart content
  cart.innerHTML = '';

  // Add the new content to the cart
  for (const item of cartData) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
      <td>${item.price * item.quantity}</td>
    `;
    cart.appendChild(tr);
  }

  // Update the total
  total = 0;
  for (const item of cartData) {
    total += item.price * item.quantity;
  }
  cartTotal.textContent = total;
}

addToCartButtons.forEach(button => button.addEventListener('click', addToCart));
