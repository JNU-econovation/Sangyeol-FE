# 산결 🏔️

**등산 코스 검색 및 안전 산행 지원 애플리케이션 웹뷰 웹**

앱 레포지토리 : [산결 앱 레포지토리](https://github.com/JNU-econovation/Soop-APP)

## 📋 프로젝트 개요

산악구조는 등산객들의 안전한 산행을 위한 웹 애플리케이션입니다. 산행 코스 검색, 실시간 위치 추적, 안전 매뉴얼 제공 등 다양한 기능을 통해 등산의 안전성을 높이고 비상 상황에 대비할 수 있도록 도와줍니다.

## ✨ 주요 기능

### 🏔️ 코스 검색 및 정보

- 산별 등산 코스 검색
- 코스 난이도, 소요시간, 거리 정보 제공
- 코스 북마크 기능
- 산 기지 및 시설 정보 제공

### 🗺️ 지도 및 내비게이션

- 네이버 지도 기반 실시간 위치 표시
- 등산 경로 표시 및 안내
- 현재 위치 확인 및 보고

### 🛡️ 안전 및 비상 대응

- 안전 매뉴얼 제공 (동상, 외상, 탈진 등)
- 비상 상황 대응 가이드
- 개인 비상 정보 관리

### 👤 사용자 관리

- 카카오 로그인 연동
- 개인정보 및 비상 연락처 관리
- 산행 기록 관리

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS 4.0
- **상태 관리**: TanStack Query (React Query)
- **HTTP Client**: Axios

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript 5.0
- **Build Tool**: Turbopack (Next.js)

### External Services

- **지도**: 네이버 지도 API
- **인증**: 카카오 로그인
- **폰트**: Pretendard

## 🏗️ 아키텍처 철학

### 도메인 분리를 통한 재사용성과 유지보수성 향상

프로젝트의 핵심 철학은 **도메인 분리**를 통해 컴포넌트와 훅의 재사용성을 극대화하고 수정에 용이하도록 설계하는 것입니다.

### 컴포넌트 추상화 레벨

컴포넌트를 3가지 핵심 요소로 구분하여 설계합니다:

1. **비즈니스 로직** - 도메인 특화 로직
2. **내부 로직** - 상태 관리 및 데이터 처리
3. **UI** - 순수한 프레젠테이션 레이어

이를 바탕으로 다음과 같은 추상화 레벨을 적용합니다:

- **Section 컴포넌트**: 독립적으로 사용 가능한 완전한 기능 단위
- **Widget 컴포넌트**: 재사용 가능한 중간 크기의 도메인 컴포넌트
- **UI 컴포넌트**: 순수한 UI 요소만을 담당

### 훅의 도메인 분리 전략

컴포넌트와 마찬가지로 훅 역시 도메인을 최대한 분리하여 설계합니다:

**도메인별 훅 분류:**

- **Feature 훅**: 특정 도메인에 종속된 비즈니스 로직 (예: `useBookmarkMutation`, `useCoursesOfMountainQuery`)
- **Common 훅**: 도메인에 무관한 순수 로직으로 최대한 재사용 가능 (예: `useSendToken`, `useGetCurrentPosition`)

**분리의 장점:**

- 도메인이 없는 로직은 여러 기능에서 재사용 가능
- 테스트 용이성 향상 및 의존성 최소화
- 새로운 기능 추가 시 기존 로직 활용도 극대화

## 📁 프로젝트 구조

```
src/
├── api/                    # API 레이어
│   ├── _instances/        # HTTP 클라이언트 인스턴스
│   └── v1/                # API 엔드포인트
├── app/                   # Next.js App Router 페이지
├── components/            # 계층화된 컴포넌트 구조
│   ├── features/         # 도메인 로직 컴포넌트
│   │   ├── pages/        # 페이지별 Section 컴포넌트
│   │   └── widgets/      # 재사용 가능한 Widget 컴포넌트
│   └── common/           # 공통 컴포넌트
│       ├── entities/     # 내부 로직이 있는 컴포넌트
│       └── shared/       # 순수 UI 컴포넌트
│           ├── layout/   # 레이아웃 컴포넌트
│           ├── ui/       # 기본 UI 컴포넌트
│           └── icons/    # 아이콘 컴포넌트
├── hooks/                 # 도메인별 커스텀 훅
│   ├── feature/          # 기능별 비즈니스 로직 훅
│   └── common/           # 공통 유틸리티 훅
├── service/              # 핵심 비즈니스 서비스
│   ├── bridge/           # 웹뷰 브릿지 통신
│   ├── modal/            # 모달 관리
│   └── StackLink/        # 네비게이션 관리
├── types/                # TypeScript 타입 정의
└── utils/                # 순수 유틸리티 함수
```

### 설계 원칙

**1. 단일 책임 원칙**

- 각 컴포넌트는 하나의 명확한 책임만을 가집니다
- UI 로직과 비즈니스 로직을 명확히 분리합니다

**2. 의존성 역전**

- 상위 레벨 컴포넌트가 하위 레벨에 의존하지 않도록 설계
- Props를 통한 의존성 주입으로 테스트 용이성 확보

**3. 재사용성 우선**

- 도메인 로직은 hooks로 분리하여 여러 컴포넌트에서 활용
- UI 컴포넌트는 도메인에 종속되지 않도록 설계

## 🚀 시작하기

### 요구사항

- Node.js 18.0 이상
- pnpm 8.15.1 이상

### 설치 및 실행

1. **의존성 설치**

```bash
pnpm install
```

2. **개발 서버 실행**

```bash
pnpm dev
```

3. **브라우저에서 확인**

```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# Lint 검사
pnpm lint
```

## 📱 페이지 구성

- **/** - 메인 페이지 (코스 검색, 산행 시작, 지도)
- **/mountain** - 산 및 코스 검색
- **/map** - 지도 및 위치 서비스
- **/travel** - 산행 시작 및 모니터링
- **/safe-manual** - 안전 매뉴얼
- **/my-page** - 사용자 정보 관리
- **/login** - 로그인 페이지

## 🔧 주요 서비스

### Bridge Service

웹뷰와 네이티브 앱 간의 양방향 통신을 담당합니다.

**핵심 기능:**

- TCP 프로토콜 기반의 메시지 ID 매칭 시스템
- 3-way handshake 방식의 연결 확인 로직
- 콜백 기반 비동기 요청-응답 처리
- 메시지 전달 성공 여부 확인 및 재전송 메커니즘

**해결한 문제:**

- 기존 단방향 이벤트 통신의 한계 극복
- 웹 미준비 상태에서의 메시지 손실 방지
- 신뢰성 있는 웹-앱 간 데이터 교환

### Modal Service

전역 모달 상태 관리 및 큐 시스템을 제공합니다.

**주요 특징:**

- 모달 우선순위 및 순차 표시 관리
- Portal 기반 렌더링으로 z-index 충돌 방지
- 타입 안전한 모달 컴포넌트 등록 시스템

### StackLink Service

앱처럼 부드러운 네비게이션 경험을 제공하는 핵심 서비스입니다.

**혁신적 특징:**

- 화면 밖에 페이지를 미리 렌더링하여 즉시 전환
- Next.js Prefetch와 연동한 성능 최적화
- 슬라이딩 애니메이션 기반 페이지 전환
- 웹의 캐싱 장점과 앱의 부드러운 UX 결합

**해결한 문제:**

- 웹의 '툭툭 끊기는' 네비게이션 개선
- TanStack Query 캐싱 최적화
- 로컬/세션 저장소 공유 문제 해결

## 🙏 기여자들

<div align="center">

|  <img src="https://img.shields.io/badge/Main_Developer-FF5733" />   | <img src="https://img.shields.io/badge/DevOps_Engineer-%2300264B" /> | <img src="https://img.shields.io/badge/Developer-%2310069F%20" /> |       <img src="https://img.shields.io/badge/Developer-blue" />        |
| :-----------------------------------------------------------------: | :------------------------------------------------------------------: | :---------------------------------------------------------------: | :--------------------------------------------------------------------: |
| <img src="https://github.com/geongyu09.png" width="120px;" alt=""/> |   <img src="https://github.com/heueum.png" width="120px;" alt=""/>   | <img src="https://github.com/smb0123.png" width="120px;" alt=""/> | <img src="https://github.com/seunghyeon77.png" width="120px;" alt=""/> |
|               [박건규](https://github.com/geongyu09)                |                 [정의찬](https://github.com/heueum)                  |               [심민보](https://github.com/smb0123)                |               [정승현](https://github.com/seunghyeon77)                |

</div>

프로젝트에 기여해주신 모든 분들께 감사드립니다! 🙇🏻‍♂️

<br>

---

**안전한 산행을 위한 디지털 파트너, 산악구조** 🏔️
