const ERROR_CODES = {
  // common errors
  COMMON400_001: {
    status: 400,
    errorCode: "COMMON400_001",
    message: "RequestDTO 유효성 검사 미통과",
  },
  COMMON400_002: {
    status: 400,
    errorCode: "COMMON400_002",
    message: "Illegal argument exception 발생",
  },
  COMMON400_003: {
    status: 400,
    errorCode: "COMMON400_003",
    message: "경로 변수(PathVariable)가 누락됐습니다.",
  },
  COMMON400_004: {
    status: 400,
    errorCode: "COMMON400_004",
    message: "쿼리 스트링이 누락됐습니다.",
  },
  COMMON500_001: {
    status: 500,
    errorCode: "COMMON500_001",
    message: "예기치 못한 에러가 발생했습니다.",
  },

  // auth errors
  AUTH400_001: {
    status: 400,
    errorCode: "AUTH400_001",
    message: "로그인 과정 중 에러가 발생했습니다.",
  },
  AUTH400_002: {
    status: 400,
    errorCode: "AUTH400_002",
    message: "토큰이 필요한 요청입니다.",
  },
  AUTH400_003: {
    status: 400,
    errorCode: "AUTH400_003",
    message: "이미 로그아웃된 상태입니다.",
  },
  AUTH401_001: {
    status: 401,
    errorCode: "AUTH401_001",
    message: "유효하지 않은 서명입니다.",
  },
  AUTH401_002: {
    status: 401,
    errorCode: "AUTH401_002",
    message: "만료된 토큰입니다.",
  },
  AUTH401_003: {
    status: 401,
    errorCode: "AUTH401_003",
    message: "유효하지 않은 리프레시 토큰입니다.",
  },
  AUTH401_004: {
    status: 401,
    errorCode: "AUTH401_004",
    message: "토큰의 헤더가 유효하지 않습니다.",
  },
  AUTH500_001: {
    status: 500,
    errorCode: "AUTH500_001",
    message: "애플 identityToken헤더 파싱 중 에러가 발생했습니다.",
  },
  AUTH500_002: {
    status: 500,
    errorCode: "AUTH500_002",
    message:
      "애플 identityToken의 서명(signature) 검증 중 매칭되는 공개키를 찾을 수 없습니다.",
  },
  AUTH500_003: {
    status: 500,
    errorCode: "AUTH500_003",
    message:
      "애플 identityToken의 서명(signature) 검증에서 사용되는 공개키 생성 중 에러가 발생했습니다.",
  },
  AUTH500_004: {
    status: 500,
    errorCode: "AUTH500_004",
    message: "애플 identityToken 검증 중 issuer가 애플이 아닙니다.",
  },
  AUTH500_005: {
    status: 500,
    errorCode: "AUTH500_005",
    message: "애플 identityToken 검증 중 audience가 client_id가 아닙니다.",
  },
  AUTH500_006: {
    status: 500,
    errorCode: "AUTH500_006",
    message: "SMS 발송에 실패했습니다.",
  },

  // user errors
  USER400_001: {
    status: 400,
    errorCode: "USER400_001",
    message: "회원을 찾을 수 없습니다.",
  },
  USER400_002: {
    status: 400,
    errorCode: "USER400_002",
    message: "이미 존재하는 전화번호입니다.",
  },

  // Base
  BASE400_001: {
    status: 400,
    errorCode: "BASE400_001",
    message: "거점을 찾을 수 없습니다.",
  },

  // Mountain
  MOUNTAIN400_001: {
    status: 400,
    errorCode: "MOUNTAIN400_001",
    message: "산을 찾을 수 없습니다.",
  },

  // Facility
  FACILITY400_001: {
    status: 400,
    errorCode: "FACILITY404_001",
    message: "시설을 찾을 수 없습니다.",
  },

  // Course & Bookmark
  COURSE400_001: {
    status: 404,
    errorCode: "COURSE400_001",
    message: "코스를 찾을 수 없습니다",
  },
  BOOKMARK400_001: {
    status: 404,
    errorCode: "BOOKMARK400_001",
    message: "코스 북마크를 찾을 수 없습니다",
  },

  // Pathway
  PATHWAY500_001: {
    status: 500,
    errorCode: "PATHWAY500_001",
    message: "(코스)경로의 위경도를 변환 중 에러가 발생하였습니다",
  },
};

export default ERROR_CODES;
