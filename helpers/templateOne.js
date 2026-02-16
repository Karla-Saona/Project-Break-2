
//Devuelve el HTML del detalle de un producto
module.exports = function templateOne(product) {
  return `
    <article class="detail">
      <img class="detail__img" src="${product.image}" alt="${product.name}">
      <div class="detail__body">
        <h1 class="detail__title">${product.name}</h1>
        <p class="detail__desc">${product.description}</p>

        <div class="detail__meta">
          <span class="badge">${product.category}</span>
          <span class="badge badge--soft">Talla: ${product.size}</span>
        </div>

        <p class="price price--big">$${product.price}</p>
        <a class="btn btn--ghost" href="/products">Volver</a>
      </div>
    </article>
  `;
};

