
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";

function QR() {
  const [randomValue, setRandomValue] = useState("");
  
  useEffect(() => {
    setRandomValue(uuidv4()); // Genera un nuevo UUID en cada recarga
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas 
        value={randomValue} 
        size={150} 
        bgColor={"#1a1a1a"} 
        fgColor={"white"} 
        level={"M"}
        includeMargin={false}
      />
    </div>
  );
}

export default QR;
