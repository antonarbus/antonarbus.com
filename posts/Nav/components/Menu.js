// idea is taken from https://www.youtube.com/watch?v=IF6k0uZuypA
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BackItem } from './BackItem'
import { CloseItem } from './CloseItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem } from './NavItem'
import { CSSTransition } from 'react-transition-group'

export const ContextMenu = React.createContext(null)

// calculate height of fake to manually set height to MenuContainer
// we need to manually control height for animation purpose
// unfortunately height: auto is not animated
function calcHeight(el) {
  if (!el) return
  const height = el.offsetHeight
  return height + 85
}

export function Menu() {
  // console.log('Menu')

  const context = useContext(ContextNavItem)
  const {
    openedMenuState,
    menuO,
    showMenuState,
    setShowMenuState,
    setOpenedMenuState,
  } = context

  const [prevMenuState, setPrevMenuState] = React.useState({
    ...menuO.menu,
    navItemId: menuO.id,
    prevMenu: [],
  })
  const [whereToSlidState, setWhereToSlidState] = React.useState('nowhere')
  const [menuTransitionState, setMenuTransitionState] = React.useState(true)
  const swapMenu = () => setMenuTransitionState(!menuTransitionState)
  const swapMenuMemoized = React.useCallback(swapMenu, [setMenuTransitionState,
    menuTransitionState])

  function closeMenu(e) {
    // e?.stopPropagation();
    if (!showMenuState) return
    setShowMenuState(false)
    setOpenedMenuState(null)
    setPrevMenuState(null)
  }

  const closeMenuMemoized = React.useCallback(closeMenu, [
    showMenuState,
    setShowMenuState,
    setOpenedMenuState,
    setPrevMenuState,
  ])

  function changeMenu(o) {
    const isSubMenu = o.menu
    if (!isSubMenu) return
    const subMenu = o.menu
    setPrevMenuState(openedMenuState)
    setOpenedMenuState({
      ...subMenu,
      navItemId: openedMenuState.navItemId,
      prevMenu: [...openedMenuState.prevMenu, openedMenuState],
    })
  }

  function goBack(e) {
    // e?.stopPropagation();
    setWhereToSlidState('forward')
    setPrevMenuState(openedMenuState)
    setOpenedMenuState(openedMenuState.prevMenu.pop())
    swapMenuMemoized()
  }

  const changeMenuMemoized = React.useCallback(goBack, [
    setWhereToSlidState,
    setPrevMenuState,
    openedMenuState,
    setOpenedMenuState,
    swapMenuMemoized,
  ])

  function navKeyboardHandler(e) {
    const { key } = e
    if (!openedMenuState) return
    const isNestedMenu = openedMenuState?.prevMenu?.length > 0
    isNestedMenu && key === 'Backspace' && changeMenuMemoized()
    !isNestedMenu && key === 'Backspace' && closeMenuMemoized()
    key === 'Escape' && closeMenuMemoized()
  }

  const navKeyboardHandlerMemoized = React.useCallback(navKeyboardHandler, [
    openedMenuState,
    changeMenuMemoized,
    closeMenuMemoized,
  ])

  const fakeMenuRef = useRef()
  const menuRef = useRef()

  const [menuHeightState, setMenuHeightState] = useState(calcHeight(fakeMenuRef.current)) // can be 0 if we want slide initial menu

  useEffect(() => {
    setMenuHeightState(calcHeight(fakeMenuRef.current))
    return () => { setMenuHeightState(0) }
  }, [openedMenuState, navKeyboardHandlerMemoized, closeMenuMemoized, setMenuHeightState])

  useEffect(() => {
    window.addEventListener('keydown', navKeyboardHandlerMemoized)
    return () => {
      window.removeEventListener('keydown', navKeyboardHandlerMemoized)
    }
  }, [openedMenuState, navKeyboardHandlerMemoized, closeMenuMemoized, setMenuHeightState])

  useEffect(() => {
    const navItem = menuRef.current.parentElement

    function isClickedElOutsideThisEl(clickedEl, thisEl) {
      return !thisEl.contains(clickedEl)
    }

    function closeModalOnClickOutside(e) {
      const clickedEl = e.target
      if (!navItem) return
      if (isClickedElOutsideThisEl(clickedEl, navItem)) closeMenuMemoized()
    }

    document.addEventListener('mousedown', closeModalOnClickOutside)
    return () => {
      document.removeEventListener('mousedown', closeModalOnClickOutside)
    }
  }, [closeMenuMemoized])

  const isNestedMenu = openedMenuState?.prevMenu?.length > 0
  const menuItemsDivStyle = {
    position: 'absolute',
    right: '0px',
    left: '0px',
    height: 'auto',
  }

  const contextValue = {
    prevMenuState,
    setPrevMenuState,
    whereToSlidState,
    setWhereToSlidState,
    menuTransitionState,
    setMenuTransitionState,
    swapMenu,
    closeMenu,
    changeMenu,
    goBack,
    navKeyboardHandler,
  }

  return (
    <ContextMenu.Provider value={contextValue}>
      <MenuContainer style={{ height: menuHeightState }} ref={menuRef}>
        {isNestedMenu ? <BackItem /> : <CloseItem />}

        {/*
          same principle as in
          https://antonarbus.com/post/slide-sideways-with-csstransition

          we have 2 divs with transition
          one div keeps previous menu items, another keeps current menu items
          one div enters, another exists with transition
          div is unmounted after transition (not necessary actually)
          transitions is triggered via 'in' prop
        */}

        {/* main or previous menu */}
        <CSSTransition
          in={menuTransitionState}
          classNames={whereToSlidState}
          timeout={350}
          unmountOnExit
        >
          <div className={whereToSlidState} style={menuItemsDivStyle}>
            {/* if transition enters, current menu renders
            if transition exists, pervious menu renders */}
            {menuTransitionState &&
              openedMenuState.menuItems.map(menuItem => (
                <MenuItem menuItem={menuItem} key={menuItem.id} />
              ))}
            {!menuTransitionState &&
              prevMenuState?.menuItems.map(menuItem => (
                <MenuItem menuItem={menuItem} key={menuItem.id} />
              ))}
          </div>
        </CSSTransition>

        {/* main or previous menu */}
        <CSSTransition
          in={!menuTransitionState}
          classNames={whereToSlidState}
          timeout={350}
          unmountOnExit
        >
          <div className={whereToSlidState} style={menuItemsDivStyle}>
            {!menuTransitionState &&
              openedMenuState.menuItems.map(menuItem => (
                <MenuItem menuItem={menuItem} key={menuItem.id} />
              ))}
            {menuTransitionState &&
              prevMenuState?.menuItems.map(menuItem => (
                <MenuItem menuItem={menuItem} key={menuItem.id} />
              ))}
          </div>
        </CSSTransition>

        {/* fake div to measure menu height for animation */}
        <div style={{ position: 'absolute', right: '1000px' }} ref={fakeMenuRef}>
          {openedMenuState.menuItems.map(menuItem => (
            <MenuItem menuItem={menuItem} key={menuItem.id} />
          ))}
        </div>
      </MenuContainer>
    </ContextMenu.Provider>
  )
}

