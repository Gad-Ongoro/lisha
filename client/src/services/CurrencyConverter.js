import axios from "axios";

export const currencyConverter = async () => {
    const currency = localStorage.getItem('currency');
    const URL = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_CURRENCY_EXCHANGE_RATE_API_KEY}/latest/KES`;

    const { data } = await axios.get(URL);
    return data;
}