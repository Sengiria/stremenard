import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/authentication/sign-in.component';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
      </Routes>
    </div>
  );
}

export default App;
