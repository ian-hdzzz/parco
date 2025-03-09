import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import QRCode from '../QR/QR';
import Button from "../Form/Button";
import { useUser } from "../../UserContext";

const ParkingTicket: React.FC = () => {
//   const { setUserData } = useUser();
  const { id, email, ticketInfo, status } = useUser();
  console.log(id)
  console.log(email)
  console.log(ticketInfo)
  console.log(status)
//   console.log(tiempoSalir)

  const qrValue = ticketInfo.entryTime
  const ticketNumber = ticketInfo.ticketNumber
  const dateObj = new Date(ticketInfo.entryTime)
  const qrcodeId = id
  console.log(ticketInfo)

  const [readableEntryTime, setReadableEntryTime] = useState('')
  const [elapsedTime, setElapsedTime] = useState('')
  const [thisStatus, setThisStatus] = useState(ticketInfo.thisStatus)
  const [amount, setAmount] = useState(0)
//   const [tiempoParaSalir, setTiempoParaSalir] = useState('')

  useEffect(() => {
    const formattedDateTime = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;

    setReadableEntryTime(formattedDateTime)
    setElapsedTime(formattedDateTime)

    // const paidDate = new Date(tiempoSalir)

  }, [])

  useEffect(() => {
    if (!ticketInfo.entryTime) return;
  
    const entryDate = new Date(ticketInfo.entryTime);
  
    const updateElapsedTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - entryDate.getTime(); // Difference in ms
  
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
      setElapsedTime(`${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`);

      const amountToPay = Math.round(diffMs / 60000)
      setAmount(amountToPay)
    };
  
    updateElapsedTime();
  
    const intervalId = setInterval(updateElapsedTime, 1000);
  
    console.log("Interval started:", intervalId);
  
    return () => {
      console.log("Clearing interval:", intervalId);
      clearInterval(intervalId);
    };
  }, [ticketInfo.entryTime]);
    
  
  const navigate = useNavigate();  // Inicializa el hook de navegación

  const handleClick = () => {
    const timestamp = new Date().toLocaleString();
    
    // Redirigir a la página /cards, pasando el email, timestamp y monto actual
    navigate("/cards", { 
      state: { 
        qrcodeId: qrcodeId,
        email, 
        timestamp,
        amount: amount  // Pasamos el monto calculado
      } 
    });
  };
  
  return (
    <div className='ticket no-select'>
      <div className='parking-ticket-inner'>
        {/* Frente del ticket */}
        <div className="parking-ticket-front">
          {/* Logo e indicador contactless */}
          <div className="ticket-header">
            <div className="contactless-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M8.46,14.45L7.1,13.83c0.28-0.61,0.41-1.24,0.4-1.86c-0.01-0.63-0.14-1.24-0.4-1.8l1.36-0.63c0.35,0.75,0.53,1.56,0.54,2.4C9.01,12.8,8.83,13.64,8.46,14.45z M11.53,16.01l-1.3-0.74c0.52-0.92,0.78-1.98,0.78-3.15c0-1.19-0.27-2.33-0.8-3.4l1.34-0.67c0.64,1.28,0.96,2.65,0.96,4.07C12.51,13.55,12.18,14.86,11.53,16.01z M14.67,17.33l-1.35-0.66c0.78-1.6,1.18-3.18,1.18-4.69c0-1.51-0.4-3.07-1.18-4.64l1.34-0.67C15.56,8.45,16,10.23,16,11.98C16,13.72,15.56,15.52,14.67,17.33z"/>
              </svg>
            </div>
            <div className="brand-logo">PARCO</div>
          </div>

          {/* Número de ticket */}
          <div className="ticket-number">
            {ticketNumber}
          </div>

          <div className="ticket-number" style={{ margin: '0', padding: '0' }}>
            <div className='detail-label'>{thisStatus}</div>
          </div>

          {/* Código QR */}
          <div className="ticket-qr">
            <QRCode value={qrValue} />
          </div>

          {/* Cuerpo del ticket */}
          <div className="ticket-details">
            <div className="detail-row">
              <div className="detail-label">USER</div>
              <div className="detail-value">{email}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">ENTRY TIME</div>
              <div className="detail-value">{readableEntryTime}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">ELAPSED TIME</div>
              <div className="detail-value">{elapsedTime}</div>
            </div>

            {/* {tie} */}

            {/* {exitTime && (
              <div className="detail-row">
                <div className="detail-label">EXIT TIME</div>
                <div className="detail-value">{exitTime}</div>
                <div className='detail-value'>idk bruh</div>
              </div>
            )} */}

            <div className="detail-row">
              <div className="detail-label">AMOUNT</div>
              <div className="detail-value">{amount}</div>
            </div>
          </div>

          {/* Pie del ticket */}
          <div className="ticket-footer">
            <p>Thank you for using our parking service.</p>
            <Button type="submit" text="Pagar" tabIndex={0} onClick={handleClick} />
          </div>
        </div>
        
        {/* Reverso del ticket */}
        <div className="parking-ticket-back">
          <div className="ticket-back-content">
            <h2>PARCO</h2>
            <p>Thank you for choosing our parking services.</p>
            <p>Please keep this ticket safe until you exit the parking area.</p>
            <p>For assistance, contact our support at:</p>
            <p>+1 (555) 123-4567</p>
            <p>support@parcoapp.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingTicket;