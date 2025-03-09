import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import QRCode from '../QR/QR';
import Button from "../Form/Button";
import { useUser } from "../../UserContext";

const ParkingTicket: React.FC = () => {
  const { setUserData } = useUser();
  const { id, email, ticketInfo } = useUser();
  console.log(id)
  console.log(email)
  console.log(ticketInfo)

  const ticketNumber = ticketInfo.ticketNumber
  const entryTime = ticketInfo.entryTime
  const amount = 0


  const [currentAmount, setCurrentAmount] = useState<number>(amount);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [entryDateTime, setEntryDateTime] = useState<Date>(new Date());
  
  // Valores fijos para incremento
  const incrementPerTwoMinutes = 5;
  
  // Inicializar la fecha de entrada correctamente
  useEffect(() => {
    try {
      // Intentar parsear la entrada como fecha
      const parsedDate = new Date(entryTime);
      
      // Verificar si la fecha es válida
      if (!isNaN(parsedDate.getTime())) {
        setEntryDateTime(parsedDate);
      } else {
        // Si no es válida, usar la fecha actual
        console.warn("Fecha de entrada inválida, usando la fecha actual");
        setEntryDateTime(new Date());
      }
    } catch (error) {
      console.error("Error al procesar la fecha de entrada:", error);
      setEntryDateTime(new Date());
    }
  }, [entryTime]);
  
  // Función para calcular el precio según el tiempo transcurrido desde el entryTime
  const calculateUpdatedAmount = (startDate: Date) => {
    try {
      // Obtener la fecha y hora actual
      const now = new Date();
      
      // Calcular los minutos transcurridos
      const minutesDiff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60));
      
      // Calcular cuántos incrementos de 2 minutos han pasado
      const increments = Math.floor(minutesDiff / 2);
      
      // Calcular el nuevo monto
      const newAmount = amount + (increments * incrementPerTwoMinutes);
      
      return newAmount;
    } catch (error) {
      console.error("Error al calcular el monto:", error);
      return amount;
    }
  };

  // Actualizar la hora actual y el monto cada segundo
  useEffect(() => {
    // Inicializar el temporizador
    const timer = setInterval(() => {
      // Actualizar hora actual
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      
      try {
        // Calcular segundos transcurridos desde el inicio
        const secondsFromEntry = Math.floor((now.getTime() - entryDateTime.getTime()) / 1000);
        setElapsedSeconds(secondsFromEntry > 0 ? secondsFromEntry : 0);
        
        // Calcular y actualizar el monto
        const newAmount = calculateUpdatedAmount(entryDateTime);
        setCurrentAmount(newAmount);
      } catch (error) {
        console.error("Error en useEffect:", error);
      }
    }, 1000);
    
    // Limpiar intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, [entryDateTime, amount]);

  // Formatear tiempo transcurrido
  const formatElapsedTime = () => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Formatear el monto para mostrar
  const formattedAmount = `$${currentAmount.toFixed(2)}`;
  
  // Formatear fecha de entrada para mostrar
  const formatEntryTime = () => {
    try {
      return entryDateTime.toLocaleString();
    } catch (error) {
      return "Fecha inválida";
    }
  };
  
  const navigate = useNavigate();  // Inicializa el hook de navegación

  const handleClick = () => {
    const timestamp = new Date().toLocaleString();
    
    // Redirigir a la página /cards, pasando el email, timestamp y monto actual
    navigate("/cards", { 
      state: { 
        email, 
        timestamp,
        amount: currentAmount  // Pasamos el monto calculado
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

          {/* Código QR */}
          <div className="ticket-qr">
            <QRCode value={ticketNumber} />
          </div>

          {/* Cuerpo del ticket */}
          <div className="ticket-details">
            <div className="detail-row">
              <div className="detail-label">USER</div>
              <div className="detail-value">{email}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">ENTRY TIME</div>
              <div className="detail-value">{formatEntryTime()}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">ELAPSED TIME</div>
              <div className="detail-value">{formatElapsedTime()}</div>
            </div>

            {/* {exitTime && (
              <div className="detail-row">
                <div className="detail-label">EXIT TIME</div>
                <div className="detail-value">{exitTime}</div>
                <div className='detail-value'>idk bruh</div>
              </div>
            )} */}

            <div className="detail-row">
              <div className="detail-label">AMOUNT</div>
              <div className="detail-value">{formattedAmount}</div>
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