import React from 'react';
import { useLocation } from 'react-router-dom';

// components
import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';

interface LocationState {
  email?: string;
  timestamp?: string;
  amount?: number;
}

const Transactions: React.FC = () => {
  // Obtener el estado de la navegación
  const location = useLocation();
  const state = location.state as LocationState || {};
  const { email, timestamp, amount } = state;

  return (
    <Layout>
      <Divider />

      {/* Mostrar el monto a pagar si existe */}
      {amount !== undefined && (
        <div className="amount-display">
          <h2 className="amount-title">Total a pagar:</h2>
          <p className="amount-value">${amount.toFixed(2)}</p>
        </div>
      )}

      <h1 className='title no-select'>Cards</h1>

      <div className='cards'>
        <Card
          number='5244 2150 8252 ****'
          cvcNumber='824'
          validUntil='10 / 30'
          cardHolder='CENK SARI'
        />
      </div>
    </Layout>
  );
};

export default Transactions;