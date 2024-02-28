import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoin from "../components/Compare/SelectCoin";
import SelectDays from "../components/Coin/SelectDays";
import { CoinObject } from "../functions/ConvertObject";
import { settingChartData } from "../functions/settingChartData";
import { getCoinData } from "./getCoinData";
import { getCoinPRices } from "./getCoinPrices";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import ToggleComponents from "../components/Coin/PriceType";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  const [days, setDays] = useState(30);
 async function handleDaysChange(event) {
    setIsLoading(true);

    setDays(event.target.value);
    const prices1 = await getCoinPRices(crypto1, event.target.value, priceType);
    const prices2 = await getCoinPRices(crypto2, event.target.value, priceType);
    settingChartData(setChartData,prices1,prices2);
    setIsLoading(false);

  }
  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    const prices1 = await getCoinPRices(crypto1, days, newType);
    const prices2 = await getCoinPRices(crypto2, days, newType);
    settingChartData(setChartData,prices1,prices2);
      setIsLoading(false);
    
  };
  useEffect(() => {
    console.log("useffect")
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    console.log("data1")

    if (data1) {
      console.log(" getting data2")

      const data2 = await getCoinData(crypto2);
      console.log(" got data2")

      CoinObject(setCrypto1Data, data1);
      console.log("set data 2 in coin object data2")

      if (data2) {
        CoinObject(setCrypto2Data, data2);
        const prices1 = await getCoinPRices(crypto1, days, priceType);
        const prices2 = await getCoinPRices(crypto2, days, priceType);
        console.log("both prices fetched", prices1, prices2);
        settingChartData(setChartData,prices1,prices2);
        setIsLoading(false);
      }
    }
  }

  const handleChangeCoin = async (event, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      CoinObject(setCrypto2Data, data);
      const prices1 = await getCoinPRices(crypto1, days, priceType);
      const prices2 = await getCoinPRices(crypto2, days, priceType);
      if (prices1.length > 0 && prices2.length > 0) {
        console.log("both prices fetched again", prices1, prices2);
        // settingChartData(setChartData,prices);
        setIsLoading(false);
      }
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);

      CoinObject(setCrypto1Data, data);
    }
  };
  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coin-days-flex">
            <SelectCoin
              crypto1={crypto1}
              crypto2={crypto2}
              handleChangeCoin={handleChangeCoin}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPtag={true}
            />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto2Data} />
          </div>
          <div className="grey-wrapper">
          <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />            
            <LineChart chartData={chartData} priceType={priceType} multiAxis={true}/>
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  );
}

export default ComparePage;
