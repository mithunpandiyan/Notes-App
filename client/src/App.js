import './App.css';
import { Header } from './Components/Header/Header.js';
import { Footer } from './Components/Footer/Footer.js';
import { LandingPage } from './Screens/landingPage/landingPage.js';
import { LoginScreen } from './Screens/loginPage/loginScreen.js';
import { RegisterScreen } from './Screens/registerPage/registerScreen.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyNotes from './Screens/MyNotes/MyNotes.js';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Switch>
          <Route path='/' component={LandingPage} exact />
          <Route path='/mynotes' component={() => <MyNotes />} />
          <Route path='/login' component={() => <LoginScreen />} />
          <Route path='/register' component={() => <RegisterScreen />} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
