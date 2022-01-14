import { useContext } from 'react';
import './App.css';
import Auth from './component/Auth';
import Main from './component/Main';
import { GlobalContext } from './context/GlobalStore'

function App() {
  const { isAuthenticated } = useContext(GlobalContext);

  return (
    <div>
      {isAuthenticated ? <Main /> : <Auth />}
    </div>
  );
}

export default App;
