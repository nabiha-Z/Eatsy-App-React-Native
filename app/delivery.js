import * as Progress from "react-native-progress";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
// import MapView, { Marker } from "react-native-maps";
import { Link } from "expo-router";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Location from "expo-location";

const DeliveryScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Dlatitude, setLatitude] = useState(33.65086);
  const [Dlongitude, setLongitude] = useState(73.034585);

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // console.log("location,", location);

      // setLocation(location);
      setLongitude(73.034585);
      setLatitude(33.65086);
    } catch (err) {
      console.log("err:", err);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View
          className={`flex-row justify-between items-center p-5 ${
            Platform.OS !== "ios" && "mt-7"
          }`}
        >
          <Link href="/">
            <XMarkIcon color="white" size={30} />
          </Link>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">40-50 Minutes</Text>
            </View>
            <Image
              source={require("./assets/images/delivery.gif")}
              className="h-24 w-24 ml-2"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order is being prepared
          </Text>
        </View>
      </SafeAreaView>
      {/* {Dlatitude === null ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <MapView
          initialRegion={{
            latitude: Dlatitude,
            longitude: Dlongitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          mapType="mutedStandard"
          className="flex-1 -mt-10 z-0"
        >
          <Marker
            coordinate={{ latitude: Dlatitude, longitude: Dlongitude }}
            pinColor={"green"}
            title={"title"}
            description={"description"}
          />
        </MapView>
      )} */}
    </View>
  );
};

export default DeliveryScreen;
