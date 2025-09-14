import styled from "@emotion/native";
import BackButton from "@entities/BackButton";
import MapHeaderTag from "@shared/ui/MapHeaderTag";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//TODO: FilterTag 따로 분리하기
interface FilterTag {
  id: "BASE" | "TOILET" | "MARKET" | "RENTAL" | "EMERGENCY_KIT";
  facilityName: "거점" | "화장실" | "매장" | "대여 서비스" | "응급키트";
}

interface MapHeaderNavbarProps {
  children?: (props: { selectedTags: string[] }) => React.ReactNode;
}

const FILTER_TAGS: FilterTag[] = [
  { id: "BASE", facilityName: "거점" },
  { id: "TOILET", facilityName: "화장실" },
  { id: "MARKET", facilityName: "매장" },
  { id: "RENTAL", facilityName: "대여 서비스" },
  { id: "EMERGENCY_KIT", facilityName: "응급키트" },
];

const MapHeaderNavbar = ({ children }: MapHeaderNavbarProps) => {
  const insets = useSafeAreaInsets();

  const [selectedTagIds, setSelectedTags] = useState<string[]>(["BASE"]);

  const onTagPress = (tagId: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) return prev.filter((id) => id !== tagId);
      return [...prev, tagId];
    });
  };

  return (
    <>
      <Container paddingTop={insets.top + 12}>
        {/* Back Button */}
        <BackButton background />

        {/* Filter Tags */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: "row" }}
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {FILTER_TAGS.map(({ id, facilityName }) => {
            const isSelected = selectedTagIds.includes(id);

            return (
              <MapHeaderTag
                key={id}
                text={facilityName}
                isSelected={isSelected}
                onPressHandler={() => onTagPress(id)}
              />
            );
          })}
        </ScrollView>
      </Container>
      {children && children({ selectedTags: selectedTagIds })}
    </>
  );
};

const Container = styled.View<{ paddingTop: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding-top: ${(props) => props.paddingTop}px;
  padding-inline: 24px;
  width: 100%;
  flex-direction: row;
  gap: 12px;
`;

export default MapHeaderNavbar;
