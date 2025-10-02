---
sourcePath: "src/api/v1/travel/records/[recordId]/index.ts"
---

산행 기록을 삭제합니다

## Signature

```typescript
const deleteTravelRecord: (instance: AxiosInstance, recordId: string) => Promise<any>;
```

### Parameters

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">instance</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">Axios 인스턴스</p>
  </li>
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">recordId</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">삭제할 기록 ID</p>
  </li>
</ul>

### Returns

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">삭제 결과</p>
  </li>
</ul>

## Examples


await deleteTravelRecord(axiosInstance, "record123");
