import styled from 'styled-components/native';

export const StyledInput = styled.TextInput<{isMultiLine?: boolean}>`
  font-size: ${props => props.theme.typography.body.fontSize}px;
  font-family: ${props => props.theme.typography.body.fontFamily};
  color: ${props => props.theme.colors.light};
  flex: 1;
  padding: 0;
  height: ${props => (props.isMultiLine ? '100px' : '40px')};
`;
