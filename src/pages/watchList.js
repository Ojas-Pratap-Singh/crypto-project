import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import Button from "../components/Common/Button";
import { get100Coin } from "../functions/get100Coin";
import TabsComponent from "../components/Dashboard/Tabs";

function WatchlistPage() {
  

  return (
    <div>
     
              <Header />
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                Watchlist Function Coming Soon..
              </h1>
             
    </div>
  );
}

export default WatchlistPage;