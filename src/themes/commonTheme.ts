import type {DefaultTheme} from 'styled-components/native';

const commonTheme: Pick<DefaultTheme, 'typography' | 'borderRadius'> = {
  typography: {
    h1: {
      fontSize: 40,
      fontFamily: 'SourceSans3-Bold',
    },
    h2: {
      fontSize: 32,
      fontFamily: 'SourceSans3-Bold',
    },
    h3: {
      fontSize: 28,
      fontFamily: 'SourceSans3-Bold',
    },
    h4: {
      fontSize: 24,
      fontFamily: 'SourceSans3-Bold',
    },
    h5: {
      fontSize: 20,
      fontFamily: 'SourceSans3-Bold',
    },
    h6: {
      fontSize: 16,
      fontFamily: 'SourceSans3-Bold',
    },
    lead: {
      fontSize: 14,
      fontFamily: 'SourceSans3-Bold',
    },
    body: {
      fontSize: 16,
      fontFamily: 'SourceSans3-Regular',
    },
    bodySmall: {
      fontSize: 14,
      fontFamily: 'SourceSans3-Regular',
    },
    blockquote: {
      fontSize: 20,
      fontFamily: 'SourceSans3-SemiBold',
    },
    small: {
      fontSize: 12,
      fontFamily: 'SourceSans3-Regular',
    },
    tiny: {
      fontSize: 10,
      fontFamily: 'SourceSans3-SemiBold',
    },
  },
  borderRadius: {
    br20: '20px',
    br10: '10px',
  },
};

export default commonTheme;
