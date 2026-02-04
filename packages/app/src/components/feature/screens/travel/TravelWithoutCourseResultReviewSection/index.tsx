import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import {
  formatDateTime,
  formatTime,
  getKoreanDayOfWeek,
  msToTimeText,
} from "@utils/time";

const TravelWithoutCourseResultReviewSection = () => {
  const { getElapsedTime, distance, timelog } = useTravelStateStore();

  // timelog에서 시작/종료 시간 추출
  const getStartEndTime = () => {
    if (!timelog || timelog.length === 0) {
      return { startTime: null, endTime: null, startTimestamp: null };
    }

    // 첫 번째 "start" 이벤트 찾기
    const startEntry = timelog.find(([type]) => type === "start");
    const startTimestamp = startEntry ? startEntry[1] : null;

    // 마지막 "end" 이벤트 찾기 (없으면 현재 시간 사용)
    const endEntries = timelog.filter(([type]) => type === "end");
    const endTimestamp =
      endEntries.length > 0 ? endEntries[endEntries.length - 1][1] : Date.now();

    return {
      startTime: startTimestamp ? formatTime(startTimestamp) : null,
      endTime: formatTime(endTimestamp),
      startTimestamp,
    };
  };

  const { startTime, endTime, startTimestamp } = getStartEndTime();

  // 날짜 포맷팅 (시작 시간 기준)
  const dateText = startTimestamp
    ? formatDateTime(startTimestamp).split(" ")[0]
    : "날짜 없음";

  // 시간 범위 텍스트
  const timeRangeText =
    startTime && endTime
      ? `${dateText} ${startTime} ~ ${endTime}`
      : "시간 정보 없음";

  // 코스 제목 (요일 기반)
  const courseTitleText = startTimestamp
    ? `${getKoreanDayOfWeek(startTimestamp)} 산행 코스`
    : "산행 코스";

  // 소요시간
  const elapsedTimeText = msToTimeText(getElapsedTime());

  // 이동거리 (소수점 둘째자리까지)
  const distanceText = distance.toFixed(2);

  return (
    <Container>
      <Spacing size={23} />

      {/* 날짜 및 시간 */}
      <DateTimeText fontWeight="medium" fontSize={14}>
        {timeRangeText}
      </DateTimeText>

      <Spacing size={4} />

      {/* 코스 제목 */}
      <CourseTitleText fontWeight="bold" fontSize={20}>
        {courseTitleText}
      </CourseTitleText>

      <Spacing size={16} />

      {/* 가로 구분선 */}
      <HorizontalDivider />

      <Spacing size={20} />

      {/* 통계 섹션 */}
      <StatsContainer>
        {/* 왼쪽 열: 소요시간 */}
        <StatColumn>
          <StatLabel fontWeight="extrabold" fontSize={14}>
            소요시간
          </StatLabel>
          <Spacing size={8} />
          <StatValue fontWeight="semibold" fontSize={28}>
            {elapsedTimeText}
          </StatValue>
        </StatColumn>

        {/* 세로 구분선 */}
        <VerticalDivider />

        {/* 오른쪽 열: 이동거리 */}
        <StatColumn>
          <StatLabel fontWeight="extrabold" fontSize={14}>
            이동거리(km)
          </StatLabel>
          <Spacing size={8} />
          <StatValue fontWeight="semibold" fontSize={28}>
            {distanceText}
          </StatValue>
        </StatColumn>
      </StatsContainer>

      <Spacing size={23} />
    </Container>
  );
};

const Container = styled.View`
  background-color: ${COLORS.mainWhite};
  z-index: 50;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 24px;
  padding-right: 24px;
`;

const DateTimeText = styled(Text)`
  color: ${COLORS.gray900};
`;

const CourseTitleText = styled(Text)`
  color: ${COLORS.primary};
`;

const HorizontalDivider = styled.View`
  height: 1px;
  background-color: ${COLORS.gray600};
  width: 100%;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const StatColumn = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const VerticalDivider = styled.View`
  width: 1px;
  background-color: ${COLORS.gray600};
  height: 60px;
`;

const StatLabel = styled(Text)`
  color: ${COLORS.gray900};
  text-align: center;
`;

const StatValue = styled(Text)`
  color: ${COLORS.black};
  text-align: center;
`;

export default TravelWithoutCourseResultReviewSection;
