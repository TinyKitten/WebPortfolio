import 'styled-components';
import { AppPalette } from '../constants/theme';

declare module 'styled-components' {
  type DefaultTheme = AppPalette;
}
