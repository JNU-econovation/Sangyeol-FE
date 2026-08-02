import { getPathToRoute } from './index';

describe('getPathToRoute', () => {
  it('파라미터 없이 올바른 경로를 반환해야 함', () => {
    const result = getPathToRoute({ path: 'course-detail' });
    expect(result).toBe('/(tabs)/map/course');
  });

  it('파라미터와 함께 올바른 경로를 반환해야 함', () => {
    const result = getPathToRoute({ 
      path: 'manual-detail', 
      params: [{ manual: 'safety-guide' }] 
    });
    expect(result).toBe('/(tabs)/home/safeManual/safety-guide');
  });

  it('다중 파라미터를 처리해야 함', () => {
    const result = getPathToRoute({ 
      path: 'manual-detail', 
      params: [{ manual: 'guide-1' }, { other: 'value' }] 
    });
    expect(result).toBe('/(tabs)/home/safeManual/guide-1');
  });

  it('잘못된 경로에 대해 에러를 발생시켜야 함', () => {
    expect(() => {
      getPathToRoute({ path: 'invalid-path' as any });
    }).toThrow('Path not found for key: invalid-path');
  });

  it('빈 파라미터 배열을 처리해야 함', () => {
    const result = getPathToRoute({ 
      path: 'course-detail', 
      params: [] 
    });
    expect(result).toBe('/(tabs)/map/course');
  });

  it('숫자 파라미터를 문자열로 변환해야 함', () => {
    const result = getPathToRoute({ 
      path: 'manual-detail', 
      params: [{ manual: 123 }] 
    });
    expect(result).toBe('/(tabs)/home/safeManual/123');
  });
});