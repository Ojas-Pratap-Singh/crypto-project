import React, { useEffect, useState } from "react";
import { get100Coin } from "../../../functions/get100Coin";
import { all } from "axios";
import { MenuItem, Select } from "@mui/material";
import "./style.css";

function SelectCoin({ crypto1, crypto2, handleChangeCoin }) {
  const [allCoin, setAllCoin] = useState([]);

  const style = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const myCoin = await get100Coin();
    setAllCoin(myCoin);
  }
//   .filter((item) => item.id != crypto2)
  return (
    <div className="coins-flex">
      <p>Crypto 1</p>
      <Select
        sx={style}
        value={crypto1}
        label="Crypto 1"
        onChange={(event) => handleChangeCoin(event, false)}
      >
        {allCoin          
          .map((coin, i) => (
            <MenuItem key={i} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>

      <p>Crypto 2</p>
      <Select
        sx={style}
        value={crypto2}
        label="Crypto 2"
        onChange={(event) => handleChangeCoin(event, true)}
      >
        {allCoin
        .map((coin, i) => (
          <MenuItem key={i} value={coin.id}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectCoin;
