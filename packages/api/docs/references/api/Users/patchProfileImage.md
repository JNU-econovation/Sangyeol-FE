---
sourcePath: "src/api/v1/users/profile/image/index.ts"
---

프로필 이미지를 업데이트합니다

## Signature

```typescript
const patchProfileImage: (instance: AxiosInstance, body: GetProfileImageRequest) => Promise<any>;
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
    <p class="post-parameters--description">이미지 URL 정보</p>
  </li>
</ul>

### Returns

<ul class="post-parameters-ul">
  <li class="post-parameters-li post-parameters-li-root">
    <span class="post-parameters--type"></span>
    <br/>
    <p class="post-parameters--description">업데이트 결과</p>
  </li>
</ul>

## Examples


await patchProfileImage(axiosInstance, {
  imageUrl: "https://example.com/profile.jpg"
});
