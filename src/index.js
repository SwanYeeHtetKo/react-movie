import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Appbar from "./components/Appbar";
import Container from '@mui/material/Container';
import Home from "./views/Home";
import Movie from "./views/Movie";
import People from "./views/People";
export default function App() {
  return (
    <div>
      <Router>
      <Appbar/>
      <Container style={{marginTop: '50px'}}>
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/movie/:id' element={<Movie/>} />
          <Route path='/people' element={<People/>} />
          </Routes>
      </Container>
    </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));