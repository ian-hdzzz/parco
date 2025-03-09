import { useState, useEffect } from "react";
import ParkingTicket from "../components/Ticket/Ticket2";
import Layout from "../components/Layout/Layout";
import Divider from "../components/Divider/Divider";
import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import axios from 'axios';
import { useUser } from "../UserContext";

const Transactions: React.FC = () => {
  const { setUserData } = useUser();
  const { id, email, ticketInfo } = useUser();
  
  // const { id, email, currTicket } = location.state || { id: null, email: "guest@example.com", ticket: null };

  // const [ticketData, setTicketData] = useState(ticketInfo);
  const [hasTicket, setHasTicket] = useState(!!ticketInfo); // Boolean flag for ticket presence
  const [qrValue, setQrValue] = useState("");
  const [state, setState] = useState('');
  const [malls, setMalls] = useState([])
  const [selectMallVisible, setSelectMallVisible] = useState(false)
  const [mall, setMall] = useState('')

  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    if (ticketInfo !== null) {
      setHasTicket(true)
    }
  }, [])

  // Function to generate a new ticket
  const handleOpenTicketForm = () => {
    setFormVisible(true)
  }

  const handleGetMalls = async () => {
    try {
      console.log("going to call malls api")
      const response = await axios.get('http://localhost:5707/get-malls', {
          params: {
            state: state
          }
        })
        if (response.status === 200) {
          console.log("response status was 200, setting malls")
          console.log("response to analyze: ", response)
          setMalls(response.data)
          console.log("malls after being set: ", malls)
          setSelectMallVisible(true)
        } else {
          console.log("response was not good")

        }
      } catch (error) {
        console.error(error)
      }
  }

  const handleGenQR = async () => {
    console.log("insdie handle qr")
    try {
      const response = await axios.post('http://localhost:5707/register-qr', {
        userId: id
      })
      if (response.status === 200) {
        console.log("returned data: ", response.data)
        setUserData({
          ticketInfo: response.data,
          // status: response.data.status
        });
        setHasTicket(true);
        setFormVisible(false)
        setSelectMallVisible(false)

      } else {
        console.log("there was an error making the qr")
      }
  
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Layout>
      <div className="header">
        {hasTicket ? (
          <h2 style={{ textAlign: "center", margin: "30px 0" }}>Parking Ticket</h2>
        ) : (
          <h2 style={{ textAlign: "center", margin: "30px 0" }}>No ticket found</h2>
        )}
      </div>

      <div className="ticket" style={{ marginBottom: '0' }}>
        {hasTicket ? (
          <>
            <ParkingTicket />
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div className="form-line" onClick={handleOpenTicketForm} >
              <Button 
                type="none"
                text="Get Ticket"
                tabIndex={0}
              />
                
            </div>
          </div>
        )}
      </div>

      {formVisible && (
        <div className="form" style={{ textAlign: "center", width: '80%', margin: '0 auto', paddingBottom: '0' }}>
          <div className="form-line" >
            <div className="label-line">
              <label htmlFor="email" className="text-shadow">
                What state are you in? (say "Qro")
              </label>
            </div>
            <Input
              tabIndex={0}
              type="text"
              name="state"
              placeholder="soon to be automated"
              value={state} 
              onChange={(e) => setState(e.target.value)}
            />
            <div className="form-line" onClick={() => handleGetMalls()} style={{ margin: '0.5rem 0' }} >
              <Button type="none" text="Enter State" tabIndex={0} />
            </div>
          </div>
        </div>  
      )}

      {selectMallVisible && (
        <div className="form" style={{ paddingTop: '0', textAlign: "center", width: '80%', margin: '0 auto', }}>
          <div className="form-line">
          <div className="label-line">
              <label htmlFor="email" className="text-shadow">
                Choose the plaza you're at
              </label>
            </div>
            <select 
              name="malls"
              value={mall} 
              onChange={(e) => setMall(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="">Select a mall</option>
              {malls.map((mall, index) => (
                <option key={index} value={mall}>
                  {mall}
                </option>
              ))}
            </select>
            <div className="form-line" onClick={() => handleGenQR()} style={{ margin: '0.5rem 0' }} >
              <Button type="none" text="Select this mall" tabIndex={0} />
            </div>
          </div>
        </div>
      )}
      <Divider />
    </Layout>
  );
};

export default Transactions;
