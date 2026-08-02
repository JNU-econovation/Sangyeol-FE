# Event Service Documentation

전역 이벤트 시스템 (Pub/Sub Pattern) 서비스의 아키텍처, 동작 원리 및 사용법에 대한 문서입니다.

## 📋 목차

- [개요](#개요)
- [Pub/Sub 패턴이란?](#pubsub-패턴이란)
- [아키텍처](#아키텍처)
- [API 레퍼런스](#api-레퍼런스)
- [동작 원리](#동작-원리)
- [사용법](#사용법)
- [React Hook과의 통합](#react-hook과의-통합)
- [고급 사용법](#고급-사용법)
- [모범 사례](#모범-사례)
- [성능 최적화](#성능-최적화)
- [디버깅](#디버깅)
- [문제 해결](#문제-해결)
- [확장 가능성](#확장-가능성)

## 개요

Event Service는 **발행-구독(Publish-Subscribe) 패턴**을 구현한 전역 이벤트 시스템입니다. React Native 앱에서 컴포넌트 간 느슨한 결합을 통한 통신을 가능하게 하며, 특히 **React Hook의 클로저 문제**를 효과적으로 해결합니다.

### 주요 특징

- 🎯 **느슨한 결합**: 컴포넌트 간 직접 의존성 없이 통신
- ⚡ **실시간 통신**: 즉시 이벤트 전파
- 🔒 **타입 안전성**: TypeScript 완전 지원
- 🛡️ **에러 안전성**: 자동 에러 핸들링 및 로깅
- 🧹 **메모리 관리**: 명시적 리스너 정리 기능
- 🔍 **디버깅 지원**: 상세한 에러 로깅

### 해결하는 문제들

1. **React Hook 클로저 문제**
2. **컴포넌트 간 복잡한 prop drilling**
3. **페이지 이동 시 상태 동기화**
4. **전역 상태 변경 알림**
5. **비동기 이벤트 처리**

## Pub/Sub 패턴이란?

**발행-구독(Publish-Subscribe) 패턴**은 메시지를 발행하는 Publisher와 메시지를 구독하는 Subscriber 간에 **느슨한 결합**을 제공하는 메시징 패턴입니다.

### 전통적인 직접 통신 vs Pub/Sub

```typescript
// ❌ 직접 통신 (강한 결합)
class ComponentA {
  private componentB: ComponentB;
  private componentC: ComponentC;
  
  updateData() {
    this.componentB.handleDataUpdate(data);
    this.componentC.handleDataUpdate(data); // 의존성 증가
  }
}

// ✅ Pub/Sub 패턴 (느슨한 결합)
class ComponentA {
  updateData() {
    eventEmitter.emit('data-updated', data); // 발행만
  }
}

class ComponentB {
  constructor() {
    eventEmitter.on('data-updated', this.handleUpdate); // 구독만
  }
}
```

### Pub/Sub의 장점

- **확장성**: 새로운 구독자 추가가 쉬움
- **유연성**: 발행자와 구독자가 독립적
- **재사용성**: 동일한 이벤트를 여러 곳에서 활용
- **테스트 용이성**: 각 컴포넌트를 독립적으로 테스트

## 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                      Event Service                          │
│                    globalEventEmitter                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 EventEmitter Class                       │ │
│  │                                                         │ │
│  │  events: {                                              │ │
│  │    "user-login": [handler1, handler2],                 │ │
│  │    "data-updated": [handler3],                          │ │
│  │    "socket-message-url1": [handler4, handler5]         │ │
│  │  }                                                      │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Event Flow
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Publishers                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │  SocketManager  │  │  AuthService    │  │  DataLayer   │  │
│  │  emit(...)      │  │  emit(...)      │  │  emit(...)   │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Event Distribution
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Subscribers                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │   Component A   │  │   Component B   │  │  Component C │  │
│  │   on(...)       │  │   on(...)       │  │   on(...)    │  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## API 레퍼런스

### EventEmitter Class

#### `on(eventName: string, handler: EventHandler)`
이벤트 구독 메소드입니다.

```typescript
type EventHandler = (...args: any[]) => void;

// 사용법
globalEventEmitter.on('user-login', (userData) => {
  console.log('User logged in:', userData);
});
```

**매개변수:**
- `eventName`: 구독할 이벤트 이름
- `handler`: 이벤트 발생 시 실행될 콜백 함수

**반환값:** 없음

#### `off(eventName: string, handler: EventHandler)`
이벤트 구독 해제 메소드입니다.

```typescript
const handler = (data) => { ... };

// 구독
globalEventEmitter.on('user-login', handler);

// 구독 해제
globalEventEmitter.off('user-login', handler);
```

**주의사항:** `off`에 전달하는 handler는 `on`에서 사용한 것과 **동일한 함수 참조**여야 합니다.

#### `emit(eventName: string, ...args: any[])`
이벤트 발행 메소드입니다.

```typescript
// 단일 데이터 전송
globalEventEmitter.emit('user-login', { id: 1, name: 'John' });

// 복수 매개변수 전송
globalEventEmitter.emit('data-sync', userId, timestamp, metadata);

// 매개변수 없이 발행
globalEventEmitter.emit('app-ready');
```

**매개변수:**
- `eventName`: 발행할 이벤트 이름
- `...args`: 구독자에게 전달할 데이터 (가변 인자)

#### `removeAllListeners(eventName?: string)`
리스너 일괄 제거 메소드입니다.

```typescript
// 특정 이벤트의 모든 리스너 제거
globalEventEmitter.removeAllListeners('user-login');

// 모든 이벤트의 모든 리스너 제거
globalEventEmitter.removeAllListeners();
```

### 전역 인스턴스

```typescript
import globalEventEmitter from '@service/events';

// 앱 전체에서 동일한 인스턴스 사용
// 별도의 new EventEmitter() 생성 불필요
```

## 동작 원리

### 1. 이벤트 등록 과정

```typescript
// 1. 첫 번째 구독자 등록
globalEventEmitter.on('user-login', handlerA);
// events = { "user-login": [handlerA] }

// 2. 두 번째 구독자 등록
globalEventEmitter.on('user-login', handlerB);
// events = { "user-login": [handlerA, handlerB] }

// 3. 다른 이벤트 구독자 등록
globalEventEmitter.on('data-updated', handlerC);
// events = { 
//   "user-login": [handlerA, handlerB],
//   "data-updated": [handlerC]
// }
```

### 2. 이벤트 발행 과정

```typescript
globalEventEmitter.emit('user-login', userData);

// 내부 동작:
// 1. events["user-login"] 배열 조회
// 2. 각 핸들러를 순차적으로 실행
// 3. 에러 발생 시 로깅 후 다음 핸들러 계속 실행

events["user-login"].forEach(handler => {
  try {
    handler(userData);
  } catch (error) {
    console.error('[EventEmitter] Error in event handler for user-login:', error);
  }
});
```

### 3. 메모리 관리

```typescript
// 자동 메모리 정리
globalEventEmitter.off('user-login', handlerA);
// events = { "user-login": [handlerB], "data-updated": [handlerC] }

// 빈 배열은 유지 (성능상 이유)
globalEventEmitter.off('user-login', handlerB);
// events = { "user-login": [], "data-updated": [handlerC] }
```

## 사용법

### 기본 사용법

```typescript
import globalEventEmitter from '@service/events';

// 1. 이벤트 구독
const handleUserLogin = (userData) => {
  console.log('Welcome,', userData.name);
  updateUI(userData);
};

globalEventEmitter.on('user-login', handleUserLogin);

// 2. 이벤트 발행
const loginUser = (email, password) => {
  // 로그인 로직...
  const userData = { id: 1, name: 'John', email };
  
  globalEventEmitter.emit('user-login', userData);
};

// 3. 구독 해제
globalEventEmitter.off('user-login', handleUserLogin);
```

### React 컴포넌트에서의 사용법

```typescript
import React, { useEffect, useState } from 'react';
import globalEventEmitter from '@service/events';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 이벤트 핸들러 정의
    const handleUserLogin = (userData) => {
      setUser(userData);
    };

    const handleUserLogout = () => {
      setUser(null);
    };

    // 이벤트 구독
    globalEventEmitter.on('user-login', handleUserLogin);
    globalEventEmitter.on('user-logout', handleUserLogout);

    // cleanup 함수로 구독 해제
    return () => {
      globalEventEmitter.off('user-login', handleUserLogin);
      globalEventEmitter.off('user-logout', handleUserLogout);
    };
  }, []); // 빈 의존성 배열 (한 번만 등록)

  return (
    <div>
      {user ? `Hello, ${user.name}` : 'Please login'}
    </div>
  );
};
```

### 서비스 레이어에서의 사용법

```typescript
// AuthService.ts
class AuthService {
  async login(email: string, password: string) {
    try {
      const userData = await api.login(email, password);
      
      // 로그인 성공 이벤트 발행
      globalEventEmitter.emit('user-login', userData);
      globalEventEmitter.emit('auth-status-changed', { isLoggedIn: true });
      
      return userData;
    } catch (error) {
      // 로그인 실패 이벤트 발행
      globalEventEmitter.emit('auth-error', error);
      throw error;
    }
  }

  logout() {
    // 로그아웃 이벤트 발행
    globalEventEmitter.emit('user-logout');
    globalEventEmitter.emit('auth-status-changed', { isLoggedIn: false });
  }
}
```

## React Hook과의 통합

### 클로저 문제 해결

**문제 상황:**
```typescript
// ❌ 클로저 문제 발생
const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = () => {
      console.log(count); // 항상 0 출력 (초기값)
    };
    
    globalEventEmitter.on('some-event', handler);
  }, []); // 빈 의존성 배열
};
```

**해결 방법:**
```typescript
// ✅ 의존성 배열로 해결
const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handler = () => {
      console.log(count); // 최신 count 값 사용
      console.log(user);  // 최신 user 값 사용
    };
    
    globalEventEmitter.on('some-event', handler);
    
    return () => {
      globalEventEmitter.off('some-event', handler);
    };
  }, [count, user]); // 의존성 배열에 포함
};
```

### Custom Hook 패턴

```typescript
// useEventListener.ts
import { useEffect } from 'react';
import globalEventEmitter from '@service/events';

const useEventListener = (eventName: string, handler: Function, deps: any[] = []) => {
  useEffect(() => {
    const eventHandler = (...args: any[]) => {
      handler(...args);
    };

    globalEventEmitter.on(eventName, eventHandler);

    return () => {
      globalEventEmitter.off(eventName, eventHandler);
    };
  }, deps);
};

// 사용법
const MyComponent = () => {
  const [user, setUser] = useState(null);

  useEventListener('user-login', (userData) => {
    setUser(userData);
  }, []);

  useEventListener('user-logout', () => {
    setUser(null);
  }, []);

  return <div>{user?.name}</div>;
};
```

### 이벤트 발행 Hook

```typescript
// useEventEmitter.ts
import { useCallback } from 'react';
import globalEventEmitter from '@service/events';

const useEventEmitter = () => {
  const emit = useCallback((eventName: string, ...args: any[]) => {
    globalEventEmitter.emit(eventName, ...args);
  }, []);

  return { emit };
};

// 사용법
const LoginButton = () => {
  const { emit } = useEventEmitter();

  const handleLogin = async () => {
    const userData = await authService.login(email, password);
    emit('user-login', userData);
  };

  return <button onClick={handleLogin}>Login</button>;
};
```

## 고급 사용법

### 이벤트 네임스페이싱

```typescript
// 네임스페이스로 이벤트 구조화
const Events = {
  AUTH: {
    LOGIN: 'auth:login',
    LOGOUT: 'auth:logout',
    ERROR: 'auth:error'
  },
  DATA: {
    UPDATED: 'data:updated',
    SYNC_START: 'data:sync-start',
    SYNC_COMPLETE: 'data:sync-complete'
  },
  UI: {
    MODAL_OPEN: 'ui:modal-open',
    MODAL_CLOSE: 'ui:modal-close',
    THEME_CHANGE: 'ui:theme-change'
  }
};

// 사용법
globalEventEmitter.emit(Events.AUTH.LOGIN, userData);
globalEventEmitter.on(Events.DATA.UPDATED, handleDataUpdate);
```

### 이벤트 체이닝

```typescript
// 여러 이벤트를 순차적으로 발행
const processUserLogin = (userData) => {
  globalEventEmitter.emit('auth:login-start', userData);
  
  // 로그인 처리...
  
  globalEventEmitter.emit('auth:login-success', userData);
  globalEventEmitter.emit('data:fetch-user-profile', userData.id);
  globalEventEmitter.emit('ui:redirect-dashboard');
};
```

### 조건부 이벤트 발행

```typescript
// 상태에 따른 조건부 발행
const updateUserData = (newData, silent = false) => {
  // 데이터 업데이트...
  
  if (!silent) {
    globalEventEmitter.emit('user:data-updated', newData);
  }
};
```

### 일회성 이벤트 리스너

```typescript
// 한 번만 실행되는 이벤트 리스너
const createOneTimeListener = (eventName: string, handler: Function) => {
  const oneTimeHandler = (...args: any[]) => {
    handler(...args);
    globalEventEmitter.off(eventName, oneTimeHandler);
  };
  
  globalEventEmitter.on(eventName, oneTimeHandler);
};

// 사용법
createOneTimeListener('app:ready', () => {
  console.log('App is ready!');
});
```

## 모범 사례

### 1. 이벤트 이름 규칙

```typescript
// ✅ 좋은 예시
'user:login'           // 카테고리:액션
'data:sync-complete'   // 명확하고 구체적
'socket:message-received'  // 의미가 명확

// ❌ 나쁜 예시
'event1'              // 의미 불명확
'update'              // 너무 일반적
'userLoginSuccess'    // camelCase 대신 kebab-case 권장
```

### 2. 이벤트 페이로드 설계

```typescript
// ✅ 구조화된 페이로드
interface UserLoginEvent {
  user: {
    id: number;
    name: string;
    email: string;
  };
  timestamp: Date;
  source: 'manual' | 'auto' | 'social';
}

globalEventEmitter.emit('user:login', {
  user: userData,
  timestamp: new Date(),
  source: 'manual'
} as UserLoginEvent);

// ❌ 구조화되지 않은 페이로드
globalEventEmitter.emit('user:login', userData.id, userData.name, new Date());
```

### 3. 리스너 정리 패턴

```typescript
// ✅ React Component에서의 정리
useEffect(() => {
  const handlers = {
    login: (data) => handleLogin(data),
    logout: () => handleLogout(),
    error: (error) => handleError(error)
  };

  // 여러 이벤트 구독
  Object.entries(handlers).forEach(([event, handler]) => {
    globalEventEmitter.on(`auth:${event}`, handler);
  });

  // cleanup에서 일괄 해제
  return () => {
    Object.entries(handlers).forEach(([event, handler]) => {
      globalEventEmitter.off(`auth:${event}`, handler);
    });
  };
}, []);
```

### 4. 에러 핸들링

```typescript
// ✅ 안전한 이벤트 발행
const safeEmit = (eventName: string, data: any) => {
  try {
    globalEventEmitter.emit(eventName, data);
  } catch (error) {
    console.error(`Failed to emit event ${eventName}:`, error);
    // 에러 이벤트 발행
    globalEventEmitter.emit('system:error', {
      type: 'event-emission-failed',
      originalEvent: eventName,
      error
    });
  }
};
```

### 5. TypeScript 타입 안전성

```typescript
// 이벤트 타입 정의
interface EventMap {
  'user:login': { user: User; timestamp: Date };
  'user:logout': void;
  'data:updated': { type: string; data: any };
  'error:network': { message: string; code: number };
}

// 타입 안전한 EventEmitter (선택적 구현)
class TypedEventEmitter {
  on<K extends keyof EventMap>(
    eventName: K,
    handler: (data: EventMap[K]) => void
  ) {
    globalEventEmitter.on(eventName as string, handler);
  }

  emit<K extends keyof EventMap>(
    eventName: K,
    data: EventMap[K]
  ) {
    globalEventEmitter.emit(eventName as string, data);
  }
}
```

## 성능 최적화

### 1. 리스너 개수 모니터링

```typescript
// 리스너 개수 확인 유틸리티
const getListenerCount = (eventName?: string) => {
  if (eventName) {
    return globalEventEmitter['events'][eventName]?.length || 0;
  }
  
  return Object.values(globalEventEmitter['events'])
    .reduce((total, handlers) => total + handlers.length, 0);
};

// 사용법
console.log('Total listeners:', getListenerCount());
console.log('Login listeners:', getListenerCount('user:login'));
```

### 2. 배치 이벤트 발행

```typescript
// 여러 이벤트를 한 번에 발행
const emitBatch = (events: Array<{ name: string; data: any }>) => {
  // 다음 tick에서 실행하여 UI 블로킹 방지
  setTimeout(() => {
    events.forEach(({ name, data }) => {
      globalEventEmitter.emit(name, data);
    });
  }, 0);
};

// 사용법
emitBatch([
  { name: 'data:updated', data: newData },
  { name: 'ui:refresh', data: null },
  { name: 'analytics:track', data: eventData }
]);
```

### 3. 쓰로틀링/디바운싱

```typescript
// 디바운스된 이벤트 발행
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const debouncedEmit = debounce((eventName: string, data: any) => {
  globalEventEmitter.emit(eventName, data);
}, 300);

// 사용법 - 빈번한 이벤트 방지
const handleTextChange = (text: string) => {
  debouncedEmit('search:query-changed', { query: text });
};
```

## 디버깅

### 1. 이벤트 로깅

```typescript
// 개발 모드에서 이벤트 로깅
const originalEmit = globalEventEmitter.emit;
globalEventEmitter.emit = function(eventName: string, ...args: any[]) {
  if (__DEV__) {
    console.log(`[Event] ${eventName}`, args);
  }
  return originalEmit.call(this, eventName, ...args);
};
```

### 2. 리스너 추적

```typescript
// 리스너 등록/해제 추적
const originalOn = globalEventEmitter.on;
const originalOff = globalEventEmitter.off;

globalEventEmitter.on = function(eventName: string, handler: Function) {
  if (__DEV__) {
    console.log(`[Event] Listener added: ${eventName}`);
  }
  return originalOn.call(this, eventName, handler);
};

globalEventEmitter.off = function(eventName: string, handler: Function) {
  if (__DEV__) {
    console.log(`[Event] Listener removed: ${eventName}`);
  }
  return originalOff.call(this, eventName, handler);
};
```

### 3. 이벤트 히스토리

```typescript
// 이벤트 발행 히스토리 추적
const eventHistory: Array<{ name: string; data: any; timestamp: Date }> = [];

const trackingEmit = (eventName: string, ...args: any[]) => {
  eventHistory.push({
    name: eventName,
    data: args,
    timestamp: new Date()
  });
  
  // 최근 100개만 유지
  if (eventHistory.length > 100) {
    eventHistory.shift();
  }
  
  globalEventEmitter.emit(eventName, ...args);
};
```

## 문제 해결

### 1. 리스너가 호출되지 않는 경우

**증상:** 이벤트를 발행했지만 리스너가 실행되지 않음

**원인:**
- 이벤트 이름 오타
- 리스너가 등록되지 않음
- 리스너가 이미 해제됨

**해결방법:**
```typescript
// 디버깅 코드
console.log('Available events:', Object.keys(globalEventEmitter['events']));
console.log('Listeners for user:login:', globalEventEmitter['events']['user:login']);

// 이벤트 이름 확인
const EVENT_NAMES = {
  USER_LOGIN: 'user:login'
} as const;

globalEventEmitter.emit(EVENT_NAMES.USER_LOGIN, userData);
```

### 2. 메모리 누수

**증상:** 앱 사용 중 메모리 사용량이 계속 증가

**원인:**
- 리스너가 정리되지 않음
- 컴포넌트 언마운트 시 cleanup 누락

**해결방법:**
```typescript
// ✅ 적절한 cleanup
useEffect(() => {
  const handler = (data) => { ... };
  
  globalEventEmitter.on('some-event', handler);
  
  return () => {
    globalEventEmitter.off('some-event', handler); // 필수!
  };
}, []);

// 또는 앱 종료 시 전체 정리
useEffect(() => {
  const cleanup = () => {
    globalEventEmitter.removeAllListeners();
  };
  
  // 앱 상태 변경 시 정리
  AppState.addEventListener('change', (state) => {
    if (state === 'background') cleanup();
  });
}, []);
```

### 3. 이벤트 루프

**증상:** 이벤트 A → 이벤트 B → 이벤트 A 무한 반복

**원인:**
- 순환 이벤트 발행
- 잘못된 이벤트 설계

**해결방법:**
```typescript
// ✅ 이벤트 체인 추적
const emittedEvents = new Set();

const safeEmit = (eventName: string, data: any) => {
  if (emittedEvents.has(eventName)) {
    console.warn(`Circular event detected: ${eventName}`);
    return;
  }
  
  emittedEvents.add(eventName);
  globalEventEmitter.emit(eventName, data);
  
  // 다음 tick에서 정리
  setTimeout(() => {
    emittedEvents.delete(eventName);
  }, 0);
};
```

### 4. React Hook 의존성 문제

**증상:** 이벤트 핸들러에서 오래된 state 값 참조

**원인:**
- useEffect 의존성 배열 누락
- 클로저 문제

**해결방법:**
```typescript
// ✅ 올바른 의존성 관리
const [user, setUser] = useState(null);
const [count, setCount] = useState(0);

useEffect(() => {
  const handler = (data) => {
    // 최신 user, count 값 사용 가능
    console.log(user, count);
  };
  
  globalEventEmitter.on('some-event', handler);
  
  return () => {
    globalEventEmitter.off('some-event', handler);
  };
}, [user, count]); // 모든 사용된 state를 의존성에 포함
```

## 확장 가능성

### 1. 미들웨어 시스템

```typescript
// 이벤트 미들웨어 구현
type Middleware = (eventName: string, data: any, next: Function) => void;

const middlewares: Middleware[] = [];

const addMiddleware = (middleware: Middleware) => {
  middlewares.push(middleware);
};

// 로깅 미들웨어
addMiddleware((eventName, data, next) => {
  console.log(`[Event] ${eventName}`, data);
  next();
});

// 인증 미들웨어
addMiddleware((eventName, data, next) => {
  if (eventName.startsWith('admin:') && !isAdmin()) {
    console.warn('Unauthorized admin event');
    return;
  }
  next();
});
```

### 2. 이벤트 지속화

```typescript
// 중요한 이벤트를 로컬 스토리지에 저장
const persistentEvents = ['user:login', 'app:crash'];

const persistEvent = (eventName: string, data: any) => {
  if (persistentEvents.includes(eventName)) {
    AsyncStorage.setItem(`event:${eventName}:${Date.now()}`, JSON.stringify({
      eventName,
      data,
      timestamp: new Date()
    }));
  }
};
```

### 3. 원격 이벤트 동기화

```typescript
// 서버와 이벤트 동기화
const syncWithServer = (eventName: string, data: any) => {
  if (eventName.startsWith('sync:')) {
    fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ eventName, data })
    });
  }
};

// 서버에서 이벤트 수신
const listenToServerEvents = () => {
  websocket.on('server-event', ({ eventName, data }) => {
    globalEventEmitter.emit(eventName, data);
  });
};
```

### 4. 이벤트 분석

```typescript
// 이벤트 통계 수집
const eventStats = {
  totalEmitted: 0,
  totalListeners: 0,
  eventCounts: {} as Record<string, number>
};

const trackEventStats = (eventName: string) => {
  eventStats.totalEmitted++;
  eventStats.eventCounts[eventName] = (eventStats.eventCounts[eventName] || 0) + 1;
};

// 인기 이벤트 조회
const getPopularEvents = () => {
  return Object.entries(eventStats.eventCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
};
```

---

## 실제 사용 사례

### 현재 프로젝트에서의 활용

```typescript
// 소켓 메시지 브로드캐스팅
globalEventEmitter.emit(`socket-message-${url}`, response);

// 컴포넌트에서 구독
useEffect(() => {
  const handleSocketMessage = (response) => {
    // 최신 함수들 사용 가능
    sendSetMapPolylineMessage(polylines);
    showToast(notification);
    setTravelState(newState);
  };

  globalEventEmitter.on(`socket-message-${TRAVEL_SOCKET_URL}`, handleSocketMessage);
  
  return () => {
    globalEventEmitter.off(`socket-message-${TRAVEL_SOCKET_URL}`, handleSocketMessage);
  };
}, [sendSetMapPolylineMessage, showToast, setTravelState, coordinates]);
```

### 확장 가능한 활용 예시

```typescript
// 사용자 인증
globalEventEmitter.emit('auth:login-success', { user, token });
globalEventEmitter.emit('auth:logout');

// 데이터 동기화
globalEventEmitter.emit('data:sync-start');
globalEventEmitter.emit('data:sync-progress', { progress: 50 });
globalEventEmitter.emit('data:sync-complete', { updatedCount: 100 });

// UI 상태 관리
globalEventEmitter.emit('ui:modal-open', { modalType: 'confirmation' });
globalEventEmitter.emit('ui:theme-changed', { theme: 'dark' });

// 네트워크 상태
globalEventEmitter.emit('network:online');
globalEventEmitter.emit('network:offline');

// 에러 처리
globalEventEmitter.emit('error:network', { message: 'Connection failed' });
globalEventEmitter.emit('error:validation', { field: 'email', message: 'Invalid format' });
```

---

## 버전 정보

- **현재 버전:** 1.0.0
- **마지막 업데이트:** 2024년
- **호환성:** React Native 0.60+, TypeScript 4.0+

## 기여하기

Event Service 개선사항이나 버그 발견 시:
1. 이슈 생성 및 재현 방법 제공
2. 단위 테스트 작성
3. 성능 벤치마크 제공 (해당되는 경우)
4. 문서 업데이트
5. Pull Request 제출

---

**참고:** 이 서비스는 현재 소켓 메시지 핸들링에 특화되어 사용되고 있지만, 범용적인 이벤트 시스템으로 확장 가능하도록 설계되었습니다. 필요에 따라 추가 기능을 구현하여 사용하시기 바랍니다.