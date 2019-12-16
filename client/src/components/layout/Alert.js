import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

const colorByType = {
  'danger': 'pink',
  'success': 'olive'
}
const Alert = ({ alerts }) =>
// Compruebo que no es null, ya que si no la página se romperá al aplicarle map()
  alerts !== null &&
  // Por casi el mismo motivo compruebo que no esté vacío - me daría error al acceder a propiedades suyas
  alerts.length > 0 &&
  // "forEach alerta -> imprime este trozo de HTML con estas propiedades suyas"
  alerts.map(alert => (
    <Message key={alert.id} color={colorByType[alert.alertType]}>
      {alert.msg}
    </Message>
  ));

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
