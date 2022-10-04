import styled from 'styled-components'

export const Icon = styled.span`
  width: ${60 * 0.5}px;
  height: ${60 * 0.5}px;
  background-color: #484a4d;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  color: #dadce1;

  svg {
    fill: #dadce1;
    width: 20px;
    height: 20px;
    margin-top: 1px;
  }

  &:hover {
    /* filter: brightness(1.2); */
  }
`
