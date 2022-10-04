import React from 'react'
import styled from 'styled-components'
import { MenuText } from './MenuText'
import { Icon } from './Icon'
import { LeftPart, MenuLink } from './MenuItem'
import { IoClose } from 'react-icons/io5'
import { ContextMenu } from './Menu'

const closeIcon = React.createElement(IoClose, {})

const CloseLink = styled(MenuLink)`
  color: #858383;
  animation: none;
  margin: 0px 16px;
  margin-top: 16px;
`

export function CloseItem() {
  // console.log('CloseItem')
  const { closeMenu } = React.useContext(ContextMenu)

  return (
    <CloseLink
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        closeMenu()
      }}
    >
      <LeftPart>
        <Icon>{closeIcon}</Icon>
        <MenuText>Close</MenuText>
      </LeftPart>
    </CloseLink>
  )
}
