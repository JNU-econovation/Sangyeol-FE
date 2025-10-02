---
sourcePath: "src/api/v1/travel/records/index.ts"
---

산행 기록 조회 API 경로를 생성하는 함수

## Signature

```typescript
const TRAVEL_RECORDS_API_PATH: ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => string;
```

### Parameters

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">params</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">조회 파라미터</p>
    <ul class="post-parameters-ul">
  <li class="post-parameters-li ">
    <span class="post-parameters--name">year</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">년도</p>
  </li>
  <li class="post-parameters-li ">
    <span class="post-parameters--name">month</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">월 (1-12)</p>
  </li>
    </ul>
  </li>
</ul>

### Returns

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">API 경로 문자열</p>
  </li>
</ul>
