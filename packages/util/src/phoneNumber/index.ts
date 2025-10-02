/**
 * 숫자형 번호를 핸드폰 포맷 형태의 문자열로 변환
 * @param phoneNumber - 숫자형 핸드폰 번호 (예: 1012345678, 01012345678)
 * @returns 포맷된 핸드폰 번호 문자열 (예: "010-1234-5678")
 */
export const formatPhoneNumber = (phoneNumber: number | string): string => {
  // 숫자를 문자열로 변환하고 공백 제거
  const numStr = phoneNumber.toString().replace(/\s/g, "");

  // 숫자만 추출 (하이픈이나 다른 문자 제거)
  const digits = numStr.replace(/\D/g, "");

  // 길이에 따른 포맷팅
  if (digits.length === 10) {
    // 10자리인 경우 (앞에 0 추가해서 11자리로 만듦)
    // 예: 1012345678 → 010-1234-5678
    return `0${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11) {
    // 11자리인 경우
    // 010, 011, 016, 017, 018, 019로 시작하는 경우
    if (
      digits.startsWith("010") ||
      digits.startsWith("011") ||
      digits.startsWith("016") ||
      digits.startsWith("017") ||
      digits.startsWith("018") ||
      digits.startsWith("019")
    ) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    // 기타 11자리 (예외적인 경우)
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 8) {
    // 8자리인 경우 (서울 지역번호 02 + 8자리)
    // 예: 12345678 → 02-1234-5678
    return `02-${digits.slice(0, 4)}-${digits.slice(4)}`;
  } else if (digits.length === 9) {
    // 9자리인 경우 (지역번호 3자리 + 7자리 또는 031, 032 등)
    return `0${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }

  // 유효하지 않은 길이인 경우 원본 반환
  return digits;
};

/**
 * 실시간 입력을 위한 핸드폰 번호 포맷터 (부분 입력도 포맷팅)
 * @param phoneNumber - 입력 중인 핸드폰 번호
 * @returns 포맷된 핸드폰 번호 문자열
 */
export const formatPhoneNumberLive = (phoneNumber: number | string): string => {
  const numStr = phoneNumber.toString().replace(/\D/g, "");

  if (numStr.length <= 3) {
    return numStr;
  } else if (numStr.length <= 7) {
    return `${numStr.slice(0, 3)}-${numStr.slice(3)}`;
  } else if (numStr.length <= 11) {
    return `${numStr.slice(0, 3)}-${numStr.slice(3, 7)}-${numStr.slice(7)}`;
  }

  // 11자리 초과시 자르기
  return `${numStr.slice(0, 3)}-${numStr.slice(3, 7)}-${numStr.slice(7, 11)}`;
};

/**
 * 포맷된 핸드폰 번호에서 숫자만 추출
 * @param formattedPhone - 포맷된 핸드폰 번호 (예: "010-1234-5678")
 * @returns 숫자만 있는 문자열 (예: "01012345678")
 */
export const extractPhoneDigits = (formattedPhone: string): string => {
  return formattedPhone.replace(/\D/g, "");
};

/**
 * 핸드폰 번호 유효성 검사
 * @param phoneNumber - 검사할 핸드폰 번호
 * @returns 유효한 핸드폰 번호인지 여부
 */
export const isValidPhoneNumber = (phoneNumber: number | string): boolean => {
  const digits = phoneNumber.toString().replace(/\D/g, "");

  // 한국 휴대폰 번호 패턴 (010, 011, 016, 017, 018, 019로 시작하는 11자리)
  const mobilePattern = /^01[0-9]\d{8}$/;

  return mobilePattern.test(digits);
};

/**
 * 맨 앞 3자리를 제외한 숫자만으로 번호 확인 및 포맷팅
 * @param phoneNumber - 핸드폰 번호 (앞 3자리 제외)
 * @returns 포맷된 핸드폰 번호 문자열 (예: "1234-5678")
 */
export const validateAndFormatPhoneWithoutPrefix = (phoneNumber: number | string): string => {
  const numStr = phoneNumber.toString().replace(/\D/g, "");
  
  // 길이별 포맷팅
  if (numStr.length === 7) {
    // 7자리인 경우 3-4 포맷 (예: "123-4567")
    return `${numStr.slice(0, 3)}-${numStr.slice(3)}`;
  } else if (numStr.length === 8) {
    // 8자리인 경우 4-4 포맷 (예: "1234-5678")
    return `${numStr.slice(0, 4)}-${numStr.slice(4)}`;
  }
  
  // 7자리나 8자리가 아닌 경우 원본 반환
  return numStr;
};

/**
 * 맨 앞 3자리를 제외한 번호의 유효성만 검사
 * @param phoneNumber - 핸드폰 번호 (앞 3자리 제외)
 * @returns 유효한 번호인지 여부
 */
export const isValidPhoneWithoutPrefix = (phoneNumber: number | string): boolean => {
  const numStr = phoneNumber.toString().replace(/\D/g, "");
  
  // 8자리 숫자인지 확인
  return /^\d{8}$/.test(numStr);
};

// 사용 예시
// console.log(formatPhoneNumber(1012345678));     // "010-1234-5678"
// console.log(formatPhoneNumber(01012345678));    // "010-1234-5678"
// console.log(formatPhoneNumber("1012345678"));   // "010-1234-5678"
// console.log(formatPhoneNumber("010-1234-5678")); // "010-1234-5678"

// console.log(formatPhoneNumberLive(1012));       // "101"
// console.log(formatPhoneNumberLive(10123));      // "101-23"
// console.log(formatPhoneNumberLive(1012345));    // "101-2345"
// console.log(formatPhoneNumberLive(10123456));   // "101-2345-6"

// console.log(isValidPhoneNumber(1012345678));    // true
// console.log(isValidPhoneNumber(1212345678));    // false (121로 시작)
