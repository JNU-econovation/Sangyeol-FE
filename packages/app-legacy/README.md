# 산결 🏔️

**등산 코스 검색 및 안전 산행 지원 모바일 애플리케이션**

웹 레포지토리 : [산결 웹 레포지토리](https://github.com/JNU-econovation/Soop-WEB)

## 📋 프로젝트 개요

산결은 등산객들의 안전한 산행을 위한 모바일 애플리케이션입니다. 산행 코스 검색, 실시간 위치 추적, 안전 매뉴얼 제공, 응급상황 신고 등 다양한 기능을 통해 등산의 안전성을 높이고 비상 상황에 대비할 수 있도록 도와줍니다.

## ✨ 주요 기능

### 🏔️ 코스 검색 및 정보

- 산별 등산 코스 검색 및 상세 정보
- 코스 난이도, 소요시간, 거리 정보 제공
- 코스 북마크 및 관리 기능
- 산 기지 및 시설 정보 제공

### 🗺️ 지도 및 내비게이션

- 실시간 위치 표시 및 추적
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

- Apple Sign-In 및 카카오 로그인 연동
- 개인정보 및 비상 연락처 관리
- 산행 기록 및 여행 로그 관리
- 북마크한 코스 관리
- 알림 설정 및 고객센터

## 🛠️ 기술 스택

### Mobile Framework

- **Framework**: React Native 0.79.2, Expo SDK 53
- **Navigation**: Expo Router, React Navigation
- **Language**: TypeScript
- **State Management**: Zustand, TanStack Query (React Query)
- **Styling**: Emotion Native
- **폰트**: Pretendard

### Authentication & External Services

- **인증**: Apple Sign-In, 카카오 로그인
- **위치 서비스**: Expo Location
- **보안 저장소**: Expo Secure Store
- **네트워크**: Axios
- **웹뷰**: React Native WebView

### Development Tools

- **Package Manager**: Yarn
- **Testing**: Jest
- **Linting**: ESLint, Prettier
- **Type Checking**: TypeScript 5.0

## 🏗️ 아키텍처 철학

### 도메인 분리를 통한 재사용성과 유지보수성 향상

프로젝트의 핵심 철학은 **도메인 분리**를 통해 컴포넌트와 훅의 재사용성을 극대화하고 수정에 용이하도록 설계하는 것입니다.

### 컴포넌트 추상화 레벨

컴포넌트를 3가지 핵심 요소로 구분하여 설계합니다:

1. **비즈니스 로직** - 도메인 특화 로직
2. **내부 로직** - 상태 관리 및 데이터 처리
3. **UI** - 순수한 프레젠테이션 레이어

이를 바탕으로 다음과 같은 추상화 레벨을 적용합니다:

- **Screen 컴포넌트**: 화면별 특화된 독립적 기능 단위
- **Widget 컴포넌트**: 재사용 가능한 중간 크기의 도메인 컴포넌트
- **Entity 컴포넌트**: 내부 로직이 포함된 공통 컴포넌트
- **Shared 컴포넌트**: 순수한 UI 요소만을 담당

### 훅의 도메인 분리 전략

컴포넌트와 마찬가지로 훅 역시 도메인을 최대한 분리하여 설계합니다:

**도메인별 훅 분류:**

- **Feature 훅**: 특정 도메인에 종속된 비즈니스 로직 (예: `useAppleLoginMutate`, `useDetailReportForm`)
- **Common 훅**: 도메인에 무관한 순수 로직으로 최대한 재사용 가능 (예: `useImagePicker`, `useGetCurrentPosition`)

**분리의 장점:**

- 도메인이 없는 로직은 여러 기능에서 재사용 가능
- 테스트 용이성 향상 및 의존성 최소화
- 새로운 기능 추가 시 기존 로직 활용도 극대화

## 📁 프로젝트 구조

```
src/
├── app/                    # 앱 라우팅 (Expo Router)
├── components/            # 계층화된 컴포넌트 구조
│   ├── feature/          # 도메인 로직 컴포넌트
│   │   ├── screens/      # 화면별 특화 컴포넌트
│   │   ├── widget/       # 재사용 가능한 Widget 컴포넌트
│   │   └── process/      # 비즈니스 프로세스 컴포넌트
│   └── common/           # 공통 컴포넌트
│       ├── entities/     # 내부 로직이 있는 컴포넌트
│       └── shared/       # 순수 UI 컴포넌트
│           ├── layout/   # 레이아웃 컴포넌트
│           └── ui/       # 기본 UI 컴포넌트
├── hooks/                 # 도메인별 커스텀 훅
│   ├── feature/          # 기능별 비즈니스 로직 훅
│   └── common/           # 공통 유틸리티 훅
├── service/              # 핵심 비즈니스 서비스
│   ├── bridge/           # 웹뷰 브릿지 통신
│   ├── modal/            # 모달 관리
│   ├── query/            # React Query 설정
│   └── form/             # 폼 관리
├── store/                # 상태 관리 (Zustand)
├── api/                  # API 레이어
│   ├── _instance/        # HTTP 클라이언트 인스턴스
│   └── v1/               # API 엔드포인트
├── utils/                # 순수 유틸리티 함수
├── constants/            # 상수 정의
└── styles/               # 스타일 관련
```

## 🚀 시작하기

### 요구사항

- Node.js 18.0 이상
- Yarn 1.22 이상
- Expo CLI

### 설치 및 실행

1. **의존성 설치**

```bash
yarn install
```

2. **개발 서버 실행**

```bash
yarn start
```

3. **플랫폼별 실행**

```bash
# iOS
yarn ios

# Android
yarn android

# 웹
yarn web
```

### 특정 iOS 디바이스에서 실행

```bash
# iPhone SE (3rd generation)
yarn ios-se

# iPhone 14 Pro
yarn ios-pro

# 사용 가능한 iOS 디바이스 목록
yarn ios-list
```

### 빌드 및 배포

```bash
# 테스트 실행
yarn test

# Lint 검사
yarn lint
```

## 📱 화면 구성

- **홈** - 메인 화면 (코스 추천, 안전 매뉴얼 접근, 주요 기능 네비게이션)
- **산결** - 산별 코스 검색 및 상세 정보
- **지도** - 실시간 위치 추적 및 등산로 안내
- **스토어** - 등산 용품 및 정보 (예정)
- **마이** - 사용자 정보 관리 및 설정
- **신고** - 응급상황 신고 시스템
- **여행** - 산행 기록 및 관리

## 🔧 주요 서비스

### Bridge Service

웹뷰와 네이티브 앱 간의 양방향 통신을 담당하는 핵심 서비스입니다.

**핵심 기능:**

- 메시지 기반 웹-앱 간 양방향 통신
- 콜백 기반 비동기 요청-응답 처리
- 타입 안전한 메시지 전달 시스템
- 응답 누락 처리 및 에러 핸들링

**해결한 문제:**

- 기존 단방향 이벤트 통신의 한계 극복
- 웹뷰 로딩 전 메시지 손실 방지
- 신뢰성 있는 웹-앱 간 데이터 교환

---

**안전한 산행을 위한 디지털 파트너, 산결** 🏔️
