import axios from "axios";
import { Alert } from "react-native";

const location = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${"525019a7437e4f60b1d143955233108"}&q=${
    params.cityName
  }`;
const fetchForecast = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${"525019a7437e4f60b1d143955233108"}&q=${
    params.cityName
  }&days=${params.days}&aqi=no&alerts=no`;

const api = async (url) => {
  const options = { method: "get", url };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("err", error);
    Alert.alert("something went wrong", error);
  }
};

export const fetchLocation = (params) => api(location(params));
export const fetchForecastData = (params) => api(fetchForecast(params));
