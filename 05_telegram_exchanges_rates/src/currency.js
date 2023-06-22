const NodeCache = require("node-cache");
const myCache = new NodeCache();

class Currency {
  // function for get currency from monobank
  async getCurrenctValuesMonobank(whatCurrency) {
    // fetch api
    const repsonseCurrenctyMonoBank = await fetch(
      "https://api.monobank.ua/bank/currency"
    );
    const dataAboutCurrenctyFormMonobank =
      await repsonseCurrenctyMonoBank.json();
    // if we call api more than 1 time in 60 seconds we get error and we must use cahce data adout currency
    if (repsonseCurrenctyMonoBank.status === 429) {
      const monobankCurrencyData = myCache.get("monobank-currency");
      if (monobankCurrencyData == undefined) {
        return "No data in response";
      } else {
        return monobankCurrencyData.filter((dataAboutCurrency) => {
          return dataAboutCurrency.currencyCodeA === whatCurrency;
        })[0];
      }
    } else {
      // if no errors we set response data to cache
      const monobacnkCurrecnyCacheSet = myCache.set(
        "monobank-currency",
        dataAboutCurrenctyFormMonobank,
        60
      );
      const monobankCurrencyData = myCache.get("monobank-currency");
      if (monobankCurrencyData == undefined) {
        return "No data in response";
      } else {
        // filter data to get currency that we need
        return monobankCurrencyData.filter((dataAboutCurrency) => {
          return dataAboutCurrency.currencyCodeA === whatCurrency;
        })[0];
      }
    }
  }

  async getCurrenctValuesPrivatBank(currency, variant = "bank") {
    // we select answear variant cash rate or non-cash
    const id = variant === "cash" ? 11 : 5;
    const repsonseCurrenctyPrivatBank = await fetch(
      `https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=${id}`
    );
    const resonseAboutCurrenctyFromPrivatBank =
      await repsonseCurrenctyPrivatBank.json();

    if (resonseAboutCurrenctyFromPrivatBank === undefined) {
      return "No data in response";
    } else {
      // set and monobank curreny data
      const privatbankCurrencyCahseSet = myCache.set(
        `privatbank-currency-${variant}`,
        resonseAboutCurrenctyFromPrivatBank,
        60
      );

      const privatbankCurrencyData = myCache.get(
        `privatbank-currency-${variant}`
      );

      if (privatbankCurrencyData == undefined) {
        return "No data in response";
      } else {
        // filter data to get currency that we need
        const dataAboutCurrenctyFromPrivatBank = privatbankCurrencyData.filter(
          (currencyData) => {
            return currencyData.ccy === currency;
          }
        )[0];
        return dataAboutCurrenctyFromPrivatBank;
      }
    }
  }
}

module.exports = new Currency();
