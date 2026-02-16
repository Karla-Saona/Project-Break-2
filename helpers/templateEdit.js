//Sirve para editar un producto q ya existe

module.exports = function templateEdit(product) {
return `
    <h1>Editar producto</h1>

    <form method="POST" action="/products/${product._id}/edit">
    <label>Nombre:</label><br/>
    <input name="name" required value="${product.name}" /><br/>

    <label>Descripción:</label><br/>
    <textarea name="description" required>${product.description}</textarea><br/>

    <label>Precio:</label><br/>
    <input type="number" name="price" step="0.01" required value="${product.price}" /><br/>

    <label>Imagen:</label><br/>
    <input name="image" required value="${product.image}" /><br/>

    <label>Categoría:</label><br/>
    <select name="category" required>
        <option value="Camisetas" ${product.category === "Camisetas" ? "selected" : ""}>Camisetas</option>
        <option value="Pantalones" ${product.category === "Pantalones" ? "selected" : ""}>Pantalones</option>
        <option value="Zapatos" ${product.category === "Zapatos" ? "selected" : ""}>Zapatos</option>
        <option value="Accesorios" ${product.category === "Accesorios" ? "selected" : ""}>Accesorios</option>
    </select><br/>

    <label>Talla:</label><br/>
    <select name="size" required>
        <option value="XS" ${product.size === "XS" ? "selected" : ""}>XS</option>
        <option value="S" ${product.size === "S" ? "selected" : ""}>S</option>
        <option value="M" ${product.size === "M" ? "selected" : ""}>M</option>
        <option value="L" ${product.size === "L" ? "selected" : ""}>L</option>
        <option value="XL" ${product.size === "XL" ? "selected" : ""}>XL</option>
    </select><br/><br/>

    <button type="submit">Guardar cambios</button>
    </form>
`;
};
