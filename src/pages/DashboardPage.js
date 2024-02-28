import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coin } from "../functions/get100Coin";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // make it true

  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const handlePageChange = (event, value) => {
    setPage(value);
    var startingIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(startingIndex, startingIndex + 10));
  };

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

 

  const filteredCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    getData();
  }, []);
  const getData = async () =>{
    const myCoin = await get100Coin();
    if(myCoin){
      setCoins(myCoin);
      setPaginatedCoins(myCoin.slice(0, 10));
      setIsLoading(false);
    }
    
  }
  return (
    <div>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
