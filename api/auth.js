const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
// El validator nos provee de métodos cómodos para validar los datos del formulario antes de guardarlos en BdD
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// GET auth - login - Nos devuelve todos los datos del usuario menos la contraseña
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST auth - Login
router.post(
  '/',
  [],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      console.log('api auth -> cuando validationresult da error')
    }

    // Guardamos como variables el email y la contraseña del formulario (con destructuring)
    const { email, password } = req.body;

    try {
      // Primero comprobamos si existe ese email en la B.D.
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciales inválidas' }] });
      }

      // Si existe, comprobamos si la contraseña introducida equivale a la que está hasheada en BdD
      const isMatch = await bcrypt.compare(password, user.password);
      // Usamos un método de Bcrypt porque es lo que usamos para hashearlas inicialmente

      // Si no hay match, devuelvo un 400 y un mensaje
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciales inválidas' }] });
      }

      // Si todo va bien, devuelvo estos datos de usuario
      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };

      // Si el login se ha ejecutado correctamente, devuelvo el token del usuario que mantendré durante la sesión
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
