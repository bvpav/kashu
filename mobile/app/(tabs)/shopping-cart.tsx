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
          {cart.map((item) => (
            <RenderProduct
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
          {cart.map((item) => (
            <RenderProduct
              item={item}
              key={`shopping-cart-${item.product_id}`}
              screenWidth={screenWidth}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function AddButton() {
  return (
    <Link href="/category" asChild>
      <TouchableOpacity
        onPress={() => console.log("Pressed")}
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          zIndex: 100,
          backgroundColor: "#f8f8f8",
          borderRadius: 50,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
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
  item,
  screenWidth,
}: {
  item: Product;
  screenWidth: number;
}) {
  const styles = StyleSheet.create({
    categoryContainer: {
      height: screenWidth * 0.35,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
      borderWidth: 1,
      textAlign: "center",
      borderColor: "grey",
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
      backgroundColor: "#f8f8f8",
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
    </Pressable>
  );
}
