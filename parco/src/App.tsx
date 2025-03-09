import Navigation from './navigation/Navigation';
import { UserProvider } from './UserContext';

const App: React.FC = () => {
    return (
        <UserProvider>
            <Navigation />
        </UserProvider>
    )
}

export default App;
