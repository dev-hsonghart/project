import 'styled-components';

// 1. 내가 만든 theme의 구조를 가져옵니다.
import { light, dark } from './theme';

// 2. lightTheme의 타입을 추출합니다.
type ThemeType = typeof light;

// 3. styled-components의 기본 테마 타입을 확장합니다.
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
