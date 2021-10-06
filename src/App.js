// import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/landingPage' //import pages 
import Navbar from './components/navbar'
import DetailPage from './pages/detailAlbum';
import LoginPage from './pages/loginPage'
// Route : menjadi penghubung page ke BrowserRouter
import { Route } from 'react-router-dom'
import VerificationPage from './pages/verification';
import UserList from './pages/registerPage';

function App() {
  return (
    <div className="App">
      {/* Virtual DOM */}
      <Navbar brand="Shutter" />
      <Route path="/" component={LandingPage} exact />
      <Route path="/user-list" component={UserList} />
      <Route path="/account" component={LoginPage} />
      <Route path="/authentication/:token" component={VerificationPage} />
      <Route path="/detail-album" component={DetailPage} />
    </div>
  );
}

export default App;
