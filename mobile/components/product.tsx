import Product from "@/types/products";
import { useContext } from "react";
import { getColorBasedOnIndex } from "@/constants/Colors";
import { CartContext, CartContextType } from "@/contexts/cart-context";

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
export default function RenderProduct({
  index,
  item,
  screenWidth,
}: {
  index: number;
  item: Product;
  screenWidth: number;
}) {
  const { color, borderColor } = getColorBasedOnIndex(index);

  return (
    <Pressable
      style={{
        ...styles.categoryContainer,
        backgroundColor: color,
        borderColor: borderColor,
        height: screenWidth * 0.35,
      }}
      className="w-full"
    >
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

const styles = StyleSheet.create({
  categoryContainer: {
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
  },
});
