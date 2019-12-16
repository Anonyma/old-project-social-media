import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

// Get perfil actual
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: 'Error relacionado con el perfil actual',
        status: err.status,
      },
    });
  }
};

// Get todos los perfiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: 'Error obteniendo los perfiles',
        status: err.status,
      },
    });
  }
};

// Get perfil por ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: 'Error relacionado con el perfil por ID',
        status: err.status,
      },
    });
  }
};

// Crear o modificar perfil
export const createProfile = (
  formData,
  history,
  edit = false,
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Perfil actualizado' : 'Perfil creado', 'success'),
    );

    // Setteo la redirección según si se ha actualizado o creado el perfil
    !edit ? history.push('/dashboard') : history.push('/me');

  } catch (err) {
    console.log(err)

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err, status: err.status },
    });
  }
};

// Eliminar cuenta
export const deleteAccount = () => async dispatch => {
  if (
    window.confirm(
      'Confirma que quieres eliminar tu cuenta. Este cambio es irreversible.',
    )
  ) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(
        setAlert('Tu cuenta ha sido eliminada permanentemente', 'success'),
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err, status: err.status },
      });
    }
  }
};
