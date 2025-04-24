import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      text: string;
      textSecondary: string;
      error: string;
    }
  }
}
