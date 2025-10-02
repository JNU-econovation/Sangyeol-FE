---
sourcePath: "src/api/v1/users/profile/image/index.ts"
---

프로필 이미지를 삭제합니다

## Signature

```typescript
const deleteProfileImage: (instance: AxiosInstance) => Promise<any>;
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
    <p class="post-parameters--description">삭제 결과</p>
  </li>
</ul>

## Examples


await deleteProfileImage(axiosInstance);
