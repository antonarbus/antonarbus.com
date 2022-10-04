import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import React from 'react'
import { MenuText } from './MenuText'
import { Icon } from './Icon'
import { ContextMenu } from './Menu'

export function MenuItem(props) {
  // console.log('MenuItem')
  const { setWhereToSlidState, swapMenu, changeMenu } = React.useContext(ContextMenu)
  const { menuItem } = props

  return (
    <MenuLink
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        const isSubMenu = !!menuItem.menu
        if (!isSubMenu) return
        setWhereToSlidState('backward')
        swapMenu()
        changeMenu(menuItem)
      }}
    >
      <LeftPart>
        <Icon>{menuItem.iconLeft}</Icon>
        <MenuText>{menuItem.text}</MenuText>
      </LeftPart>

      {
        // show right arrow only if sub-menu exists
        menuItem.menu && (
          <RightPart>
            <MenuIconRight>
              <ForwardIcon />
            </MenuIconRight>
          </RightPart>
        )
      }
    </MenuLink>
  )
}

// var may fix the error 'styled component hot-update Cannot access before initialization'
export const MenuLink = styled.a`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0px 16px;
  color: #dadce1;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background-color: #525357;
  }
`

export const LeftPart = styled.span`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`

const RightPart = styled.span`
  margin-left: 40px;
`

const MenuIconRight = styled(Icon)`
  background-color: transparent;
  margin-right: -5px;
`
