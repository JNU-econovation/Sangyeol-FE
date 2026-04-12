# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 패키지 개요

`packages/api`는 산결 프로젝트의 모든 API 호출 함수와 타입을 정의하는 라이브러리 패키지입니다. `packages/app`(React Native)과 `packages/web`(Next.js) 모두에서 사용합니다.

## 주요 명령어

```bash
yarn dev          # 변경 감지 빌드 (개발 중 사용)
yarn build        # 프로덕션 빌드 (dist/ 생성)
yarn build:docs   # JSDoc → VitePress 문서 생성
yarn check:docs   # JSDoc 누락 여부 검증
yarn docs:dev     # 문서 개발 서버 (http://localhost:5173)
```

## 파일 구조 규칙

**실제 API 경로와 파일 경로가 1:1로 대응해야 합니다.**

```
API: /api/v1/mountains/{mountainId}/courses
파일: src/api/v1/mountains/[mountainId]/courses/index.ts
```

동적 경로 세그먼트는 `[paramName]` 폴더명을 사용합니다.

## 새 API 파일 작성 패턴

모든 API 파일은 다음 세 가지를 export합니다:

1. **경로 상수** (`*_API_PATH` 또는 `*_URI`)
2. **응답 인터페이스**
3. **API 함수** — 항상 `(instance: AxiosInstance, ...params)` 형태

```typescript
import { AxiosInstance } from "axios";

export const YOUR_API_PATH = "/api/v1/your/path";

export interface YourResponse {
  field: string;
}

export const yourApiFunction = async (
  instance: AxiosInstance,
  param: string,
): Promise<YourResponse> => {
  const response = await instance<YourResponse>({
    method: "get",
    url: YOUR_API_PATH,
  });
  return response.data;
};
```

새 파일을 추가하면 반드시 `src/index.ts`에 `export * from "./api/v1/..."` 추가해야 합니다.

## JSDoc 필수 태그

모든 export된 항목에 JSDoc이 필요합니다. `yarn check:docs`로 누락 여부를 검증합니다.

**함수:**
```typescript
/**
 * @public
 * @category CategoryName   // Auth | OAuth | Users | Mountains | Travel | Bookmarks | Bases | Facilities | Pathways
 * @description 기능 설명
 * @param instance - Axios 인스턴스
 * @returns 반환값 설명
 * @example
 * const result = await yourApiFunction(axiosInstance, "param");
 */
```

**인터페이스/상수:**
```typescript
/**
 * @public
 * @category Types          // 인터페이스는 Types, 상수는 Constants
 * @interface InterfaceName
 * @description 설명
 * @property {Type} field - 필드 설명
 */
```

## 에러 코드

`src/constants/ERROR/index.ts`에 서버 에러 코드가 정의되어 있습니다. `ERROR` 상수는 `{ status, message }` 형태이며, `src/index.ts`에서 named export됩니다.

## 빌드 결과물

tsup으로 빌드하며 `dist/index.mjs`(ESM)와 `dist/index.cjs`(CJS) 두 포맷으로 출력됩니다. `axios`와 `@tanstack/react-query`는 external로 처리됩니다(peer dependency).
