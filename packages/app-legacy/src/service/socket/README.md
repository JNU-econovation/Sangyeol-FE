# Socket Service Documentation

React Native WebSocket 서비스의 아키텍처, 동작 원리 및 사용법에 대한 문서입니다.

## 📋 목차

- [개요](#개요)
- [아키텍처](#아키텍처)
- [핵심 컴포넌트](#핵심-컴포넌트)
- [동작 원리](#동작-원리)
- [사용법](#사용법)
- [이벤트 시스템](#이벤트-시스템)
- [모범 사례](#모범-사례)
- [문제 해결](#문제-해결)

## 개요

이 소켓 서비스는 WebSocket 연결을 효율적으로 관리하고, React Native 환경에서 실시간 통신을 제공합니다. 싱글톤 패턴과 전역 이벤트 시스템을 활용하여 다음 문제들을 해결합니다:

- 🔄 페이지 이동 시 소켓 연결 유지
- 🎯 React Hook의 클로저 문제
- 🚀 다중 컴포넌트에서 동일한 소켓 연결 재사용
- 📡 실시간 메시지 브로드캐스팅

## 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │  useTravelWith  │  │  Other Hooks/   │                │
│  │    Course       │  │   Components    │                │
│  └─────────────────┘  └─────────────────┘                │
└─────────────────────────────────────────────────────────┘
                              │
                              │ globalEventEmitter
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   Event System Layer                    │
│              globalEventEmitter (Singleton)             │
└─────────────────────────────────────────────────────────┘
                              │
                              │ emit/on/off
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  Socket Management Layer                │
│               SocketManager (Singleton)                 │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │   SocketBuffer  │  │  makeNewConnection │              │
│  │   (URL 기반     │  │  disconnectSocket  │              │
│  │    소켓 캐싱)    │  │  getSocket        │              │
│  └─────────────────┘  └─────────────────┘                │
└─────────────────────────────────────────────────────────┘
                              │
                              │ WebSocket API
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   WebSocket Layer                       │
│                    Socket Class                         │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │   connect()     │  │  sendMessage()  │                │
│  │   disconnect()  │  │  addEventListener │              │
│  │   인증 처리      │  │  상태 관리       │                │
│  └─────────────────┘  └─────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

## 핵심 컴포넌트

### 1. Socket Class (`socket.ts`)

기본 WebSocket 연결을 관리하는 클래스입니다.

**주요 기능:**
- WebSocket 연결/해제
- 토큰 기반 자동 인증 (`auth-user` 이벤트)
- 메시지 타입 가드 및 유효성 검증
- 연결 상태 관리 (`isAuthenticated`)

**인증 플로우:**
```typescript
// 1. 연결 시 자동으로 인증 토큰 전송
{
  event: "auth-user",
  data: { authorization: token }
}

// 2. 서버 응답으로 인증 상태 업데이트
// response.status === "success" && !response.data
// → this.isAuthenticated = true
```

### 2. SocketBuffer Class (`buffer.ts`)

URL을 키로 하는 소켓 인스턴스 캐시를 관리합니다.

**주요 기능:**
- URL별 소켓 인스턴스 저장/조회
- 중복 연결 방지
- 소켓 라이프사이클 관리

### 3. SocketManager Class (`manager.ts`)

싱글톤 패턴으로 구현된 소켓 매니저입니다.

**주요 기능:**
- 전역 소켓 연결 관리
- 자동 이벤트 브로드캐스팅
- 연결 재사용 및 최적화

### 4. EventEmitter (`../events/index.ts`)

전역 이벤트 시스템을 제공합니다.

**주요 기능:**
- 타입 안전한 이벤트 발행/구독
- 자동 에러 핸들링
- 메모리 누수 방지를 위한 리스너 정리

## 동작 원리

### 1. 연결 생성 과정

```typescript
// 1. 싱글톤 인스턴스 획득
const socketManager = SocketManager.getInstance();

// 2. 연결 생성 요청
socketManager.makeNewConnection({
  url: SOCKET_URL,
  token: accessToken
});

// 3. 기존 연결 확인
// - 기존 연결이 있으면 재사용
// - 없으면 새 Socket 인스턴스 생성

// 4. 이벤트 핸들러 설정
// - onMessage → globalEventEmitter.emit()
// - onClose → globalEventEmitter.emit()

// 5. SocketBuffer에 저장
```

### 2. 메시지 처리 과정

```typescript
// 1. 서버에서 메시지 수신
WebSocket.onmessage = (event) => { ... }

// 2. 메시지 파싱 및 검증
const response = JSON.parse(event.data);
if (socketMessageTypeGuard(response)) { ... }

// 3. 전역 이벤트 발행
globalEventEmitter.emit(`socket-message-${url}`, response);

// 4. 구독 중인 컴포넌트에서 처리
useEffect(() => {
  const handler = (response) => {
    // 최신 state/함수 사용 가능
  };
  globalEventEmitter.on(eventName, handler);
}, [dependencies]); // React 의존성으로 클로저 해결
```

### 3. 페이지 이동 시 동작

```
페이지 A → 페이지 B → 페이지 A 복귀

1. 페이지 A: 소켓 연결 + 이벤트 구독
2. 페이지 B: 페이지 A 컴포넌트 언마운트
   - 이벤트 구독 해제 (cleanup)
   - 소켓 연결은 유지 (싱글톤)
3. 페이지 A 복귀: 새 컴포넌트 인스턴스 생성
   - 기존 소켓 연결 재사용
   - 새로운 이벤트 구독 (최신 함수들)
   - 메시지 수신 시 최신 핸들러 실행
```

## 사용법

### 기본 사용법

```typescript
import SocketManager from "@service/socket/manager";
import globalEventEmitter from "@service/events";

const MyComponent = () => {
  // 1. 싱글톤 인스턴스 획득
  const socketManager = SocketManager.getInstance();

  // 2. 소켓 연결
  useEffect(() => {
    socketManager.makeNewConnection({
      url: SOCKET_URL,
      token: accessToken,
    });
  }, []);

  // 3. 이벤트 구독
  useEffect(() => {
    const handleMessage = (response) => {
      // 메시지 처리 로직
    };

    const eventName = `socket-message-${SOCKET_URL}`;
    globalEventEmitter.on(eventName, handleMessage);

    return () => {
      globalEventEmitter.off(eventName, handleMessage);
    };
  }, [dependencies]); // 의존성 배열로 최신 함수 보장
};
```

### 메시지 전송

```typescript
const sendMessage = () => {
  const socket = socketManager.getSocket(SOCKET_URL);
  if (socket && socket.isAuthenticated) {
    socket.sendMessage({
      event: "current-position",
      data: { coordinate: [longitude, latitude] }
    });
  }
};
```

### 연결 해제

```typescript
useEffect(() => {
  return () => {
    // 컴포넌트 언마운트 시 연결 해제
    socketManager.disconnectSocket(SOCKET_URL);
  };
}, []);
```

## 이벤트 시스템

### 이벤트 네이밍 컨벤션

```typescript
// 메시지 이벤트
`socket-message-${url}` // 예: "socket-message-wss://api.example.com/travel"

// 연결 종료 이벤트  
`socket-close-${url}`   // 예: "socket-close-wss://api.example.com/travel"
```

### 이벤트 페이로드

```typescript
// 메시지 이벤트 페이로드
interface SocketMessage {
  status: string;
  data?: any;
}

// 사용 예시
globalEventEmitter.on(`socket-message-${url}`, (response: SocketMessage) => {
  if (response.status === "success" && response.data) {
    // 메시지 처리
  }
});
```

## 모범 사례

### 1. 의존성 배열 관리

```typescript
// ✅ 올바른 사용법
useEffect(() => {
  const handler = (response) => {
    sendSetMapPolylineMessage(polylines);
    showToast(notification);
    setTravelState(newState);
  };
  
  globalEventEmitter.on(eventName, handler);
  return () => globalEventEmitter.off(eventName, handler);
}, [sendSetMapPolylineMessage, showToast, setTravelState, coordinates]);

// ❌ 잘못된 사용법 (클로저 문제)
useEffect(() => {
  const handler = (response) => {
    sendSetMapPolylineMessage(polylines); // 오래된 함수 참조
  };
  
  globalEventEmitter.on(eventName, handler);
  return () => globalEventEmitter.off(eventName, handler);
}, []); // 빈 의존성 배열
```

### 2. 연결 상태 확인

```typescript
// ✅ 연결 및 인증 상태 확인
const sendMessage = () => {
  const socket = socketManager.getSocket(url);
  if (socket && socket.isAuthenticated) {
    socket.sendMessage(data);
  } else {
    console.warn("Socket not connected or authenticated");
  }
};
```

### 3. 에러 처리

```typescript
// ✅ 적절한 에러 처리
useEffect(() => {
  const handleMessage = (response) => {
    try {
      if (response.status === "success") {
        processMessage(response.data);
      } else {
        console.error("Server error:", response);
      }
    } catch (error) {
      console.error("Message processing error:", error);
    }
  };

  globalEventEmitter.on(eventName, handleMessage);
  return () => globalEventEmitter.off(eventName, handleMessage);
}, [dependencies]);
```

### 4. 메모리 누수 방지

```typescript
// ✅ cleanup 함수로 리스너 정리
useEffect(() => {
  const handler = (response) => { ... };
  
  globalEventEmitter.on(eventName, handler);
  
  return () => {
    // 컴포넌트 언마운트 시 리스너 정리
    globalEventEmitter.off(eventName, handler);
  };
}, [dependencies]);
```

## 문제 해결

### 1. 메시지를 받지 못하는 경우

**증상:** 서버에서 메시지를 보내지만 클라이언트에서 처리되지 않음

**원인:**
- 이벤트 이름 불일치
- 리스너가 등록되지 않음
- 인증되지 않은 소켓

**해결방법:**
```typescript
// 1. 이벤트 이름 확인
console.log("Event name:", `socket-message-${SOCKET_URL}`);

// 2. 소켓 연결 및 인증 상태 확인
const socket = socketManager.getSocket(SOCKET_URL);
console.log("Socket exists:", !!socket);
console.log("Is authenticated:", socket?.isAuthenticated);

// 3. 이벤트 리스너 등록 확인
globalEventEmitter.emit("test-event", "test");
```

### 2. 페이지 이동 후 이벤트가 동작하지 않는 경우

**증상:** 페이지를 떠났다가 돌아오면 소켓 메시지가 처리되지 않음

**원인:**
- 이벤트 리스너가 정리되지 않음
- 의존성 배열 누락

**해결방법:**
```typescript
// ✅ 올바른 cleanup 및 의존성 관리
useEffect(() => {
  const handler = (response) => {
    // 최신 함수들 사용
  };
  
  globalEventEmitter.on(eventName, handler);
  return () => globalEventEmitter.off(eventName, handler); // cleanup 필수
}, [allDependencies]); // 모든 의존성 포함
```

### 3. 중복 연결 문제

**증상:** 같은 URL로 여러 번 연결 시도

**원인:**
- SocketBuffer의 중복 체크 로직 이슈
- 컴포넌트가 여러 번 마운트됨

**해결방법:**
```typescript
// 연결 전 기존 연결 확인
const existingSocket = socketManager.getSocket(SOCKET_URL);
if (!existingSocket) {
  socketManager.makeNewConnection({ url: SOCKET_URL, token });
}
```

### 4. 메모리 누수

**증상:** 앱 사용 시간이 길어질수록 메모리 사용량 증가

**원인:**
- 이벤트 리스너가 정리되지 않음
- 소켓 연결이 해제되지 않음

**해결방법:**
```typescript
// 1. 컴포넌트 언마운트 시 정리
useEffect(() => {
  return () => {
    globalEventEmitter.removeAllListeners(`socket-message-${SOCKET_URL}`);
    socketManager.disconnectSocket(SOCKET_URL);
  };
}, []);

// 2. 앱 종료 시 전체 정리
useEffect(() => {
  const cleanup = () => {
    globalEventEmitter.removeAllListeners();
  };
  
  AppState.addEventListener('change', cleanup);
  return () => AppState.removeEventListener('change', cleanup);
}, []);
```

---

## 버전 정보

- **현재 버전:** 1.0.0
- **마지막 업데이트:** 2024년
- **호환성:** React Native 0.60+

## 기여하기

소켓 서비스 개선사항이나 버그 발견 시:
1. 이슈 생성
2. 테스트 케이스 작성
3. Pull Request 제출

---

**참고:** 이 문서는 실제 구현을 바탕으로 작성되었으며, 사용 중 문제가 발생할 경우 위의 문제 해결 가이드를 참고하시기 바랍니다.