import { Link } from "expo-router";
import { CartContext, CartContextType } from "@/contexts/cart-context";

import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import LoadingPage from "@/components/loading";
import BackgroundImage from "@/components/background-image";
import RenderProduct from "@/components/product";

export default function ProductsScreen() {
  const cartContext = useContext(CartContext) as CartContextType;
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
              fontSize: 24,
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
                marginHorizontal: "auto",
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
            fontSize: 32,
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
            fontSize: 20,
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