export const MenuContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0px;
  width: 300px;
  background: rgb(52 52 52 / 98%);
  backdrop-filter: blur(4px);

  border: 1px solid #474a4d;
  border-radius: 8px;
  overflow: hidden;
  z-index: 666;

  transition-property: height;
  transition-duration: .35s;
  transition-timing-function: ease-out;

  @media screen and (max-width: 480px) {
    left: 0px;
    right: 0px;
    width: auto;
  }

  .forward-appear {
    transform: translateX(-110%);
  }
  .forward-appear-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .forward-appear-done {
    transform: translateX(0%);
  }
  .forward-enter {
    transform: translateX(-110%);
  }
  .forward-enter-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .forward-enter-done {
    transform: translateX(0%);
  }
  .forward-exit {
    transform: translateX(0%);
  }
  .forward-exit-active {
    transform: translateX(110%);
    transition: all 350ms linear;
  }
  .forward-exit-done {
    transform: translateX(110%);
  }

  .backward-appear {
    transform: translateX(110%);
  }
  .backward-appear-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .backward-appear-done {
    transform: translateX(0%);
  }
  .backward-enter {
    transform: translateX(110%);
  }
  .backward-enter-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .backward-enter-done {
    transform: translateX(0%);
  }
  .backward-exit {
    transform: translateX(0%);
  }
  .backward-exit-active {
    transform: translateX(-110%);
    transition: all 350ms linear;
  }
  .backward-exit-done {
    transform: translateX(-110%);
  }
`
