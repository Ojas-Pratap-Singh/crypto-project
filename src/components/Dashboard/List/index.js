import React from "react";
import "./style.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Tooltip } from "@mui/material";
import ConvertNumber from "../../../functions/ConvertNumber";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function List({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
    <motion.tr 
     initial={{ opacity: 0, x: 50 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.5 }}
    className="list-row">
      <Tooltip title="Coin Logo" placement="bottom-start">
        <td className="td-image">
          <img src={coin.image} className="coin-logo" />
        </td>
      </Tooltip>
      <Tooltip title="Coin Info" placement="bottom-start">
        <td>
          <div className="name-col">
            <p className="coin-symbol"> {coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
        </td>
      </Tooltip>
      <Tooltip title="Coin Price change in 24hr" placement="bottom-start">
        {coin.price_change_percentage_24h > 0 ? (
          <td className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip td-icon">
              <TrendingUpRoundedIcon />
            </div>
          </td>
        ) : (
          <td className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red td-icon">
              <TrendingDownRoundedIcon />
            </div>
          </td>
        )}
      </Tooltip>
      <Tooltip title="Coin price" placement="bottom">
        <td>
          <h3
            className="coin-price td-center-align"
            style={{
              color:
                coin.price_change_percentage_24h < 0
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
        </td>
      </Tooltip>
      <Tooltip title="Total Volume" placement="bottom-end">
        <td>
          <p className="total-volume td-right-align td-total-volume">
            {coin.total_volume.toLocaleString()}
          </p>
        </td>
      </Tooltip>

      <Tooltip title="Market cap" placement="bottom-end">
        <td className="desktop-view">
          <p className="total-volume td-right-align ">
            ${coin.market_cap.toLocaleString()}
          </p>
        </td>
      </Tooltip>

      <Tooltip title="Market cap" placement="bottom-end">
        <td className="mobile-view">
          <p className="total-volume td-right-align ">
            ${ConvertNumber(coin.market_cap)}
          </p>
        </td>
      </Tooltip>
    </motion.tr>
    </Link>
  );
}

export default List;
