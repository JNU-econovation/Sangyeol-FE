---
sourcePath: "src/api/v1/users/alert/index.ts"
---

사용자의 알림 설정을 조회합니다

## Signature

```typescript
const getAlert: (instance: AxiosInstance) => Promise<any>;
```

### Parameters

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--name">instance</span><span class="post-parameters--required">Required</span> · <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">Axios 인스턴스</p>
  </li>
</ul>

### Returns

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">알림 설정 정보</p>
  </li>
</ul>

## Examples


const result = await getAlert(axiosInstance);
console.log(result.eventAlert); // true/false
