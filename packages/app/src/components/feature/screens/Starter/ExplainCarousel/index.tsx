import styled from "@emotion/native";
import ExplainItems from "@process/ExplainItems";
import { LeftArrowSVG, RightArrowSVG } from "@shared/ui/Icons";
import { COLORS } from "@styles/colorPalette";
import { useCallback, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import LoginButton from "../LoginButton";

const { width, height } = Dimensions.get("window");

const data = Array(ExplainItems.Views.length)
  .fill(0)
  .map((_, index) => index);

const ExplainCarousel = () => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [index, setIndex] = useState(0);

  const onPressPagination = useCallback(
    () => (index: number) => {
      carouselRef.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    },
    [carouselRef],
  );

  const goToNext = useCallback(() => {
    carouselRef.current?.scrollTo({
      count: index + 1,
      animated: true,
    });
  }, [carouselRef]);

  const goToPrev = useCallback(() => {
    carouselRef.current?.scrollTo({
      count: index - 1,
      animated: true,
    });
  }, [carouselRef]);

  return (
    <Container>
      <View>
        {index !== 0 && (
          <ArrowLeftButton activeOpacity={0.8} onPress={goToPrev}>
            <LeftArrowSVG />
          </ArrowLeftButton>
        )}
        <Carousel
          ref={carouselRef}
          data={data}
          loop={false}
          width={width}
          height={height - LoginButton.OCCUPY_SPACE}
          onSnapToItem={(i) => i !== index && setIndex(i)}
          renderItem={({ index }) => <>{ExplainItems.Views[index]()}</>}
        />
        {index !== data.length - 1 && (
          <ArrowRightButton activeOpacity={0.8} onPress={goToNext}>
            <RightArrowSVG />
          </ArrowRightButton>
        )}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          {data.map((_, i) => (
            <View
              key={i}
              style={{
                backgroundColor:
                  i === index ? COLORS.mainGreen : COLORS.subGray,
                width: 8,
                height: 8,
                borderRadius: "100%",
              }}
            />
          ))}
        </View>
      </View>
    </Container>
  );
};

const Container = styled.View`
  height: ${height - LoginButton.OCCUPY_SPACE}px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ArrowLeftButton = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  left: 15px;
  z-index: 1;
`;

const ArrowRightButton = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  right: 15px;
  z-index: 1;
`;
export default ExplainCarousel;
