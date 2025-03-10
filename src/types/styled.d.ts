import 'styled-components/native';

interface ITypography {
  fontSize: number;
  fontFamily: string;
}

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      backgroundGradient1: string;
      backgroundGradient2: string;
      grey: string;
      light: string;
      pink: string;
      purpleGradient1: string;
      purpleGradient2: string;
      purpleLight: string;
      purpleLighter: string;
      purpleLightest: string;
      placeholder: string;
      placeholderBg: string;
      red: string;
    };
    typography: {
      h1: ITypography;
      h2: ITypography;
      h3: ITypography;
      h4: ITypography;
      h5: ITypography;
      h6: ITypography;
      lead: ITypography;
      body: ITypography;
      bodySmall: ITypography;
      blockquote: ITypography;
      small: ITypography;
      tiny: ITypography;
    };
    borderRadius: {
      br20: string;
      br10: string;
    };
  }
}
