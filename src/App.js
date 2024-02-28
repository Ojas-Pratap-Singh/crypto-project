import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import WatchlistPage from "./pages/watchList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path='/coin/:id' element={<CoinPage/>}/>
            <Route path='/compare' element={<ComparePage/>}/>
            <Route path='/watchlist' element={<WatchlistPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
