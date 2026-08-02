import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import type { ICarouselInstance } from "react-native-reanimated-carousel";

interface CarouselViewProps<T> {
  // ref?: React.RefObject<ICarouselInstance>;
  loop?: boolean;
  width: number;
  height?: number;
  snapEnabled?: boolean;
  pagingEnabled?: boolean;
  autoPlayInterval?: number;
  data: T[];
  onSnapToItem?: (index: number) => void;
  renderItem: (item: T, index: number) => JSX.Element;
}

function CarouselView<T>({
  // ref,
  data,
  renderItem,
  autoPlayInterval,
  height,
  loop,
  onSnapToItem,
  pagingEnabled,
  snapEnabled,
  width,
}: CarouselViewProps<T>) {
  return (
    <View>
      <Carousel
        // ref={ref}
        loop={loop}
        width={width}
        height={height}
        snapEnabled={snapEnabled}
        pagingEnabled={pagingEnabled}
        autoPlayInterval={autoPlayInterval}
        data={data}
        renderItem={({ item, index }) => renderItem(item, index) as JSX.Element}
      />
    </View>
  );
}

export default CarouselView;
