const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');

// GET api/profile/me - obtener el perfil del usuario actual
router.get('/me', auth, async (req, res) => {
  try {
    // rellenamos una variable con los datos de perfil del usuario de la BdD
    // (el ID lo sacamos del token de sesión)
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['username', 'avatar'],
    );

    // Si ese ID de usuario no corresponde a ningún perfil, lo indicamos:
    if (!profile) {
      return res.status(400).json({ msg: 'Este usuario no tiene un perfil' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /profile - crear o actualizar un perfil
router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { avatar, web, bio, skills, portfolio, featuredimg, location } = req.body;

  // Rellenamos en BdD los campos que no nos vengan vacíos desde el formulario
  const profileFields = {};
  profileFields.user = req.user.id;
  if (web) profileFields.web = web;
  if (bio) profileFields.bio = bio;
  if (portfolio) profileFields.portfolio = portfolio;
  if (featuredimg) profileFields.featuredimg = featuredimg;
  if (location) profileFields.location = location;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  const profileAvatar = {};
  profileAvatar.user = req.user.id;
  if (avatar) profileAvatar.avatar = avatar;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Si el usuario ya tiene un perfil, simplemente lo actualizamos
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );

      if (avatar) {
        updatedAvatar = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: profileAvatar },
          { new: true },
        );
      }

      return res.json(profile);
    }

    // Si no existe, lo creamos
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET api/profile - devuelve todos los perfiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'username',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET api/profile/user/:user_id - obtener perfil por ID
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['username', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Perfil no encontrado' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Perfil no encontrado - término de búsqueda incorrecto' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE api/profile - Para borrar usuarios y perfiles
router.delete('/', auth, async (req, res) => {
  try {
    // Borramos el perfil por el ID de usuario
    await Profile.findOneAndRemove({ user: req.user.id });
    // Borramos el usuario por su ID
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Usuario eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
