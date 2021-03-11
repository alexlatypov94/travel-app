import React, { ReactElement } from "react";

import "./CurrencyRate.scss";

export const CurrencyRate = (): ReactElement => {
  return (
    <aside className="widget-wrapper currency-widget">
      <h1 className="currency-title">local currency rate</h1>
      <div className="currency-wrapper">
        <div className="current-rate-wrapper">
          <div>
            <span>BLR</span>
            <span>&#8646;</span>
            <span>EUR</span>
          </div>
          <span className="cost-rate">100</span>
        </div>
        <div className="current-rate-wrapper">
          <div>
            <span>BLR</span>
            <span>&#8646;</span>
            <span>USD</span>
          </div>
          <span className="cost-rate">100</span>
        </div>
        <div className="current-rate-wrapper">
          <div>
            <span>BLR</span>
            <span>&#8646;</span>
            <span>RUB</span>
          </div>
          <span className="cost-rate">100</span>
        </div>
      </div>
    </aside>
  );
};
