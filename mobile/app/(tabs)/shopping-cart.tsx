import { Link } from "expo-router";
import remToPx from "@/constants/fontSize";
import BackgroundImage from "@/components/background-image";
import LoadingPage from "@/components/loading";
import RenderProduct from "@/components/product";
import useCartContext from "@/hooks/useCartContext";
import React from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductsScreen() {
  const cartContext = useCartContext();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  if (!cartContext) {
    return (
      <LoadingPage
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        tabBarHeight={0}
      />
    );
  }

  const { cart } = cartContext;

  return (
    <>
      <BackgroundImage
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        tabBarHeight={40}
      >
        {cart.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontSize: remToPx(1.8),
              fontWeight: "bold",
              marginTop: screenHeight * 0.12,
            }}
          >
            Няма нищо в количката
          </Text>
        )}

        {cart.length < 4 ? (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              marginHorizontal: 0.05 * screenWidth,
              marginTop: screenHeight * 0.12,
            }}
          >
            {cart.map((item, index) => (
              <RenderProduct
                index={index}
                item={item}
                key={`shopping-cart-${item.product_id}`}
                screenWidth={screenWidth}
              />
            ))}
          </View>
        ) : (
          <View
            style={{
              maxHeight: 0.76 * screenHeight,
              marginTop: screenHeight * 0.12,
            }}
          >
            <ScrollView
              contentContainerStyle={{
                marginHorizontal: screenWidth * 0.05,
                width: "90%",
              }}
            >
              {cart.map((item, index) => (
                <RenderProduct
                  index={index}
                  item={item}
                  key={`shopping-cart-${item.product_id}`}
                  screenWidth={screenWidth}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </BackgroundImage>
      <AddButton />
      <GetRouteButton />
    </>
  );
}

function AddButton() {
  return (
    <Link href="/category" asChild>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          zIndex: 100,
          backgroundColor: "#ffffff",
          borderRadius: 50,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "#A5366F",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#A5366F",
            fontSize: remToPx(2),
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

function GetRouteButton() {
  return (
    <Link href="/map" asChild>
      <Pressable
        style={{
          backgroundColor: "#ffffff",
          padding: 10,
          borderWidth: 2,
          borderColor: "#A5366F",
          borderRadius: 8,
          position: "absolute",
          bottom: 30,
          alignSelf: "center",
          width: 200,
        }}
      >
        <Text
          style={{
            fontSize: remToPx(1.3),
            textAlign: "center",
            fontWeight: "800",
            color: "#A5366F",
          }}
        >
          СТАРТ
        </Text>
      </Pressable>
    </Link>
  );
}
