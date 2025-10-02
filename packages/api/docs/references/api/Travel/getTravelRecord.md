---
sourcePath: "src/api/v1/travel/records/index.ts"
---

특정 년월의 산행 기록을 조회합니다

## Signature

```typescript
const getTravelRecord: (instance: AxiosInstance, { year, month }: { year: number; month: number }) => Promise<import("/Users/baggeongyu/Documents/Coding/sangyeol/packages/api/src/api/v1/travel/records/index").GetTravelRecordsResponse>;
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
    <p class="post-parameters--description">산행 기록 목록</p>
  </li>
</ul>

## Examples


const result = await getTravelRecord(axiosInstance, { year: 2024, month: 10 });
console.log(result.records);
