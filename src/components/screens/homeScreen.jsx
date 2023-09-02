import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { debounce } from "lodash";
import { fetchForecastData, fetchLocation } from "../utilities/api";
import weatherImages from "../constants/index";
import { getData, sortData } from "../utilities/data";
const HomeScreen = () => {
  const [weather, setWeather] = useState({});
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState([]);
  useEffect(() => {
    const getWeatherData = async () => {
      let cityName = await getData("City");
      if (!cityName) {
        cityName = "cairo";
      }
      fetchForecastData({ cityName, days: "7" }).then((data) => {
        setVisible(false);
        setIsLoading(false);
        setLocation([]);
        setWeather(data);
      });
    };
    getWeatherData();
  }, []);
  const Forecast = (value) => {
    setIsLoading(true);

    option = {
      cityName: value.name,
      days: "7",
    };

    fetchForecastData(option).then((data) => {
      setVisible(false);
      setIsLoading(false);

      setLocation([]);
      setWeather(data);
    });
    sortData("City", value.name);
  };
  const textChange = (value) => {
    if (value.length >= 3) {
      fetchLocation({ cityName: value }).then((data) => setLocation(data));
    }
  };
  const textChangeHandler = useCallback(debounce(textChange, 1000), []);
  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={40}
        className=" absolute w-full h-full"
        source={require("../../../assets/thunderstorm-3625405_1920.jpg")}
      />
      <SafeAreaView className="flex-1">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        ) : (
          <View className="flex-1 relative px-2 ">
            <View
              className={`  justify-end  rounded-full opacity-70  my-2 flex flex-row items-center 	 ${
                visible ? " bg-gray-600 " : ""
              } `}
            >
              {visible && (
                <TextInput
                  // value={search}
                  placeholder=" Search City"
                  placeholderTextColor={"white"}
                  onChangeText={textChangeHandler}
                  className="flex-1 rounded-full p-2  font-bold tracking-2 text-white text-base	"
                />
              )}
              <TouchableOpacity
                onPress={() => setVisible(!visible)}
                className="rounded-full  p-1 w-30 h-30 bg-gray-500 "
              >
                <FontAwesome name="search" size={30} color="black" />
              </TouchableOpacity>
            </View>
            {location.length > 0 && visible && (
              <View className="absolute top-14 bg-white w-full mt-1 rounded z-50 self-center">
                {location.map((item, indx) => {
                  let showBorder = indx + 1 != location.length;
                  let border = showBorder && " border-b-2 border-gray-600";
                  return (
                    <TouchableOpacity
                      key={indx}
                      onPress={() => Forecast(item)}
                      className={`flex-row p-2 ${border}`}
                    >
                      <Entypo name="location-pin" size={24} color="black" />
                      <Text>
                        {item?.name}, {item?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            {weather.location && (
              <View
                className="
           my-3 flex-1 items-center justify-between  "
              >
                <Text className="font-bold text-xl text-white  ">
                  {weather.location.name}{" "}
                  <Text className=" text-gray-600 ">
                    , {weather.location.country}
                  </Text>
                </Text>

                <Image
                  className="w-60 h-60"
                  source={weatherImages[weather?.current?.condition?.text]}
                />
                <View className=" mt-10 items-center">
                  <Text className="text-2xl text-white opacity-80 font-bold">
                    {weather?.current?.temp_c}&#176;
                  </Text>
                  <Text className=" my-1 text-xl text-white opacity-80 font-bold">
                    {weather?.current?.condition?.text}
                  </Text>
                </View>
              </View>
            )}
            {weather.location && (
              <View
                className="
           my-2  flex-row justify-between items-center  "
              >
                <View className=" flex-row items-center">
                  <MaterialCommunityIcons
                    name="weather-windy"
                    size={24}
                    color="white"
                  />

                  <Text className=" my-1 text-xl text-white opacity-80 font-bold">
                    {" "}
                    {weather?.current?.vis_km} km
                  </Text>
                </View>
                <View className=" flex-row items-center">
                  <MaterialCommunityIcons
                    name="water-outline"
                    size={24}
                    color="white"
                  />

                  <Text className=" my-1 text-xl text-white opacity-80 font-bold">
                    {weather?.current?.humidity} %
                  </Text>
                </View>
                <View className=" flex-row items-center">
                  <Feather name="sun" size={24} color="white" />
                  <Text className=" my-1 text-xl text-white opacity-80 font-bold">
                    {" "}
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            )}
            <View className="mb-2 ">
              <FlatList
                data={weather?.forecast?.forecastday}
                horizontal
                renderItem={({ item }) => {
                  const date = new Date(item.date);
                  const options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];

                  return (
                    <View className=" justify-center  items-center w-24 rounded-3xl py-3 space-y-1 mr-4 bg-gray-600">
                      <Image
                        className="w-10 h-10"
                        source={weatherImages[item?.day?.condition?.text]}
                      />
                      <Text className="text-base text-white">{dayName}</Text>
                      <Text className="text-base text-white">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
