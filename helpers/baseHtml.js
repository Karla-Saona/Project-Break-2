//Para realizar HTML desde backend
//Estructura de la pág.
const getNavBar = require("./getNavBar");

module.exports = function baseHtml(title, content, req) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <title>${title}</title>
      </head>
      <body>
        ${getNavBar(req)}
        <main>
          ${content}
        </main>
      </body>
    </html>
  `;
};
