# Stack-Link

Next.js 웹 애플리케이션에서 **네이티브 앱과 같은 부드러운 페이지 전환**을 제공하는 네비게이션 최적화 라이브러리입니다.

[🔗 blog post](https://geongyu09.github.io/post/appLikeWeb/)

## 특징

- 🚀 **즉시 페이지 전환** - Iframe 기반 미리 렌더링으로 클릭 즉시 페이지 표시
- ✨ **부드러운 애니메이션** - CSS Transform을 이용한 60fps 슬라이딩/페이드 애니메이션
- 👆 **제스처 기반 뒤로가기** - 화면 왼쪽 엣지 스와이프로 뒤로가기
- ⚡ **성능 최적화** - Next.js Prefetch와 연동한 데이터 미리 로딩
- 🎯 **타입 안전성** - TypeScript 완벽 지원

## 배경

### 웹의 네비게이션 문제

전통적인 웹 네비게이션은 다음과 같은 사용성 문제를 가지고 있습니다:

```
클릭 → 이전 화면 잠시 보임 → 빈 화면 (로딩) → 컨텐츠 표시
```

특히 웹뷰 환경에서는 이러한 문제가 더욱 치명적입니다:

- 페이지 전환마다 **흰 화면**이 노출됨
- iOS에서 **뒤로가기 제스처가 없음**
- 앱에 비해 **끊기는 사용자 경험**

### 시도했던 해결책과 한계

#### 앱이 모든 네비게이션 담당

모든 화면을 별도의 WebView로 띄우고, 앱이 네비게이션을 관리하는 방식을 시도했습니다.

**장점:**

- ✅ 앱과 같은 부드러운 화면 전환
- ✅ 네이티브 뒤로가기 제스처 지원

**치명적인 단점:**

- ❌ **방대한 브리지 로직 필요** - 모든 페이지, 쿼리 파라미터, 동적 라우트마다 브리지 구현
- ❌ **캐싱 이점 손실** - 각 WebView가 독립적이라 localStorage, sessionStorage, TanStack Query 캐시 등을 공유할 수 없음
- ❌ **성능 문제** - 화면 전환마다 HTML, CSS, JS를 새로 로드하여 메모리 사용량 증가

### Stack-Link의 해결 방법

웹의 장점(캐싱, 단일 브라우저 컨텍스트)과 앱의 장점(부드러운 전환, 제스처)을 모두 가져오려고 하였습니다. 웹이지만, 앱과 같은 화면 전환 경험을 제공하는 것이 목표입니다.

- **단일 WebView** - 브라우저 컨텍스트 공유로 캐싱 이점 유지
- **Iframe 미리 렌더링** - 다음 페이지를 화면 밖에서 렌더링하여 즉시 전환
- **CSS Transform 애니메이션** - GPU 가속으로 부드러운 전환
- **제스처 지원** - 엣지 스와이프로 앱과 같은 뒤로가기
- **Next.js 네이티브** - App Router와 완벽하게 통합

## 설치

```bash
// work in progress
```

**Peer Dependencies:**

- `next` ^15.3.0
- `react` ^19.0.0
- `react-dom` ^19.0.0

## 빠른 시작

### 1. Provider 설정

루트 레이아웃에 `StackLinkProvider`를 추가합니다.

```tsx
// app/layout.tsx
import { StackLinkProvider } from "stack-link";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StackLinkProvider>{children}</StackLinkProvider>
      </body>
    </html>
  );
}
```

### 2. StackLink 컴포넌트 사용

기존 Next.js Link를 StackLink로 교체합니다.

```tsx
import { StackLink } from "stack-link";

export default function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <StackLink
            href={`/product/${product.id}`}
            preLoad // 페이지 미리 렌더링
          >
            <ProductCard product={product} />
          </StackLink>
        </li>
      ))}
    </ul>
  );
}
```

### 3. 뒤로가기 버튼 구현

```tsx
import { useStackLinkBack } from "stack-link";

export default function BackButton() {
  const { goBack, canGoBack } = useStackLinkBack();

  return (
    <button
      onClick={() => goBack({ animation: "slide" })}
      disabled={!canGoBack}
    >
      뒤로가기
    </button>
  );
}
```

## API

### StackLinkProvider

애플리케이션의 루트에 위치하여 페이지 전환 관리를 담당합니다.

```tsx
interface StackLinkProviderProps {
  children: React.ReactNode;
  onGoBack?: (history: PathTuple[]) => void;
}
```

#### Props

| Prop       | Type                             | 설명                                  |
| ---------- | -------------------------------- | ------------------------------------- |
| `children` | `ReactNode`                      | 자식 컴포넌트                         |
| `onGoBack` | `(history: PathTuple[]) => void` | 뒤로가기 시 호출되는 콜백 함수 (선택) |

### StackLink

선언적 방식으로 페이지 전환을 처리하는 컴포넌트입니다.

```tsx
interface StackLinkProps {
  href: string;
  children: React.ReactNode;
  preLoad?: boolean;
  duration?: number;
  animation?: "slide" | "fade" | "none";
}
```

#### Props

| Prop        | Type                          | Default   | 설명                          |
| ----------- | ----------------------------- | --------- | ----------------------------- |
| `href`      | `string`                      | -         | 이동할 경로 (필수)            |
| `children`  | `ReactNode`                   | -         | 클릭 가능한 자식 요소 (필수)  |
| `preLoad`   | `boolean`                     | `false`   | 페이지를 미리 렌더링할지 여부 |
| `duration`  | `number`                      | `280`     | 애니메이션 지속 시간 (ms)     |
| `animation` | `'slide' \| 'fade' \| 'none'` | `'slide'` | 애니메이션 타입               |

#### 애니메이션 타입

- **`slide`** (기본값): 좌우 슬라이딩 애니메이션
- **`fade`**: 페이드 인/아웃 애니메이션
- **`none`**: 애니메이션 없이 즉시 전환

#### 예시

```tsx
// 기본 사용
<StackLink href="/about">
  <span>About</span>
</StackLink>

// 페이지 미리 렌더링
<StackLink href="/product/123" preLoad>
  <ProductCard />
</StackLink>

// 애니메이션 없이 즉시 전환
<StackLink href="/search" animation="none">
  <SearchButton />
</StackLink>

// 페이드 애니메이션 + 커스텀 지속 시간
<StackLink
  href="/gallery"
  animation="fade"
  duration={400}
>
  <GalleryCard />
</StackLink>
```

### useStackLinkRouter

프로그래매틱 방식으로 페이지 전환을 처리하는 Hook입니다.

```tsx
function useStackLinkRouter(props: { prefetchHref?: string | null }): {
  navigate: (params: {
    href: string;
    animation?: "slide" | "fade" | "none";
  }) => void;
  isNavigating: boolean;
};
```

#### 파라미터

| Prop           | Type             | 설명                           |
| -------------- | ---------------- | ------------------------------ |
| `prefetchHref` | `string \| null` | 미리 로딩할 페이지 경로 (선택) |

#### 반환값

| 속성           | Type       | 설명                  |
| -------------- | ---------- | --------------------- |
| `navigate`     | `Function` | 페이지 전환 함수      |
| `isNavigating` | `boolean`  | 현재 전환 중인지 여부 |

#### 예시

```tsx
import { useStackLinkRouter } from "stack-link";

export default function SearchResults() {
  const { navigate } = useStackLinkRouter({
    prefetchHref: "/search/default", // 미리 로딩
  });

  const handleResultClick = (id: string) => {
    navigate({
      href: `/product/${id}`,
      animation: "none", // 즉시 전환
    });
  };

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id} onClick={() => handleResultClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### useStackLinkBack

뒤로가기 기능을 제공하는 Hook입니다.

```tsx
function useStackLinkBack(): {
  goBack: (params: { animation?: "slide" | "fade" | "none" }) => void;
  canGoBack: boolean;
};
```

#### 반환값

| 속성        | Type       | 설명                        |
| ----------- | ---------- | --------------------------- |
| `goBack`    | `Function` | 뒤로가기 함수               |
| `canGoBack` | `boolean`  | 뒤로갈 페이지가 있는지 여부 |

#### 예시

```tsx
import { useStackLinkBack } from "stack-link";

export default function DetailPage() {
  const { goBack, canGoBack } = useStackLinkBack();

  const handleBack = () => {
    if (!canGoBack) {
      // 스택이 비어있으면 홈으로 이동
      router.push("/");
      return;
    }

    goBack({ animation: "slide" });
  };

  return (
    <div>
      <button onClick={handleBack}>뒤로가기</button>
      {/* 페이지 내용 */}
    </div>
  );
}
```

### isInStackFrame

현재 페이지가 Stack-Link의 Iframe 내부에서 실행 중인지 확인하는 유틸리티 함수입니다.

```tsx
function isInStackFrame(): boolean;
```

#### 예시

```tsx
import { isInStackFrame } from "stack-link";

export default function MyComponent() {
  const inFrame = isInStackFrame();

  if (inFrame) {
    // Iframe 내부에서만 실행할 로직
    return <PreviewMode />;
  }

  return <NormalMode />;
}
```

## 작동 원리

### 페이지 구조

StackLinkProvider는 다음과 같은 3개의 주요 영역을 생성합니다:

```
┌─────────────────────────────────────┐
│  #stack-main (현재 페이지)           │
│  - 사용자가 보는 실제 콘텐츠          │
│  - z-index: 기본                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  #stack-root (다음 페이지)           │
│  - Portal로 렌더링                   │
│  - translateX(100%) 위치             │
│  - z-index: 999                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  #stack-previous (이전 페이지)       │
│  - Iframe으로 렌더링                 │
│  - translateX(-20%) 위치             │
│  - z-index: -1                       │
└─────────────────────────────────────┘
```

### 페이지 전환 플로우

#### 1. 앞으로 가기 (Forward)

```
사용자 클릭
    ↓
preLoad된 경우: Iframe에 이미 렌더링됨
    ↓
애니메이션 시작
  - main: translateX(0) → translateX(-20%)
  - next: translateX(100%) → translateX(0%)
    ↓
280ms 애니메이션
    ↓
router.push(href) 실행
    ↓
히스토리 스택 업데이트
  push([currentPath, nextPath])
    ↓
완료
```

#### 2. 뒤로 가기 (Backward)

```
goBack() 호출 또는 엣지 스와이프
    ↓
애니메이션 시작
  - main: translateX(0) → translateX(100%)
  - previous: translateX(-20%) → translateX(0%)
    ↓
280ms 애니메이션
    ↓
router.back() 실행
    ↓
히스토리 스택에서 제거
  pop()
    ↓
완료
```

### 제스처 기반 뒤로가기

화면 왼쪽 엣지(40px)를 드래그하여 뒤로갈 수 있습니다:

- **50px 이상 드래그**: 뒤로가기 실행
- **50px 미만**: 원래 위치로 복귀
- 드래그 중 이전 페이지 미리보기 표시

## 성능 최적화

### 1. Iframe 기반 미리 렌더링

```tsx
<StackLink href="/product/123" preLoad>
  {/* 클릭 전에 이미 페이지가 렌더링됨 */}
</StackLink>
```

- 다음 페이지를 화면 밖(`translateX(100%)`)에서 미리 렌더링
- 클릭 시 이미 렌더링된 페이지가 슬라이드되어 **즉시 표시**
- 페이지 로딩 대기 시간 **0ms**

### 2. CSS Transform 사용

```tsx
element.style.transform = "translateX(-20%)";
element.style.willChange = "transform";
```

- GPU 하드웨어 가속 적용
- Reflow/Repaint 발생하지 않음

### 3. Next.js Prefetch 연동

```tsx
const { navigate } = useStackLinkRouter({
  prefetchHref: "/product/default",
});
```

- `router.prefetch()`로 데이터 미리 로딩
- 페이지 전환 시 데이터 로딩 대기 없음

### 4. Portal 패턴

```tsx
createPortal(<NextPage />, document.getElementById("stack-root"));
```

- React Portal로 DOM 구조 최적화
- 레이아웃 시프트 방지
- 메모리 효율적 관리

## 고급 사용법

### 조건부 네비게이션

```tsx
const { navigate } = useStackLinkRouter({});

const handleSubmit = async (data) => {
  const result = await submitForm(data);

  if (result.success) {
    navigate({
      href: "/success",
      animation: "fade",
    });
  } else {
    navigate({
      href: "/error",
      animation: "none",
    });
  }
};
```

### 히스토리 스택 활용

```tsx
<StackLinkProvider
  onGoBack={(history) => {
    console.log("현재 히스토리:", history);
    // 분석 이벤트 전송, 로깅 등
  }}
>
  {children}
</StackLinkProvider>
```

### 다중 애니메이션 조합

```tsx
// 목록 → 상세: 슬라이드
<StackLink href="/detail" animation="slide">
  <Card />
</StackLink>

// 탭 전환: 페이드
<StackLink href="/tab2" animation="fade">
  <TabButton />
</StackLink>

// 검색 결과: 즉시 전환
<StackLink href="/search" animation="none">
  <SearchResult />
</StackLink>
```

### WebView-Native 브릿지 연동

```tsx
import { useStackLinkBack } from "stack-link";

export default function BackButton() {
  const { goBack, canGoBack } = useStackLinkBack();
  const nativeGoBack = useNativeBridge(); // 네이티브 브릿지

  const handleBack = () => {
    if (!canGoBack) {
      // 스택이 비었으면 네이티브 앱에 알림
      nativeGoBack();
      return;
    }

    goBack({ animation: "slide" });
  };

  return <button onClick={handleBack}>뒤로</button>;
}
```

## 타입 정의

```typescript
// 경로 튜플: [현재 경로, 이동할 경로]
type PathTuple = [string, string];

// 스택 컨텍스트
interface StackContextType {
  history: PathTuple[];
  push: (path: PathTuple) => void;
  pop: () => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  handleGoBack: () => void;
}

// StackLink 파라미터
interface StackLinkParams {
  href: string;
  duration?: number;
  preLoad?: boolean;
  animation?: "slide" | "none" | "fade";
}
```

## 제한사항

### 1. iframe 샌드박스

미리 렌더링된 페이지는 iframe 내부에서 실행되므로 다음 제한사항이 있습니다:

- `window.top`과 `window.self`가 다름
- 별도 컨텍스트를 사용하므로, 상태 공유 불가

해결 방법: `isInStackFrame()` 유틸리티로 iframe 환경 감지

```tsx
import { isInStackFrame } from "stack-link";

if (!isInStackFrame()) {
  // 일반 환경에서만 실행
  trackPageView();
}
```

별도로 iframe 환경을 감지해 처리해야 합니다.

### 2. SSR/SSG 페이지

Stack-Link는 클라이언트 사이드 전환만 담당합니다. 서버 사이드 렌더링은 Next.js의 기본 동작을 따릅니다.

### 3. 메모리 관리

`preLoad={true}` 사용 시 페이지가 미리 렌더링되어 메모리를 사용합니다. 많은 링크에 `preLoad`를 사용하면 메모리 사용량이 증가할 수 있습니다.

권장사항:

- 중요한 페이지에만 `preLoad` 사용
- 목록의 모든 아이템이 아닌 상위 3-5개만 preLoad

## 라이선스

MIT
