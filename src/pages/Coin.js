import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { useState } from "react";
import { CoinObject } from "../functions/ConvertObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinData } from "./getCoinData";
import { getCoinPRices } from "./getCoinPrices";
import LineChart from "../components/Coin/LineChart";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import ToggleComponents from "../components/Coin/PriceType";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true); // make it true
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {
    const data = await getCoinData(id);
    if (data) {
      CoinObject(setCoinData, data);
      const prices = await getCoinPRices(id, days, priceType);
      if (prices.length > 0) {
        console.log("wooooo");
        settingChartData(setChartData, prices);
        setIsLoading(false);
      }
    }
  }

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPRices(id, event.target.value, priceType);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };
  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    const prices = await getCoinPRices(id, days, newType);
    console.log("prices in price", prices);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coinData} />
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
