// components
import Layout from '../components/Layout/Layout';
import Balance from '../components/Balance/Balance';
import Actions from '../components/Actions/Actions';
import ParkingTicket from '../components/Card/Card';
import Widgets from '../components/Widgets/Widgets';
import Divider from '../components/Divider/Divider';
import { useLocation } from "react-router-dom";



const Home: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email || "guest@example.com"; // Usa el email pasado o un valor por defecto

  return(

  
  <Layout>
    <Balance balance={1325.5} currency='EURO' currencySymbol='€' />

    <Actions />

    <Divider />

    {/* <ParkingTicket
          email={email}
          ticketNumber="ABC-1234"
          entryTime="10:30 AM"
          exitTime="12:45 PM"
          amount= 0
        /> */}

    <Divider />

    <Widgets />

    <Divider />
  </Layout>
  );
};

export default Home;
