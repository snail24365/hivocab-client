import './App.css';
import Auth from './component/Auth';
import Main from './component/Main'

function App() {
  var isAuthenticated = false;

  return (
    <div>
      {isAuthenticated ? <Main /> : <Auth />}
    </div>
  );
}

export default App;
