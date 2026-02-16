 Project Break 2 — Backend 

Backend en Node.js/Express con MongoDB (Mongoose).  
Incluye CRUD de productos, páginas HTML generadas desde backend y autenticación básica con sesiones.

## Tecnologías
- Node.js + Express
- MongoDB + Mongoose
- express-session- servidor
- dotenv
- Jest + Supertest (tests). Test superados

## Estructura del proyecto

- `index.js` → punto de entrada (importaciones, middlewares, rutas, levantar servidor)
- `config/db.js` → conexión a MongoDB usando Mongoose.
- `models/` → esquemas Mongoose (Product)
- `controllers/` → lógica (auth y productos)
- `routes/` → endpoints (auth, products, dashboard)
- `middlewares/` → middleware de auth. Protección
- `helpers/` → HTML dinámico (baseHtml,getNavBar, template, templateOne, templateEdit)
- `public/` → CSS e imágenes (estáticos)
- `test/` → tests con Jest/Supertest.  Superado

---

## Instalación

```bash
npm install
npm start 
npm run dev
npm test


## Deploy. App desplegada en Render:
https://project-break-2-zubo.onrender.com/

##Repositorio. Código en Github:
https://github.com/Karla-Saona/Project-Break-2
