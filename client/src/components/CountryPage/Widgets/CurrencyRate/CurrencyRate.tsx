import React, { ReactElement } from "react";

import "./CurrencyRate.scss";

export const CurrencyRate = ({ country, rates }: any): ReactElement => {
  return (
    <aside className="widget-wrapper currency-widget">
      <div className="currency-wrapper">
        <div className="current-rate-wrapper">
          <div>
            <span>
              <span className="cost-rate">1&nbsp;</span>
              {country?.countryCurrency}
            </span>
            <span>&nbsp;&#8646;&nbsp;</span>
            <span>EUR</span>
          </div>
          <span className="cost-rate">
            {((rates?.USD / rates?.[country?.countryCurrency]) * rates?.EUR).toFixed(2)}
          </span>
        </div>
        <div className="current-rate-wrapper">
          <div>
            <span>
              <span className="cost-rate">1&nbsp;</span>
              {country?.countryCurrency}
            </span>
            <span>&nbsp;&#8646;&nbsp;</span>
            <span>USD</span>
          </div>
          <span className="cost-rate">
            {((rates?.USD / rates?.[country?.countryCurrency]) * rates?.USD).toFixed(2)}
          </span>
        </div>
        <div className="current-rate-wrapper">
          <div>
            <span>
              <span className="cost-rate">1&nbsp;</span>
              {country?.countryCurrency}
            </span>
            <span>&nbsp;&#8646;&nbsp;</span>
            <span>RUB</span>
          </div>
          <span className="cost-rate">
            {((rates?.USD / rates?.[country?.countryCurrency]) * rates?.RUB).toFixed(2)}
          </span>
        </div>
      </div>
    </aside>
  );
};
