import { useContext } from 'react';
import './App.css';
import Auth from './component/Auth';
import Main from './component/Main';
import AuthPageStore from './context/AuthPageStore';
import { GlobalContext } from './context/GlobalStore'

function App() {

  const { isAuthenticated, } = useContext(GlobalContext);
  return (
    <>
      {isAuthenticated ? <Main /> : <AuthPageStore><Auth /></AuthPageStore>}
    </>
  );
}

export default App;
