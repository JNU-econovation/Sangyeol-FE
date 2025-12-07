# Bridge

TCP 3-way Handshake 프로토콜 기반의 웹뷰-네이티브 양방향 통신 라이브러리입니다.

[🔗 blog post](https://geongyu09.github.io/post/webviewThreeWayHandshake/)

## 개요

Bridge는 React Native 앱과 웹뷰 간의 안정적이고 타입 안전한 양방향 통신을 제공합니다. 기존 `postMessage` 방식의 단방향 통신을 넘어, 요청-응답 패턴과 콜백 기반 비동기 처리를 지원합니다.

### 주요 특징

- **요청-응답 패턴**: 메시지 전송 시 콜백을 등록하여 응답을 비동기로 받을 수 있습니다
- **타입 안전성**: TypeScript 제네릭을 활용한 완전한 타입 체크를 제공합니다
- **메시지 손실 방지**: 3-way Handshake를 통해 웹뷰 준비 상태를 확인하고 안전하게 통신합니다
- **플랫폼 독립성**: iOS/Android 자동 감지 및 동일한 API 제공
- **에러 핸들링**: Strict mode와 Validator를 통한 견고한 에러 처리

## 빠른 시작

### Native에서 사용하기

React Native 앱에서 웹뷰로 메시지를 전송하고 응답을 받습니다.

```typescript
import { usePostMessageBridge } from 'bridge/native';

function MapScreen() {
  const { ref, postMessage } = usePostMessageBridge();

  const requestLocation = () => {
    postMessage({
      message: { type: 'getCurrentLocation' },
      onResponse: (response) => {
        console.log('위치:', response);
      }
    });
  };

  return (
    <View>
      <WebView
        ref={ref}
        source={{ uri: 'https://web.sangyeol.com' }}
      />
      <Button title="위치 요청" onPress={requestLocation} />
    </View>
  );
}
```

또는 `WebviewWithBridge` 컴포넌트를 사용:

```typescript
import { WebviewWithBridge } from 'bridge/native';

function MapScreen() {
  return (
    <WebviewWithBridge
      source={{ uri: 'https://web.sangyeol.com' }}
      onBridgeMessage={(message) => {
        // 웹에서 보낸 요청 처리
        if (message.type === 'openCamera') {
          return { success: true };
        }
      }}
      onReadyToMessage={() => {
        console.log('웹뷰 준비 완료');
      }}
    />
  );
}
```

### Web에서 사용하기

Next.js 웹 앱에서 네이티브로 메시지를 전송하고 응답을 받습니다.

```typescript
'use client';

import { useBridge } from 'bridge/web';

function MapPage() {
  const { request } = useBridge();

  const openCamera = () => {
    request({
      requestMessage: { type: 'openCamera' },
      responseCallback: (response) => {
        console.log('카메라 결과:', response);
      },
      onErrorCallback: (error) => {
        console.error('에러:', error);
      }
    });
  };

  return (
    <button onClick={openCamera}>
      카메라 열기
    </button>
  );
}
```

웹 앱의 루트 레이아웃에서 네이티브 요청 수신:

```typescript
// app/layout.tsx
import { BridgeRequestListener } from 'bridge/web';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <BridgeRequestListener
          onRequest={(message) => {
            if (message.type === 'getCurrentLocation') {
              const position = await getCurrentPosition();
              return { lat: position.lat, lng: position.lng };
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
```

## API Reference

### Native API

#### `usePostMessageBridge<ReqType, ResType>()`

웹뷰로 메시지를 전송하는 React Hook입니다.

**타입 파라미터**

- `ReqType`: 요청 메시지의 타입
- `ResType`: 응답 메시지의 타입

**반환값**

```typescript
{
  ref: RefObject<WebView>;
  postMessage: (props: PostMessageProps<ReqType, ResType>) => void;
}
```

**사용 예시**

```typescript
interface LocationRequest {
  type: "getLocation";
}

interface LocationResponse {
  lat: number;
  lng: number;
}

const { ref, postMessage } = usePostMessageBridge<
  LocationRequest,
  LocationResponse
>();

postMessage({
  message: { type: "getLocation" },
  onResponse: (res) => {
    console.log(res.lat, res.lng); // 타입 안전
  },
});
```

#### `<WebviewWithBridge />`

브릿지 기능이 통합된 WebView 컴포넌트입니다.

**Props**

```typescript
interface WebViewWithBridgeProps<ReqMessage, ResMessage> {
  // 웹으로부터 메시지를 받았을 때 실행될 핸들러
  onBridgeMessage?: (
    reqMessage: ReqMessage
  ) => ResMessage | Promise<ResMessage> | void;

  // Handshake 완료 후 실행될 콜백
  onReadyToMessage?: () => void;

  // 메시지 수신 시 실행될 미들웨어
  middleware?: (message: ReqMessage) => void;

  // 응답이 없을 때 에러를 던질지 여부 (기본값: true)
  strictMode?: boolean;

  // WebView의 ref
  ref?: Ref<WebView>;

  // 나머지 WebView props
  ...WebViewProps
}
```

**사용 예시**

```typescript
<WebviewWithBridge<
  { type: string; data?: any },
  { success: boolean; data?: any }
>
  source={{ uri: 'https://example.com' }}
  onBridgeMessage={async (message) => {
    if (message.type === 'getPhoto') {
      const photo = await pickImage();
      return { success: true, data: photo };
    }
  }}
  onReadyToMessage={() => {
    console.log('웹뷰 통신 준비 완료');
  }}
  strictMode={false}
/>
```

### Web API

#### `useBridge<ReqBody, ResBody>()`

네이티브로 메시지를 전송하는 React Hook입니다.

**타입 파라미터**

- `ReqBody`: 요청 메시지의 body 타입
- `ResBody`: 응답 메시지의 body 타입

**반환값**

```typescript
{
  request: (props: RequestProps<ReqBody, ResBody>) => void;
}
```

**RequestProps**

```typescript
interface RequestProps<ReqBody, ResBody> {
  requestMessage: ReqBody;
  responseCallback?: (resMessage: ResBody) => void;
  onErrorCallback?: (error: Error) => void;
}
```

**사용 예시**

```typescript
interface CameraRequest {
  type: "openCamera";
  options?: {
    quality: number;
  };
}

interface CameraResponse {
  uri: string;
  width: number;
  height: number;
}

const { request } = useBridge<CameraRequest, CameraResponse>();

request({
  requestMessage: {
    type: "openCamera",
    options: { quality: 0.8 },
  },
  responseCallback: (res) => {
    console.log(res.uri); // 타입 안전
  },
  onErrorCallback: (err) => {
    console.error(err);
  },
});
```

#### `<BridgeRequestListener />`

네이티브로부터의 요청을 수신하는 컴포넌트입니다.

**Props**

```typescript
interface BridgeRequestListenerProps<RequestType, ResponseType> {
  // 네이티브로부터 요청을 받았을 때 실행될 핸들러
  onRequest: (reqMessage: RequestType) => ResponseType;

  // 요청 메시지 유효성 검사 함수
  requestValidator?: (reqMessage?: RequestType) => boolean;

  // 응답이 없을 때 에러를 던질지 여부 (기본값: false)
  strictMode?: boolean;
}
```

**사용 예시**

```typescript
<BridgeRequestListener<
  { type: string; data?: any },
  { success: boolean; result?: any }
>
  onRequest={(message) => {
    switch (message.type) {
      case 'getCurrentLocation':
        const pos = getCurrentPosition();
        return { success: true, result: pos };

      case 'getLocalStorage':
        const data = localStorage.getItem(message.data.key);
        return { success: true, result: data };

      default:
        return { success: false };
    }
  }}
  requestValidator={(message) => {
    return message?.type !== undefined;
  }}
  strictMode={true}
/>
```

## 아키텍처

### TCP 3-way Handshake

Bridge는 TCP의 3-way Handshake 프로토콜을 모방하여 안정적인 통신 연결을 보장합니다.

```
Web                           Native
 │                              │
 ├─ SYN ───────────────────────>│  1. 웹이 연결 요청
 │  { syn: 1, ack: null }       │
 │                              │
 │<────────────────────── SYN-ACK  2. 네이티브가 수신 확인 및 응답
 │  { syn: 1, ack: webId }      │
 │                              │
 ├─ ACK ───────────────────────>│  3. 웹이 최종 확인
 │  { syn: 0, ack: nativeId }   │
 │                              │
 ✓ 연결 완료                    ✓ 연결 완료
```

### 메시지 구조

모든 메시지는 다음 구조를 따릅니다:

```typescript
interface WebviewBridgeMessage<Body> {
  _id: string; // 메시지 고유 ID (랜덤 생성)
  ack: string | null; // 응답 대상 메시지 ID (응답일 경우)
  flag: {
    syn: 0 | 1; // SYN 플래그 (1=SET, 0=RESET)
  };
  body?: Body; // 실제 전달 데이터
}
```

### RWindow (Receive Window)

RWindow는 TCP의 Receive Window를 모방한 콜백 관리 시스템입니다.

- 최대 20개의 대기 중인 메시지 추적
- 메시지 ID별 콜백 함수 저장
- 응답 수신 시 해당 콜백 실행 후 자동 정리

```typescript
// Native에서 메시지 전송
const message = bridge.createMessage({ body: data });
message.send((response) => {
  // 콜백이 RWindow에 등록됨
  console.log(response);
});

// 웹에서 응답 전송
bridge
  .createMessage({
    ack: messageId, // RWindow에서 콜백을 찾아 실행
    body: responseData,
  })
  .send();
```

## 고급 사용법

### TypeScript 제네릭 활용

완전한 타입 안전성을 위해 메시지 타입을 명시하세요:

```typescript
// 메시지 타입 정의
type BridgeMessage =
  | { type: "getLocation"; payload?: never }
  | { type: "openCamera"; payload: { quality: number } }
  | { type: "saveData"; payload: { key: string; value: string } };

type BridgeResponse =
  | { type: "getLocation"; data: { lat: number; lng: number } }
  | { type: "openCamera"; data: { uri: string } }
  | { type: "saveData"; data: { success: boolean } };

// Native
const bridge = usePostMessageBridge<BridgeMessage, BridgeResponse>();

bridge.postMessage({
  message: { type: "getLocation" },
  onResponse: (res) => {
    if (res.type === "getLocation") {
      console.log(res.data.lat); // 타입 체크됨
    }
  },
});

// Web
const { request } = useBridge<BridgeMessage, BridgeResponse>();

request({
  requestMessage: { type: "openCamera", payload: { quality: 0.9 } },
  responseCallback: (res) => {
    if (res.type === "openCamera") {
      console.log(res.data.uri); // 타입 체크됨
    }
  },
});
```

### Strict Mode

Strict mode는 응답이 없을 때의 동작을 제어합니다.

**Native (WebviewWithBridge)**

```typescript
// strictMode: true (기본값) - 에러 throw
<WebviewWithBridge
  strictMode={true}
  onBridgeMessage={(message) => {
    // 응답을 반드시 반환해야 함
    return { success: true };
  }}
/>

// strictMode: false - 경고만 출력
<WebviewWithBridge
  strictMode={false}
  onBridgeMessage={(message) => {
    // 응답 없어도 에러 발생 안 함 (콘솔 경고만)
    if (message.type === 'ping') {
      return { pong: true };
    }
    // undefined 반환 시 경고만
  }}
/>
```

**Web (BridgeRequestListener)**

```typescript
// strictMode: false (기본값) - 경고만
<BridgeRequestListener
  strictMode={false}
  onRequest={(message) => {
    // 응답 선택적
  }}
/>

// strictMode: true - 에러 throw
<BridgeRequestListener
  strictMode={true}
  onRequest={(message) => {
    // 반드시 응답 반환
    return { received: true };
  }}
/>
```

### Middleware 사용

메시지 수신 시 공통 로직을 실행할 수 있습니다:

```typescript
<WebviewWithBridge
  middleware={(message) => {
    // 로깅
    console.log('[Bridge] Received:', message);

    // 분석
    analytics.track('bridge_message', { type: message.type });

    // 주의: middleware는 응답을 반환하지 않습니다
    // 응답은 onBridgeMessage에서만 처리됩니다
  }}
  onBridgeMessage={(message) => {
    return handleMessage(message);
  }}
/>
```

### Request Validator

웹에서 요청 메시지의 유효성을 검증할 수 있습니다:

```typescript
<BridgeRequestListener
  requestValidator={(message) => {
    // 필수 필드 검증
    if (!message?.type) return false;

    // 타입 검증
    const validTypes = ['getLocation', 'openCamera', 'saveData'];
    if (!validTypes.includes(message.type)) return false;

    // 페이로드 검증
    if (message.type === 'saveData') {
      return message.payload?.key !== undefined;
    }

    return true;
  }}
  onRequest={(message) => {
    // 유효성 검증을 통과한 메시지만 도착
    return handleValidMessage(message);
  }}
/>
```

### 비동기 응답 처리

`onBridgeMessage`는 동기/비동기 응답을 모두 지원합니다:

```typescript
<WebviewWithBridge
  onBridgeMessage={async (message) => {
    if (message.type === 'getPhoto') {
      // 비동기 작업
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        return {
          success: true,
          uri: result.assets[0].uri
        };
      }

      return { success: false };
    }

    // 동기 응답
    return { success: true };
  }}
/>
```

## 문제 해결

### 메시지가 전달되지 않아요

**Handshake가 완료되었는지 확인하세요**

```typescript
// Native
<WebviewWithBridge
  onReadyToMessage={() => {
    console.log('Handshake 완료 - 이제 메시지 전송 가능');
  }}
/>
```

Handshake가 완료되기 전에 전송된 메시지는 무시됩니다. `onReadyToMessage` 콜백 이후에 메시지를 전송하세요.

### "RWND_BUFFER is already full" 에러

RWindow는 최대 20개의 대기 메시지만 추적할 수 있습니다. 응답을 받지 못한 메시지가 20개 이상 쌓이면 발생합니다.

**해결 방법:**

- 응답이 필요 없는 메시지는 콜백 없이 전송
- 타임아웃 처리 구현
- 메시지 전송 빈도 조절

```typescript
// 콜백 없이 전송 (RWindow에 등록 안 됨)
message.send();

// 콜백 있이 전송 (RWindow에 등록됨)
message.send((response) => {
  console.log(response);
});
```

### 타입 에러가 발생해요

제네릭 타입을 명시적으로 지정하세요:

```typescript
// Bad
const { request } = useBridge();
request({ requestMessage: { type: "test" } }); // 타입 any

// Good
interface Request {
  type: string;
}
interface Response {
  success: boolean;
}

const { request } = useBridge<Request, Response>();
request({
  requestMessage: { type: "test" }, // 타입 체크됨
  responseCallback: (res) => {
    console.log(res.success); // 자동완성 지원
  },
});
```

### Android에서 메시지가 수신되지 않아요

Android는 `document.addEventListener('message')`를 사용하고, iOS는 `window.addEventListener('message')`를 사용합니다.

`BridgeRequestListener`와 `useBridge`는 이를 자동으로 처리하므로, 직접 리스너를 등록하지 마세요.

### 응답이 없는데 에러가 발생해요

Strict mode를 비활성화하거나, 모든 경우에 응답을 반환하세요:

```typescript
// 옵션 1: Strict mode 비활성화
<WebviewWithBridge strictMode={false} />

// 옵션 2: 모든 경우에 응답 반환
<WebviewWithBridge
  onBridgeMessage={(message) => {
    switch (message.type) {
      case 'ping':
        return { pong: true };
      default:
        return { error: 'Unknown message type' };
    }
  }}
/>
```

## 알려진 제한사항

- **최대 대기 메시지**: RWindow는 최대 20개의 미응답 메시지를 추적합니다
- **Handshake 필수**: 웹뷰가 로드되고 Handshake가 완료되어야 통신 가능합니다
- **JSON 직렬화**: 모든 메시지는 JSON으로 직렬화되므로, 함수나 Symbol은 전달할 수 없습니다
- **단일 WebView**: 하나의 Bridge 인스턴스는 하나의 WebView와만 통신합니다

## 라이선스

이 프로젝트는 산결(Sangyeol) 프로젝트의 일부입니다.
