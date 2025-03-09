import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import axios from 'axios';

// function QR({ value }: { value: string }, { userId }: {userId: int}) {
  function QR({ value }: { value: string }) {
  // const [qrValue, setQrValue] = useState('')

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (value !== null) {
  //       try {
  //         const response = await axios.post('http://localhost:5707/register-qr', {
  //           userId: userId
  //         });
  //         if (response.status === 200) {
  //           setQrValue(response.data);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       setQrValue(value);
  //     }
  //   };
  
  //   fetchData();
  // }, [value]);

  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas 
        value={value} 
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
