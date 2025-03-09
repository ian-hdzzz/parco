// components
import Layout from '../components/Layout/Layout';
import History from '../components/QR/QR';
import Divider from '../components/Divider/Divider';

const Transactions: React.FC = () => (
  <Layout>
    <Divider />

    <h1 className='title no-select'>Transactions</h1>

    {/* <History detailed date='May 6' dateBalance='-€127.78' /> */}

    <Divider />

    {/* <History detailed date='May 5' dateBalance='-€970.23' /> */}

    <Divider />
  </Layout>
);

export default Transactions;
