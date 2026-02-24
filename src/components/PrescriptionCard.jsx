import { useAppContext } from '../context/AppContext';

const PrescriptionCard = ({ prescription, viewMode }) => {
  const { getUserById } = useAppContext();

  const doctor = getUserById(prescription.doctorId);

  return (
    <div className="card">
      <div className="card-header">💊 Prescription #{prescription.id}</div>
      <div className="card-body">
        <div style={{ marginBottom: '10px' }}>
          <strong>Doctor:</strong> {doctor?.name}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Medicines:</strong>
          <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
            {prescription.medicines.map((med, idx) => (
              <li key={idx}>{med}</li>
            ))}
          </ul>
        </div>

        {prescription.notes && (
          <div style={{ marginBottom: '10px' }}>
            <strong>Medical Notes:</strong>
            <p style={{ marginTop: '5px', color: '#6b7280', fontSize: '14px' }}>
              {prescription.notes}
            </p>
          </div>
        )}

        <div style={{ marginBottom: '10px' }}>
          <strong>Status:</strong>
          <span className="badge badge-success" style={{ marginLeft: '10px' }}>
            {prescription.status}
          </span>
        </div>

        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          Issued: {new Date(prescription.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
