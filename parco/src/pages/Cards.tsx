import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from "../UserContext";
import { useNavigate } from 'react-router-dom';

// components
import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';

interface LocationState {
  qrcodeId?: number,
  email?: string;
  timestamp?: string;
  amount?: number;
}

const Transactions: React.FC = () => {
  const navigate = useNavigate()

  // Obtener el estado de la navegación
  const location = useLocation();
  const state = location.state as LocationState || {};
  const { qrcodeId, email, timestamp, amount } = state;
  const { status, setUserData } = useUser();
  console.log(state)

  const handlePay = async () => {
    console.log("inside handle pay")
    const result = await axios.post('http://localhost:5707/pay-ticket', {
      qrcodeId: qrcodeId
    })
    console.log("response from pay bill: ", result)
    if (result.status === 200) {
      console.log("result", result)
      const datetime = result.data
      setUserData({
        status: 'paid'
      })
      console.log("status after updating: ", status)

      navigate('/home')
    } else {
      console.log("payment failed")
    }
  }

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

        <div className="amount-display" style={{ marginTop: '4rem', cursor: 'pointer' }} onClick={() => handlePay()} >
          <h2 className="amount-title">Pay Now</h2>
        </div>

    </Layout>
  );
};

export default Transactions;