const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// POST api/users - registro de usuarios
router.post(
  '/',
  [
    check('username', 'Introduce un nombre de usuario')
      .not()
      .isEmpty(),
    check('email', 'Introduce un email válido').isEmail(),
    check(
      'password',
      'Introduce una contraseña con 6 o más caracteres',
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, isAdmin } = req.body;

    try {
      let user = await User.findOne({ email });

      // Miro si ya hay un usuario con ese email
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'El usuario ya existe' }] });
      }

      // Parámetros para imágenes random de gravatar: "size", "rating", "default"
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'retro',
      });

      user = new User({
        username,
        email,
        avatar,
        password,
        isAdmin,
      });

      // El "10" representa el número de "rondas" que se hashea
      const salt = await bcrypt.genSalt(10);
      // HASHEAMOS la contraseña del usuario con Bcrypt antes de guardarla
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };

      // Obtenemos un token que nos servirá durante la sesión activa del usuario
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
