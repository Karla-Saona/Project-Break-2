//Lista de productos mostrando, nombre, descripción,categoria...

module.exports = function templateProducts(products) {

  if (!products || products.length === 0) {
    return `
      <h1>Products</h1>
      <p>No hay productos todavía.</p>
    `;
  }

  const cards = products.map(p => `
    <article class="card">
      <img class="card__img" src="${p.image}" alt="${p.name}">
      <div class="card__body">
        <h3 class="card__title">${p.name}</h3>
        <p class="card__desc">${p.description}</p>

        <div class="card__meta">
          <span class="badge">${p.category}</span>
          <span class="badge badge--soft">Talla: ${p.size}</span>
        </div>

        <div class="card__footer">
          <strong class="price">$${p.price}</strong>
          <a class="btn" href="/products/${p._id}">Ver detalle</a>
          <a href="/products/${p._id}/edit">Editar</a>

          <form method="POST" action="/products/${p._id}/delete" style="display:inline;">
  <button type="submit">Eliminar</button>
</form>


        </div>
      </div>
    </article>
  `).join("");

  return `
    <h1>Products</h1>
    <section class="grid">
      ${cards}
    </section>
  `;
};
