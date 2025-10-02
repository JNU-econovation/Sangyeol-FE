---
sourcePath: "src/api/v1/travel/records/[recordId]/details/index.ts"
---

산행 기록의 상세 정보를 조회합니다 (GPS 좌표 포함)

## Signature

```typescript
const getTravelRecordDetails: (instance: AxiosInstance, { recordId }: { recordId: string }) => Promise<import("/Users/baggeongyu/Documents/Coding/sangyeol/packages/api/src/api/v1/travel/records/[recordId]/details/index").GetTravelRecordsResponse>;
```

### Parameters

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">instance</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">Axios 인스턴스</p>
  </li>
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">params</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">조회 파라미터</p>
    <ul class="post-parameters-ul">
  <li class="post-parameters-li ">
    <span class="post-parameters--name">recordId</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">기록 ID</p>
  </li>
    </ul>
  </li>
</ul>

### Returns

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">산행 기록 상세 정보</p>
  </li>
</ul>

## Examples


const result = await getTravelRecordDetails(axiosInstance, { recordId: "record123" });
console.log(result.records[0].coordinates); // GPS 경로
