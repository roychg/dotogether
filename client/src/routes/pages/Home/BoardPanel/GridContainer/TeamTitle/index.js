import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import AutosizeInput from "react-input-autosize";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";
import { update_team, remove_team } from "redux/modules/teams";
import { isValid } from "utils/helpers";
import Icon from 'components/Icon'
import { FiTrash2, FiCheckSquare } from 'react-icons/fi'

const Form = styled.form`
  min-height: 30px;
  display:flex;
  align-items:center;
`;

const Close = styled.div`
  display:flex;
  color:#eee;
  cursor:pointer;
  position:relative;
  ${props => props.isOpen &&`
    color:#aaa;
  `}
`

const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 30px;
  &:hover {
    .remove-icon {
      color: #aaa;
    }
  }
`;

const Title = styled.div`
  display: flex;
  font-size: 1.2em;
  cursor: pointer !important;
  flex-shrink: 0;
`;

const MenuWrapper = styled.div`
  position: absolute;
  left: -400%;
  min-width: 100px;
  display: flex;
  align-items:center;
`;

const Menu = styled.div`
  display:flex;
  min-width:50px;
  justify-content:space-around;
  font-size:1.3em;
  &:hover { 
    div { 
      color: green;
    }
  }
`

const TeamTitle = ({ value, reference, update_team,remove_team, visible }) => {
  const teamData = { ...reference };
  const [isEditing, setEdit] = useState(false);
  const [val, handleValue] = useState("");
  const [deleteTarget, setTarget] = useState(undefined)

  useEffect(() => {
    handleValue(value);
  }, [value]);

  const _handleValue = e => {
    const { value } = e.target;
    handleValue(value);
  };

  const _revert = () => {
    handleValue(value);
    setEdit(false);
  };

  const _handleSubmit = async e => {
    e.preventDefault();

    const isTitleValid = isValid(val, value);
    if (isTitleValid) {
      try {
        teamData.name = val;
        await update_team(teamData);
        setEdit(false);
      } catch (err) {
        _revert();
      }
    } else {
      _revert();
    }
  };

  if (isEditing) {
    return (
      <OutsideClickHandler onOutsideClick={_handleSubmit}>
        <Form onSubmit={_handleSubmit}>
          <AutosizeInput
            name=""
            autoFocus
            value={val}
            onChange={_handleValue}
            inputStyle={{ fontSize: "1.2em", padding: 0 }}
          />
        </Form>
      </OutsideClickHandler>
    );
  }
  return (
    <TitleWrapper>
      <Title onClick={() => setEdit(true)}>{value}</Title>
      {visible && 
        <Close
          onClick={() => setTarget(reference.id)}
          isOpen={deleteTarget !== undefined}
        >
          <Icon icon={<FiTrash2 />} color="inherit" className="remove-icon" />
          {(deleteTarget === reference.id) && (
            <MenuWrapper>
              <OutsideClickHandler onOutsideClick={() => setTarget(undefined)}>
                <Menu onClick={()=>remove_team(reference.id)}>
                  <Icon icon={<FiCheckSquare />} size="inherit" color='inherit' />
                </Menu>
              </OutsideClickHandler>
            </MenuWrapper>
          )}
        </Close>
      }
    </TitleWrapper>
  );
};

export default connect(
  null,
  { update_team, remove_team }
)(TeamTitle);
