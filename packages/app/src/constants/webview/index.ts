import { getValueFromSecureStore } from "@utils/secureStore";

export const DISABLED_PINCH_GESTURE = `
(() => {
  // iOS 핀치 줌 방지 - 제스처 이벤트
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  }, {passive: false});
  
  document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
  }, {passive: false});
  
  document.addEventListener('gestureend', function(e) {
    e.preventDefault();
  }, {passive: false});
  
  // 터치 이벤트로 핀치 줌 방지 추가
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300 && e.touches.length > 1) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, {passive: false});
  
  // 더블 탭 확대 방지
  document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, {passive: false});

  // 스크롤 방지
  document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, {passive: false});

  true;
})();
`;

export const DISABLED_TEXT_SELECT = `
(() => {
  document.body.style['user-select'] = 'none';
  document.body.style['-webkit-user-select'] = 'none';
})();
`;

export const DISABLED_SCROLL = `
(() => {
  document.body.style.overflow = 'hidden';
})();
`;

export const SET_VIEWPORT_RATE = `
(() => {
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  meta.setAttribute('name', 'viewport');
  document.head.appendChild(meta);
})();
`;

export const INJECT_TOKEN = (accessToken: string, refreshToken: string) => `
(() => {
  try {
    const newAccessToken = ${JSON.stringify(accessToken)};
    const currentAccessToken = localStorage.getItem('accessToken');
    if(!currentAccessToken || newAccessToken !== currentAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
    }

    const newRefreshToken = ${JSON.stringify(refreshToken)};
    const currentRefreshToken = localStorage.getItem('refreshToken');
    if(!currentRefreshToken || currentRefreshToken !== newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
    }
      
    return true;
    
  } catch (error) {
    console.error('[INJECT_TOKEN] 토큰 주입 실패:', error);
    return false;
  }
})();
`;
