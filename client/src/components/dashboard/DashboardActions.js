import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="ui buttons">
      <Link to="/me" className="ui button pink">
        Ver mi perfil
      </Link>
      <Link to="/edit-profile" className="ui button yellow">
        Editar perfil
      </Link>
    </div>
  );
};

export default DashboardActions;
