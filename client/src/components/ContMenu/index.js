import React from 'react';
import { ContextMenu, MenuItem } from "react-contextmenu";
import styled from '@emotion/styled';
import Text from 'components/Text'
import Icon from 'components/Icon'

const MenuWrap = ({ children, ...rest}) => (
  <ContextMenu {...rest}>{children}</ContextMenu>
)

const Menu = styled(MenuWrap)`
  background: white;
  border-radius:5px;
  min-width:150px;
  max-width:250px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
`;

const MenuTitle = styled.div`
  padding:0.3em;
  border-bottom: 1px solid #d3d3d3;;
`

const InnerItem = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-around;
  user-select:none;
  cursor: pointer;
  padding: 0.3em;
  color:#bfbaba;
  &:hover { 
    color: #333;
  }
`

const ContMenu = ({ id, title, menus }) => {
  // console.log(menus)
  return (
    <Menu id={id}>
      <MenuTitle>
        <Text bold={1} truncate={1}>{title}</Text>
      </MenuTitle>
      {menus.map(menu => (
        <MenuItem 
          key={menu.id} 
          preventClose 
          onClick={menu.action}
        >
          <InnerItem>
            {menu.icon && <Icon icon={menu.icon}  color='inherit'/>}
            <Text flex color='inherit'>
              {menu.content}
            </Text>
          </InnerItem>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default ContMenu;