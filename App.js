import React, { useEffect, useState } from "react";
import { View, Image, Dimensions, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import DVDLogoSVG from "./DVDLogoSVG";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Define the logo dimensions
const LOGO_ASPECT_RATIO = 492 / 900;
const LOGO_WIDTH = screenWidth / 4; // Logo takes up to 1/4 of the screen width
const LOGO_HEIGHT = LOGO_WIDTH * LOGO_ASPECT_RATIO; // Maintain the aspect ratio

const DVDLogoComponent = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const velocityX = useSharedValue(2.5); // You can adjust velocity as needed
  const velocityY = useSharedValue(2.5);
  const [color, setColor] = useState("black");

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
  }

  useEffect(() => {
    const animate = () => {
      posX.value += velocityX.value;
      posY.value += velocityY.value;

      if (posX.value + LOGO_WIDTH > screenWidth || posX.value < 0) {
        velocityX.value = -velocityX.value;
        posX.value = Math.max(
          0,
          Math.min(posX.value, screenWidth - LOGO_WIDTH)
        );
        setColor(getRandomColor());
      }
      if (posY.value + LOGO_HEIGHT > screenHeight || posY.value < 0) {
        velocityY.value = -velocityY.value;
        posY.value = Math.max(
          0,
          Math.min(posY.value, screenHeight - LOGO_HEIGHT)
        );
        setColor(getRandomColor());
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: posX.value }, { translateY: posY.value }],
      width: LOGO_WIDTH,
      height: LOGO_HEIGHT,
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={animatedStyle}>
        <DVDLogoSVG color={color} width={LOGO_WIDTH} height={LOGO_WIDTH} />
      </Animated.View>
    </View>
  );
};

export default DVDLogoComponent;
