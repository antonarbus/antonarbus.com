import styled from 'styled-components'
import { NavItem } from './NavItem'
import navStructure from '../navStructure'

export default function NavList() {
  // console.log('NavList')
  // show items on navbar where .visible = true
  return (
    <Ul>
      {navStructure.map(
        menuO => menuO.visible && <NavItem menuO={menuO} key={menuO.id} />
      )}
    </Ul>
  )
}

const Ul = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
`
