import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import Appbar from "components/Appbar";
import Innerbar from "components/Innerbar";
import Avatar from "components/Avatar";
import Text from "components/Text";
import { Link, withRouter } from 'react-router-dom'
import { getFirstLetter } from "utils/helpers";
import OutsideClickHandler from "react-outside-click-handler";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MenuWrapper = styled.div`
  position:absolute;
  right:0;
`

const Menu = styled.ul`
  background: #e3e3e3;
  border-radius:4px;
  padding: 0.5em;
  margin-top: 5px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
`;

const MenuList = styled.li`
  list-style:none;
  user-select:none;
  cursor:pointer;
`

const Layout = ({ children, loc, handleLogout, user, home, history, ...rest }) => {
  const [menuOpen, toggleMenu] = useState(false)
  const _openMenu = () => { toggleMenu(true)}
  const _closeMenu = () => { toggleMenu(false)}
  // console.log(history)
  const first = user.username ? getFirstLetter(user.username) : localStorage.getItem("_first");
  return (
    <LayoutWrapper className={`layout wrapper ${loc}`}>
      <Appbar position='fixed' home={home}>
        <Innerbar justify="space-between" width={home ? 1200 : 1700}>
          <Text
            fontSize="2em"
            font="lobster two, cursive"
            as={Link}
            to={loc === "demo" ? "/" : `/@${user.username}/boards`}
          >
            do.Together
          </Text>
          <div style={{ position: "relative" }}>
            <Avatar
              clickable
              content={first}
              background="#0D8ABC"
              color="#fff"
              onClick={_openMenu}
            />
            {menuOpen && (
              <MenuWrapper>
                <OutsideClickHandler onOutsideClick={_closeMenu}>
                  <Menu>
                    {
                      loc === 'demo' ? 
                      <MenuList onClick={()=>history.replace('/')}>Home</MenuList>
                      :
                      <MenuList onClick={()=>handleLogout(history)}>Logout</MenuList>
                    }
                  </Menu>
                </OutsideClickHandler>
              </MenuWrapper>
            )}
          </div>
        </Innerbar>
      </Appbar>
      {children}
    </LayoutWrapper>
  );
};

Layout.propTypes = { 
  handleLogout: PropTypes.func,
  loc: PropTypes.string,
  user: PropTypes.object.isRequired
}

Layout.defaultProps = { 
  
}

export default withRouter(Layout)