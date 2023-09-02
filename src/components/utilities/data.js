import AsyncStorage from "@react-native-async-storage/async-storage";

export const sortData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing value: ", error);
  }
};
export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log("Error storing value: ", error);
    return null;
  }
};
