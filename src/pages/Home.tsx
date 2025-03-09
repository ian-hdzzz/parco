import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ParkingTicket from "../components/Ticket/Ticket";
import Layout from "../components/Layout/Layout";
import Divider from "../components/Divider/Divider";

const Transactions: React.FC = () => {
  const location = useLocation();
  // Recibimos el timestamp como string local
  const { email, timestamp } = location.state || { email: "guest@example.com", timestamp: new Date().toLocaleString() };
  
  const [ticketData, setTicketData] = useState({
    email: email,
    ticketNumber: "A-0000",
    entryTime: timestamp || new Date().toLocaleString(),
    exitTime: "",
    amount: 0
  });
  
  useEffect(() => {
    // Generar datos del ticket usando el email recibido
    const randomTicketNumber = "A-" + Math.floor(1000 + Math.random() * 9000).toString();
    
    // Usar el timestamp recibido o la fecha actual
    const entryTimeValue = timestamp || new Date().toLocaleString();
    
    // Calcular el monto base inicial
    const baseAmount = 5.00;
    
    setTicketData({
      email: email,
      ticketNumber: randomTicketNumber,
      entryTime: entryTimeValue,
      exitTime: "", // Sin tiempo de salida
      amount: baseAmount
    });
  }, [email, timestamp]);

  return (
    <Layout>
      <div className='header'>
        <h2 style={{ textAlign: 'center', margin: '30px 0' }}>Parking Ticket</h2>
      </div>


      <div className="ticket">
        <ParkingTicket
          email={ticketData.email}
          ticketNumber={ticketData.ticketNumber}
          entryTime={ticketData.entryTime}
          exitTime={ticketData.exitTime}
          amount={ticketData.amount}
        />
      </div>

      <Divider />
    </Layout>
  );
};

export default Transactions;