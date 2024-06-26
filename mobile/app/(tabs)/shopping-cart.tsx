import { Link, Stack } from "expo-router";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { getColorBasedOnIndex } from "@/constants/Colors";
import { CartContext, CartContextType } from "@/contexts/cart-context";
import Product from "@/types/products";
import LoadingPage from "@/components/loading";
import BackgroundImage from "@/components/background-image";

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

function RenderProduct({
  index,
  item,
  screenWidth,
}: {
  index: number;
  item: Product;
  screenWidth: number;
}) {
  const { color, borderColor } = getColorBasedOnIndex(index);

  const styles = StyleSheet.create({
    categoryContainer: {
      height: screenWidth * 0.35,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
      borderWidth: 2,
      textAlign: "center",
      // iOS Shadow
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // Android Shadow
      elevation: 5,
      borderRadius: 10,
      padding: 10,
      backgroundColor: color,
      borderColor: borderColor,
    },
  });

  return (
    <Pressable style={styles.categoryContainer} className="w-full">
      <View
        style={{
          width: 0.54 * screenWidth,
        }}
      >
        <Text className="text-3xl font-medium">{item.name}</Text>
        <Text className="text-lg">Катеогория: Нехранителни стоки</Text>
        <Text className="text-md">
          Сериен номер на продукта: {item.product_id}
        </Text>
      </View>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/assets/products/${item.id}.png`,
        }}
        style={{
          height: screenWidth * 0.3,
          width: screenWidth * 0.3,
          borderRadius: 8,
        }}
      />
      <DeleteButton product_id={item.product_id} />
    </Pressable>
  );
}

function DeleteButton({ product_id }: { product_id: string }) {
  const cartContext = useContext(CartContext) as CartContextType;
  const { removeFromCart } = cartContext;

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#A5366F",
        borderWidth: 2,
        zIndex: 100,
      }}
      onPress={() => removeFromCart(product_id)}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "#A5366F",
          fontSize: 16,
        }}
      >
        X
      </Text>
    </TouchableOpacity>
  );
}

function GetRouteButton() {
  return (
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
  );
}
