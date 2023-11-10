import { SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useRouter } from "expo-router";

const OrderProcessingScreen = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("./assets/images/OrderProcess.gif")}
        animation="slideInUp"
        iteration
        Count={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iteration
        Count={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default OrderProcessingScreen;
