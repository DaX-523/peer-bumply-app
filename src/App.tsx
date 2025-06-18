import {AuthProvider} from './context/AuthContext';
import Home from './screens/Home/Home';

export default function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
