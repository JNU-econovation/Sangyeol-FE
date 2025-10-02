---
sourcePath: "src/api/v1/users/alert/index.ts"
---

사용자의 알림 설정을 수정합니다

## Signature

```typescript
const putAlert: (instance: AxiosInstance, body: GetAlertResponse) => Promise<any>;
```

### Parameters

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">instance</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">Axios 인스턴스</p>
  </li>
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">body</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">변경할 알림 설정</p>
  </li>
</ul>

### Returns

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">수정된 알림 설정</p>
  </li>
</ul>

## Examples


await putAlert(axiosInstance, {
  eventAlert: true,
  travelRecordCountAlert: false,
  travelDeviationAlert: true,
  accidentProneAreaAlert: true
});
