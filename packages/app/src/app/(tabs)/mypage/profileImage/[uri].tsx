import styled from "@emotion/native";
import BackButton from "@entities/BackButton";
import { useImageZoomPan } from "@hooks/common/useImageZoomPan";
import uploadProfileImage from "@hooks/feature/query/imageupload";
import ScreenContainer from "@shared/layout/Screen";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { SaveFormat, useImageManipulator } from "expo-image-manipulator";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileImageScreen = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const decodedUri = decodeURIComponent(uri);
  const [isProcessing, setIsProcessing] = useState(false);
  const insets = useSafeAreaInsets();

  const context = useImageManipulator(decodedUri);

  const { width } = Dimensions.get("window");

  // 이미지 줌/팬 훅
  const { animatedStyle, gesture, scale, translateX, translateY } =
    useImageZoomPan({
      minScale: 1,
      maxScale: 2,
      boundaryWidth: width,
      boundaryHeight: width,
    });

  const handleComplete = async () => {
    try {
      setIsProcessing(true);

      // 현재 transform 값
      const currentScale = scale.value;
      const currentTranslateX = translateX.value;
      const currentTranslateY = translateY.value;

      // 원본 이미지 크기 가져오기
      await new Promise<void>((resolve, reject) => {
        Image.getSize(
          decodedUri,
          async (imgWidth, imgHeight) => {
            try {
              const { height } = Dimensions.get("window");

              // 화면 컨테이너 크기
              const headerApproxHeight = 60; // 헤더 대략 높이
              const contentContainerHeight =
                height - insets.top - insets.bottom - headerApproxHeight;
              const containerWidth = width;
              const containerHeight = contentContainerHeight * 0.5; // height: "50%"

              /**
               * resizeMode="cover" 계산
               *
               * resizeMode="cover"는 컨테이너를 완전히 채우기 위해 이미지를 확대/축소합니다.
               * 이미지의 가로세로 비율을 유지하면서, 컨테이너의 짧은 쪽을 기준으로 맞춥니다.
               * 이 과정에서 이미지의 일부가 컨테이너 밖으로 나가게 되고,
               * 그 나간 부분의 절반만큼이 offset이 됩니다.
               */
              const imgAspect = imgWidth / imgHeight;
              const containerAspect = containerWidth / containerHeight;

              let displayWidth: number,
                displayHeight: number,
                offsetX: number,
                offsetY: number;

              if (imgAspect > containerAspect) {
                /**
                 * 이미지가 컨테이너보다 더 넓은 경우 (가로로 긴 이미지)
                 * - 높이를 컨테이너에 맞추고, 너비는 비율에 따라 확대
                 * - 좌우로 이미지가 잘리므로 offsetX가 발생
                 */
                displayHeight = containerHeight;
                displayWidth = displayHeight * imgAspect;
                offsetX = (displayWidth - containerWidth) / 2;
                offsetY = 0;
              } else {
                /**
                 * 이미지가 컨테이너보다 더 높은 경우 (세로로 긴 이미지)
                 * - 너비를 컨테이너에 맞추고, 높이는 비율에 따라 확대
                 * - 상하로 이미지가 잘리므로 offsetY가 발생
                 */
                displayWidth = containerWidth;
                displayHeight = displayWidth / imgAspect;
                offsetX = 0;
                offsetY = (displayHeight - containerHeight) / 2;
              }

              /**
               * 표시 크기에서 원본 크기로의 스케일 팩터
               *
               * displayWidth는 화면에 표시되는 이미지의 너비 (픽셀)
               * imgWidth는 원본 이미지의 실제 너비 (픽셀)
               *
               * 예: 원본 이미지가 4000px인데 화면에 400px로 표시된다면
               *     displayToOriginalScale = 4000 / 400 = 10
               */
              const displayToOriginalScale = imgWidth / displayWidth;

              /**
               * 원형 가이드 중심 (화면 좌표)
               *
               * CircularGuide는 styled component에서 top: 50%로 설정되어 있으므로
               * ContentContainer 높이의 50% 지점에 위치합니다.
               *
               * guideCenterX: 화면 너비의 절반 (화면 가운데)
               * guideCenterY: ContentContainer 높이의 절반
               */
              const guideCenterX = width / 2;
              const guideCenterY = contentContainerHeight / 2;

              /**
               * 이미지 컨테이너의 실제 위치 계산
               *
               * GestureHandlerRootView는 justifyContent: "center"로 설정되어 있어
               * 이미지가 세로 중앙 정렬됩니다.
               * 따라서 이미지 컨테이너의 top 위치를 계산해야 합니다.
               */
              const imageContainerHeight = contentContainerHeight * 0.5;
              const imageContainerTop =
                (contentContainerHeight - imageContainerHeight) / 2;

              /**
               * 1단계: 화면 좌표를 표시된 이미지 좌표로 역변환
               *
               * React Native의 transform은 요소의 중심을 기준으로 적용됩니다:
               * - 이미지좌표 → scale (중심 기준) → translate → 화면좌표
               * - 공식: 화면좌표 = center + (이미지좌표 - center) × scale + translate
               *
               * 따라서 역변환은:
               * - 이미지좌표 = center + (화면좌표 - translate - center) / scale
               *
               * 이미지 컨테이너의 중심 계산
               */
              const containerCenterX = width / 2;
              const containerCenterY = imageContainerHeight / 2;

              /**
               * 원형 가이드 중심을 이미지 컨테이너 기준 좌표로 변환
               */
              const guideRelativeX = guideCenterX;
              const guideRelativeY = guideCenterY - imageContainerTop;

              /**
               * 중심 기준 역변환 적용
               * - guideRelativeX/Y: 화면에서 원형 가이드의 중심 (이미지 컨테이너 기준)
               * - currentTranslateX/Y: 사용자가 pan 제스처로 이동한 거리
               * - containerCenterX/Y: 이미지 컨테이너의 중심
               * - currentScale: 사용자가 pinch 제스처로 확대/축소한 배율
               */
              const displayImageX =
                containerCenterX +
                (guideRelativeX - currentTranslateX - containerCenterX) /
                  currentScale;
              const displayImageY =
                containerCenterY +
                (guideRelativeY - currentTranslateY - containerCenterY) /
                  currentScale;

              /**
               * 2단계: 표시된 이미지 좌표를 전체 이미지 좌표로 변환
               *
               * resizeMode="cover"로 인해 이미지의 일부가 화면 밖으로 나갔습니다.
               * offsetX/offsetY는 화면 밖으로 나간 부분의 절반입니다.
               *
               * 따라서 표시된 이미지의 왼쪽 위 모서리는 (-offsetX, -offsetY)에 위치합니다.
               * displayImageX/Y는 표시된 이미지의 왼쪽 위를 (0, 0)으로 봤을 때의 좌표이므로,
               * offsetX/Y를 더해서 전체 이미지 좌표계로 변환합니다.
               */
              const fullDisplayImageX = displayImageX + offsetX;
              const fullDisplayImageY = displayImageY + offsetY;

              /**
               * 3단계: 전체 이미지 좌표를 원본 이미지 좌표로 변환
               *
               * 화면에 표시된 이미지는 축소되어 있습니다.
               * displayToOriginalScale은 표시 크기를 원본 크기로 변환하는 배율입니다.
               *
               * 예: 원본이 4000px인데 화면에 400px로 표시되면 displayToOriginalScale = 10
               *     화면의 100px 위치는 원본의 1000px 위치에 해당
               */
              const originalImageX = fullDisplayImageX * displayToOriginalScale;
              const originalImageY = fullDisplayImageY * displayToOriginalScale;

              /**
               * 4단계: 크롭 영역 계산
               *
               * cropSize: 원형 가이드의 크기 (width와 동일, 정사각형)
               * displayCropSize: 사용자가 확대/축소한 배율을 고려한 크롭 크기
               * originalCropSize: 원본 이미지 해상도에서의 크롭 크기
               *
               * originalImageX/Y는 크롭 영역의 중심이므로,
               * 크롭 영역의 좌상단을 구하기 위해 크기의 절반을 뺍니다.
               */
              const cropSize = width; // 원형 가이드 크기
              const displayCropSize = cropSize / currentScale;
              const originalCropSize = displayCropSize * displayToOriginalScale;

              const originalX = originalImageX - originalCropSize / 2;
              const originalY = originalImageY - originalCropSize / 2;

              /**
               * 5단계: 크롭 경계 제한
               *
               * 계산된 크롭 영역이 원본 이미지 범위를 벗어나지 않도록 제한합니다.
               *
               * finalX/Y: 크롭 시작 위치 (0 이상, 이미지 끝을 넘지 않음)
               * finalWidth/Height: 크롭 크기 (이미지 범위 내에서 가능한 최대 크기)
               */
              const finalX = Math.max(
                0,
                Math.min(originalX, imgWidth - originalCropSize),
              );
              const finalY = Math.max(
                0,
                Math.min(originalY, imgHeight - originalCropSize),
              );
              const finalWidth = Math.min(originalCropSize, imgWidth - finalX);
              const finalHeight = Math.min(
                originalCropSize,
                imgHeight - finalY,
              );

              /**
               * 6단계: 이미지 자르기 및 리사이즈
               *
               * expo-image-manipulator를 사용하여:
               * 1. 원본 이미지에서 계산된 영역을 크롭
               * 2. 크롭된 이미지를 정사각형(width x width)으로 리사이즈
               */
              // const result = await manipulateAsync(
              //   decodedUri,
              //   [
              //     {
              //       crop: {
              //         originX: finalX,
              //         originY: finalY,
              //         width: finalWidth,
              //         height: finalHeight,
              //       },
              //     },
              //     {
              //       resize: {
              //         width: width,
              //         height: width,
              //       },
              //     },
              //   ],
              //   { format: SaveFormat.PNG },
              // );

              context.crop({
                originX: finalX,
                originY: finalY,
                width: finalWidth,
                height: finalHeight,
              });
              // context.resize({
              //   width: width,
              //   height: width,
              // });
              const renderedImage = await context.renderAsync();
              const result = await renderedImage.saveAsync({
                format: SaveFormat.PNG,
              });

              // FormData 생성 및 서버로 업로드
              const formData = new FormData();
              formData.append("file", {
                uri: result.uri,
                name: "profile.png",
                type: "image/png",
              } as any);

              // TODO: S3 업로드 API 호출
              await uploadProfileImage(formData);
              // await uploadProfileImageApi(axiosInstance, formData);

              resolve();
            } catch (error) {
              reject(error);
            }
          },
          (error) => {
            reject(new Error(`이미지 크기를 가져올 수 없습니다: ${error}`));
          },
        );
      });

      // 이전 화면으로 돌아가기
      router.back();
    } catch (error) {
      console.error("이미지 처리 실패:", error);
      Alert.alert("오류", "이미지를 처리하는 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScreenContainer backgroundColor="mainWhite">
      <HeaderContainer>
        <BackButton />
        <ConfirmButton onPress={handleComplete} disabled={isProcessing}>
          {isProcessing ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text color="primary" fontWeight="semibold" fontSize={16}>
              완료
            </Text>
          )}
        </ConfirmButton>
      </HeaderContainer>
      <ContentContainer>
        <GestureHandlerRootView
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GestureDetector gesture={gesture}>
            <Animated.Image
              source={{ uri: decodedUri }}
              accessible={true}
              accessibilityLabel="Selected profile image preview"
              resizeMode="cover"
              style={
                [
                  {
                    width: "100%",
                    height: "50%",
                  },
                  animatedStyle,
                ] as any
              }
            />
          </GestureDetector>
          <CircularGuide
            style={{
              width: width,
              height: width,
              borderRadius: width / 2,
              marginTop: -width / 2,
            }}
          />
        </GestureHandlerRootView>
      </ContentContainer>
    </ScreenContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 16px;
  padding-block: 12px;
  z-index: 100;
  background-color: ${COLORS.mainWhite};
`;

const ConfirmButton = styled.TouchableOpacity``;

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.gray900};
  position: relative;
`;

const CircularGuide = styled.View`
  position: absolute;
  top: 50%;
  border-width: 2px;
  border-color: white;
  pointer-events: none;
`;

export default ProfileImageScreen;
