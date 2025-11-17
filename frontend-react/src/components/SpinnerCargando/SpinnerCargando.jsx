import './SpinnerCargando.css';

function SpinnerCargando ({ message = "Cargando datos..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner-content">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="spinner-message">{message}</p>
      </div>
    </div>
  );
};

export default SpinnerCargando;