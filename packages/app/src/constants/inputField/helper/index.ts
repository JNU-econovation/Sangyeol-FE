const PROFILE_FORM = {
  NICKNAME: {
    SUCCESS: "사용 가능한 닉네임입니다.",
    DUPLICATED: "이미 사용 중인 닉네임입니다.",
    INVALID: "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능",
    REQUIRE: "필수 입력 항목입니다.",
    NEED_VERIFICATION: "닉네임 중복 확인 버튼을 눌러주세요.",
    NONE: " ",
    FIT: " ",
  },
  PHONE_NUMBER: {
    REQUIRE: "필수 입력 항목입니다.",
    NEED_VERIFICATION: "전화번호 인증이 필요합니다.",
    SUCCESS: " ",
    NONE: " ",
  },
  VERIFICATION: {
    REQUIRE: "필수 입력 항목입니다.",
    SUCCESS: "인증이 완료되었습니다.",
    ERROR: "인증번호가 올바르지 않습니다.",
    TIMEOUT: "입력 시간이 초과되었습니다. 재요청해주세요.",
    NONE: " ",
  },
  EMAIL: {
    REQUIRE: "필수 입력 항목입니다.",
    DUPLICATED: "이미 가입된 이메일입니다.",
    INVALID: "올바른 이메일 주소를 입력해 주세요.",
    NONE: " ",
    FIT: " ",
  },
} as const;

const HELPER = Object.freeze({ PROFILE_FORM });

export default HELPER;
