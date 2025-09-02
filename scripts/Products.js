import { getProducts } from "./database.js";

const products = getProducts();

export const Products = () => {
  let html = "<ul>";

  for (const product of products) {
    html += `<li 
    data-type="product" 
    data-product-name="${product.name}" 
    data-product-price="${product.price}"
    >
    ${product.name}
    </li>`;
  }

  html += "</ul>";

  return html;
};

window.addEventListener("click",
  (clickEvent) => {
    const clickedTarget = clickEvent.target

    if (clickedTarget.dataset.type !== "product") {
      return
    }

    const name = clickedTarget.dataset.productName
    const price = parseFloat(clickedTarget.dataset.productPrice).toFixed(2)

    if (name && price) {
      window.alert(`${name} costs $${price}`)
    }

  }
)