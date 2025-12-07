# 산결 (Sangyeol)

> 등산객들의 안전한 산행을 위한 크로스 플랫폼 애플리케이션

산결은 등산 코스 검색, 실시간 위치 추적, 긴급 신고 시스템을 제공하는 등산 안전 플랫폼입니다. React Native 모바일 앱과 Next.js 웹 앱으로 구성되어 있습니다.

- 마이그래이션 전 레포: [app](https://github.com/JNU-econovation/Soop-APP) | [web](https://github.com/JNU-econovation/Soop-WEB)

## ✨ 주요 기능

### 🏔️ 코스 검색 및 정보

- 산별 등산 코스 검색 및 상세 정보
- 코스 난이도, 소요시간, 거리 정보 제공
- 코스 북마크 및 관리 기능
- 산 기지 및 시설 정보 제공

### 🗺️ 지도 및 내비게이션

- 실시간 위치 표시 및 추적 (네이버 지도 연동)
- 등산 경로 표시 및 안내
- 현재 위치 기반 서비스
- 지도 상 코스 상세 정보

### 🛡️ 안전 및 비상 대응

- 종합 안전 매뉴얼 제공 (동상, 외상, 탈진 등)
- 위치 기반 응급상황 신고 시스템
- SMS 자동 발송 기능
- 즉시 신고 및 상세 신고 기능
- 개인 비상 정보 관리

### 👤 사용자 관리

- Apple 및 카카오 로그인 연동
- 개인정보 및 비상 연락처 관리
- 산행 기록 및 여행 로그 관리
- 북마크한 코스 관리

## 🏗️ 모노레포 구조

이 프로젝트는 Yarn Workspaces 기반의 모노레포로 구성되어 있습니다:

```
sangyeol/
├── packages/
│   ├── app/              # React Native 모바일 애플리케이션
│   ├── web/              # Next.js 웹 애플리케이션
│   ├── api/              # API 클라이언트 라이브러리
│   ├── bridge/           # 웹뷰-네이티브 브릿지 라이브러리
│   ├── stack-link/       # Next.js 네비게이션 최적화 라이브러리
│   └── util/             # 공통 유틸리티 라이브러리
└── mock/                 # Mock 데이터
```

### 패키지 설명

| 패키지         | 설명                       | 기술 스택                               |
| -------------- | -------------------------- | --------------------------------------- |
| **app**        | React Native 모바일 앱     | Expo 54, React Native 0.81, Emotion     |
| **web**        | Next.js 웹 앱              | Next.js 15, Tailwind CSS 4.0, Turbopack |
| **api**        | 타입 안전한 API 클라이언트 | Axios, TanStack Query, Docflow          |
| **bridge**     | 웹뷰-네이티브 양방향 통신  | TCP 3-way Handshake 프로토콜            |
| **stack-link** | 앱 같은 웹 네비게이션      | Iframe 프리렌더링, CSS Transform        |
| **util**       | 공통 유틸리티 함수         | TypeScript                              |

## 라이브러리 소개

### Bridge : 양방향 웹뷰 통신

기존 웹뷰의 단방향 이벤트 통신을 넘어, **요청-응답 패턴**의 안정적인 양방향 통신을 구현했습니다.

**핵심 특징:**

- TCP 3-way Handshake 프로토콜 구현 (SYN → SYN-ACK → ACK)
- 웹뷰 미준비 상태 메시지 손실 방지 (메시지 큐잉)
- 타입 안전한 메시지 전달 (TypeScript 제네릭)
- 콜백 기반 비동기 응답 처리

📖 [Bridge 상세 문서](./packages/bridge/README.md)

### Stack-Link : 네이티브 앱 같은 웹 네비게이션

Next.js 웹에서 **앱과 같은 부드러운 페이지 전환**을 제공합니다.

**핵심 특징:**

- 화면 밖에서 페이지를 미리 렌더링 (Iframe 기반)
- 즉시 화면 전환 (슬라이딩/페이드 애니메이션, 60fps)
- Next.js Prefetch와 연동한 데이터 미리 로딩
- 왼쪽 엣지 스와이프 기반 뒤로가기

📖 [Stack-Link 상세 문서](./packages/stack-link/README.md)

## 🛠️ 기술 스택

### 공통

- **언어**: TypeScript 5.x
- **패키지 관리**: Yarn 4.9.3 (Yarn Berry)
- **모노레포**: Yarn Workspaces
- **상태 관리**: TanStack Query v5, Zustand v5
- **코드 품질**: ESLint 9, Prettier 3

### 모바일 앱

- **프레임워크**: React Native 0.81.4, Expo SDK 54
- **라우팅**: Expo Router 6.0 (파일 기반 라우팅)
- **스타일링**: Emotion Native (CSS-in-JS)
- **지도**: Naver Map SDK for React Native
- **폼**: React Hook Form 7.62, TanStack React Form 1.12
- **인증**: Apple Sign-In, Kakao Login
- **로컬 DB**: Expo SQLite, Drizzle ORM

### 웹

- **프레임워크**: Next.js 15.3.5 (App Router)
- **빌드 도구**: Turbopack
- **스타일링**: Tailwind CSS 4.0
- **지도**: Naver Maps API
- **폼**: React Hook Form 7.63

## 🚦 시작하기

### 필수 요구사항

- **Node.js**: 18.0 이상
- **Yarn**: 4.9.3 (Yarn Berry)
- **iOS 개발** (선택): Xcode 15.0 이상, CocoaPods
- **Android 개발** (선택): Android Studio, JDK 17, Android SDK (API 33+)

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone <repository-url>
   cd sangyeol
   ```

2. **의존성 설치**

   ```bash
   yarn install
   ```

3. **환경 변수 설정**

   ```bash
   # 모바일 앱 환경 변수
   cp packages/app/.env.example packages/app/.env

   # 웹 환경 변수
   cp packages/web/.env.example packages/web/.env.local
   ```

4. **개발 서버 실행**

   ```bash
   # 모바일 앱
   yarn dev:app

   # 웹
   yarn dev:web
   ```

### 플랫폼별 실행

```bash
# iOS
yarn workspace app ios

# Android
yarn workspace app android

# 웹
yarn workspace web dev
```

## 📦 주요 명령어

### 개발

```bash
yarn dev:app              # 앱 개발 서버
yarn dev:web              # 웹 개발 서버
```

### 빌드

```bash
yarn build:web            # 웹 프로덕션 빌드
yarn build:app-ios        # iOS 빌드
yarn build:app-android    # Android 빌드
yarn build:app            # iOS + Android 빌드
```

### 코드 품질

```bash
yarn lint                 # ESLint 검사
yarn lint:fix             # ESLint 자동 수정
yarn format               # Prettier 포맷팅
yarn format:check         # Prettier 검사
yarn type-check           # TypeScript 타입 체크
```

### 라이브러리 빌드

```bash
yarn build:api            # API 클라이언트 빌드
yarn build:bridge         # Bridge 라이브러리 빌드
yarn build:stack-link     # Stack-Link 라이브러리 빌드
yarn build:utils          # 유틸리티 라이브러리 빌드
```

## 📖 아키텍처 철학

### 도메인 분리를 통한 재사용성 극대화

프로젝트의 핵심 철학은 **도메인 분리**를 통해 컴포넌트와 훅의 재사용성을 극대화하는 것입니다.

```
Screen/Section 컴포넌트 (화면별 특화)
    ↓
Widget + Feature 훅 (도메인 종속, 재사용 가능)
    ↓
Entity + Common 훅 (도메인 무관, 범용)
    ↓
Shared 컴포넌트 (순수 UI만)
```

**컴포넌트 추상화 3가지 핵심 요소:**

1. **비즈니스 로직** - 도메인 특화 로직
2. **내부 로직** - 상태 관리 및 데이터 처리
3. **UI** - 순수한 프레젠테이션 레이어

📖 [상세 개발 가이드](https://github.com/JNU-econovation/Soop-WEB/wiki)

## 📚 문서

- [프로젝트 전체 가이드](./.claude/CLAUDE.md) - 아키텍처, 개발 워크플로우, 상세 가이드
- [Bridge 라이브러리](./packages/bridge/README.md) - 웹뷰-네이티브 통신
- [Stack-Link 라이브러리](./packages/stack-link/README.md) - Next.js 네비게이션 최적화
- [API 클라이언트 문서](./packages/api/README.md) - API 사용 가이드
- [컴포넌트 추상화 레벨 및 components 디렉터리 구조](https://github.com/JNU-econovation/New-Project-FE/wiki/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%B6%94%EC%83%81%ED%99%94-%EB%A0%88%EB%B2%A8-%EB%B0%8F-components-%EB%94%94%EB%A0%89%ED%84%B0%EB%A6%AC-%EA%B5%AC%EC%A1%B0)
- [브랜치 전략](https://github.com/JNU-econovation/New-Project-FE/wiki/%EA%B9%83-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5)
- [커밋 전략](https://github.com/JNU-econovation/New-Project-FE/wiki/%EC%BB%A4%EB%B0%8B-%EC%A0%84%EB%9E%B5)
- [API-query 컨밴션](https://github.com/JNU-econovation/Soop-WEB/wiki/API%E2%80%90qeury-%EC%BB%A8%EB%B0%B4%EC%85%98)
- [blog post : 웹뷰 브리지 라이브러리 개발 기록](https://geongyu09.github.io/post/webviewThreeWayHandshake/)
- [blog post : 웹을 앱처럼 만들어 보자!](https://geongyu09.github.io/post/appLikeWeb/)

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE) 하에 배포됩니다.

---

**안전한 산행을 위한 디지털 파트너, 산결** 🏔️
