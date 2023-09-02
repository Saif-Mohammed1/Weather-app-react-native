import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import Navigation from "./src/components/navigation/navigation";
export default function App() {
  return (
    <SafeAreaProvider>
      {/* // <SafeAreaView className=" flex-1 "> */}
      <StatusBar style="light" />
      <Navigation />
    </SafeAreaProvider>
    // </SafeAreaView>
  );
}
