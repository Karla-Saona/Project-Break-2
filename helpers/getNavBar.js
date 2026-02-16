//devuelve el HTML del menú(Products, Dashboard)

module.exports = function getNavBar() {
  return `
    <nav class="nav">
      <a class="nav__link" href="/products">Productos</a>
      <a class="nav__link" href="/products?category=Camisetas">Camisetas</a>
      <a class="nav__link" href="/products?category=Pantalones">Pantalones</a>
      <a class="nav__link" href="/products?category=Zapatos">Zapatos</a>
      <a class="nav__link" href="/products?category=Accesorios">Accesorios</a>
      <a class="nav__link" href="/dashboard">Dashboard</a>
      <a class="nav__link" href="/dashboard/new">Nuevo Producto</a>
      <a class="nav__link" href="/auth/login">Login</a>
    </nav>
  `;
};
