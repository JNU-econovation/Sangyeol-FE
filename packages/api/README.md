# api

프로젝트의 모든 API를 관리하는 워크스페이스입니다.

## 목차

- [프로젝트 구조](#프로젝트-구조)
- [API 문서 보기](#api-문서-보기)
- [API 문서 생성하기](#api-문서-생성하기)
- [새로운 API 추가하기](#새로운-api-추가하기)
- [JSDoc 작성 가이드](#jsdoc-작성-가이드)

## 프로젝트 구조

```
packages/api/
├── src/
│   ├── api/v1/           # API 엔드포인트 (경로 기반 구조)
│   │   ├── auth/         # 인증 관련 API
│   │   ├── oauth/        # 소셜 로그인 API
│   │   ├── bases/        # 베이스 관련 API
│   │   ├── bookmarks/    # 북마크 관련 API
│   │   ├── users/        # 사용자 관련 API
│   │   ├── mountains/    # 산/코스 관련 API
│   │   ├── travel/       # 산행 기록 관련 API
│   │   ├── facilities/   # 편의시설 관련 API
│   │   └── pathways/     # 등산로 경로 관련 API
│   ├── model/            # 공통 타입 정의
│   ├── utils/            # 유틸리티 함수
│   └── constants/        # 상수 정의
├── docs/references/      # 생성된 API 문서 (자동 생성됨)
├── docflow.config.js     # Docflow 설정 파일
└── package.json
```

## API 문서 보기

### 문서 생성

```bash
cd packages/api
yarn build:docs
```

생성된 문서는 `docs/references/` 디렉토리에 마크다운 형식으로 저장됩니다.

### 문서 확인

```bash
# 문서 검증 (누락된 주석 확인)
yarn check:docs
```

## API 문서 생성하기

이 프로젝트는 [docflow](https://docflow.slash.page)를 사용하여 JSDoc 주석으로부터 자동으로 문서를 생성합니다.

### 설정 파일

`docflow.config.js`에서 문서 생성 설정을 관리합니다:

```javascript
export default {
  project: {
    root: process.cwd(),
    packageManager: "yarn",
  },
  commands: {
    build: {
      outputDir: "docs/references",  // 문서 출력 경로
      manifest: {
        enabled: true,
        prefix: "/api",
      },
      generator: {
        name: "vitepress",              // VitePress 포맷
        signatureLanguage: "typescript", // TypeScript 시그니처
      },
    },
    check: {
      entryPoints: ["src/**/*.ts"],    // 검증할 파일
    },
  },
};
```

## 새로운 API 추가하기

### 1. 파일 생성

API 경로와 일치하는 디렉토리 구조로 파일을 생성합니다:

```
실제 API: /api/v1/mountains/search
파일 위치: src/api/v1/mountains/search/index.ts
```

### 2. API 코드 작성

다음 템플릿을 따라 작성합니다:

```typescript
import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description API 경로 설명
 */
export const API_PATH = "/api/v1/your/path";

/**
 * @public
 * @category Types
 * @interface YourResponse
 * @description 응답 타입 설명
 * @property {string} field - 필드 설명
 */
export interface YourResponse {
  field: string;
}

/**
 * @public
 * @category YourCategory
 * @description API 함수의 기능 설명
 * @param instance - Axios 인스턴스
 * @param param - 파라미터 설명
 * @returns 반환값 설명
 * @throws {Error} 에러 조건 설명
 * @example
 * const result = await yourApiFunction(axiosInstance, "param");
 * console.log(result.field);
 */
export const yourApiFunction = async (
  instance: AxiosInstance,
  param: string,
) => {
  const response = await instance<YourResponse>({
    method: "get",
    url: API_PATH,
  });
  return response.data;
};
```

### 3. Export 추가

`src/index.ts`에 새로운 API를 export 합니다:

```typescript
export * from "./api/v1/your/path";
```

### 4. 문서 생성 및 확인

```bash
# 문서 생성
yarn build:docs

# 문서 누락 확인
yarn check:docs
```

## JSDoc 작성 가이드

### 필수 태그

모든 export된 항목에는 다음 태그가 필요합니다:

#### 1. 함수

```typescript
/**
 * @public                              - 공개 API 표시 (필수)
 * @category CategoryName                - 카테고리 (필수)
 * @description 함수 설명                - 기능 설명 (필수)
 * @param {Type} paramName - 파라미터 설명  - 각 파라미터 설명
 * @returns {Type} 반환값 설명            - 반환값 설명
 * @throws {Error} 에러 조건              - 에러 처리 (선택)
 * @example                              - 사용 예시 (권장)
 * const result = await func();
 */
```

#### 2. 인터페이스/타입

```typescript
/**
 * @public
 * @category Types
 * @interface InterfaceName
 * @description 인터페이스 설명
 * @property {Type} field - 필드 설명    - 각 프로퍼티 설명
 */
```

#### 3. 상수

```typescript
/**
 * @public
 * @category Constants
 * @description 상수 설명
 */
```

### 카테고리 분류

다음 카테고리를 사용합니다:

- **Constants** - API 경로, 상수
- **Types** - 인터페이스, 타입 정의
- **Auth** - 인증 관련 API
- **OAuth** - 소셜 로그인 API
- **Bases** - 베이스 관련 API
- **Bookmarks** - 북마크 관련 API
- **Users** - 사용자 관련 API
- **Mountains** - 산/코스 관련 API
- **Travel** - 산행 기록 관련 API
- **Facilities** - 편의시설 관련 API
- **Pathways** - 등산로 경로 관련 API

### 실제 예시

#### GET API

```typescript
/**
 * @public
 * @category Constants
 * @description 카카오 로그인 API 경로
 */
export const KAKAO_LOGIN_URI = `/api/v1/oauth/kakao/login`;

/**
 * @public
 * @category Types
 * @interface KakaoLoginResponse
 * @description 카카오 로그인 응답 타입
 * @property {string} uri - 카카오 OAuth 인증 URI
 */
export interface KakaoLoginResponse {
  uri: string;
}

/**
 * @public
 * @category OAuth
 * @description 카카오 로그인 URI를 가져옵니다
 * @param instance - Axios 인스턴스
 * @returns 카카오 OAuth 인증 URI가 포함된 응답
 * @example
 * const result = await getKakaoLoginApi(axiosInstance);
 * window.location.href = result.uri;
 */
export const getKakaoLoginApi = async (instance: AxiosInstance) => {
  const response = await instance<KakaoLoginResponse>({
    method: "get",
    url: KAKAO_LOGIN_URI,
  });
  return response.data;
};
```

#### POST API

```typescript
/**
 * @public
 * @category Auth
 * @description 휴대폰 번호로 SMS 인증 코드를 요청합니다
 * @param instance - Axios 인스턴스
 * @param phoneNumber - 인증받을 휴대폰 번호
 * @returns 인증 요청 결과
 * @throws {Error} 올바르지 않은 휴대폰 번호 형식인 경우
 * @example
 * const result = await postSMSForVerification(axiosInstance, "01012345678");
 * console.log(result.phoneNumber);
 */
export const postSMSForVerification = async (
  instance: AxiosInstance,
  phoneNumber: string,
) => {
  if (!isValidPhoneNumber(phoneNumber))
    throw new Error("올바른 휴대폰 번호가 아닙니다.");
  // ...
};
```

## 참고 자료

- [Docflow 공식 문서](https://docflow.slash.page)
- [JSDoc 태그 레퍼런스](https://jsdoc.app/)
- 프로젝트 내 기존 API 파일들을 참고하세요

## 명령어 요약

```bash
# 문서 생성
yarn build:docs

# 문서 검증
yarn check:docs

# 개발 모드 (변경 감지)
yarn dev
```
