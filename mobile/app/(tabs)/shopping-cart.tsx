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
interface Product {
  id: number;
  name: string;
  product_id: string;
  category_id: number;
}

export default function ProductsScreen() {
  const cartContext = useContext(CartContext) as CartContextType;

  if (!cartContext) {
    return <Text>Loading...</Text>;
  }

  const { cart } = cartContext;

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ title: "Количка" }} />
      {cart.length === 0 && (
        <Text className="text-center text-black text-2xl font-medium mx-auto mt-6">
          Няма нищо в количката
        </Text>
      )}

      <AddButton />

      {cart.length < 4 ? (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginHorizontal: 0.05 * screenWidth,
            marginTop: 10,
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
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            flexWrap: "wrap",
            marginHorizontal: "auto",
            width: "90%",
            height: screenWidth * 2,
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
      )}
      <GetRouteButton />
    </View>
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
        source={require(`../../assets/category/4.jpg`)}
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
        backgroundColor: "gray",
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
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
        }}
      >
        Get Route
      </Text>
    </Pressable>
  );
}
