//Es el controlador de autenticación: regsitro,login 
const bcrypt = require("bcrypt"); //encriptar contraseñas
const baseHtml = require("../helpers/baseHtml"); //diseña HTML 


const users = []; // es una base de datos temporal

// formulario de registro(Html). Es un get
const showRegister = (req, res) => {
  const content = `
    <h1>Register</h1>
    <form method="POST" action="/auth/register">
      <label>Email</label>
      <input type="email" name="email" required />

      <label>Password</label>
      <input type="password" name="password" required />

      <button type="submit">Create account</button>
    </form>
    <p>¿Ya tienes cuenta? <a href="/auth/login">Login</a></p>
  `;
  res.send(baseHtml("Register", content));
};

// Registrar, crear usuario. Es un post
const register = async (req, res) => {
  try {
    const { email, password } = req.body; //obtener datos

    const exists = users.find((u) => u.email === email); //q no esté registrado
    if (exists) {
      return res.send(baseHtml("Register", `<p>Ese email ya existe.</p><a href="/auth/register">Volver</a>`));
    }

    const hash = await bcrypt.hash(password, 10); //porteger contraseña
    users.push({ id: Date.now().toString(), email, password: hash }); //guardar usuario

    res.redirect("/auth/login"); //lo redirigé al login
  } catch (err) {
    res.status(500).send(baseHtml("Error", "<p>Error registering</p>"));
  }
};

// GET /auth/login -> formulario login. Esun get
const showLogin = (req, res) => {
  const content = `
    <h1>Login</h1>
    <form method="POST" action="/auth/login">
      <label>Email</label>
      <input type="email" name="email" required />

      <label>Password</label>
      <input type="password" name="password" required />

      <button type="submit">Login</button>
    </form>
    <p>¿No tienes cuenta? <a href="/auth/register">Register</a></p>
  `;
  res.send(baseHtml("Login", content));
};

// formulario de login o iniciar sesión. Es un post
const login = async (req, res) => {
  try {
    const { email, password } = req.body;  //obtener datos

    const user = users.find((u) => u.email === email); //buscar al usuario
    if (!user) {
      return res.send(baseHtml("Login", `<p>Credenciales incorrectas.</p><a href="/auth/login">Volver</a>`));
    }

    const ok = await bcrypt.compare(password, user.password); //comparar contras. la q escribé el usuario y la encriptada
    if (!ok) {
      return res.send(baseHtml("Login", `<p>Credenciales incorrectas.</p><a href="/auth/login">Volver</a>`));
    }

    // Guardamos sesión
    req.session.user = { id: user.id, email: user.email }; //guarda sesión

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send(baseHtml("Error", "<p>Error logging in</p>"));
  }
};

// Logout o cerrar sesión
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/products");
  });
};

module.exports = {
  showRegister,
  register,
  showLogin,
  login,
  logout,
};
