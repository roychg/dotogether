import React, { useState } from 'react';
import styled from '@emotion/styled';
import TeamAdder from './TeamAdder'
import Icon from 'components/Icon'
import { FiPlus } from 'react-icons/fi'

const PanelContainer = styled.div`
  min-width:240px;
  display:flex;
  flex-direction:column;
  postion:fixed;
  padding:0 0.5em;
  @media (max-width:600px) { 
    display:none;
  }
`
const TeamsContainer = styled.ul`
  padding: 0;
  position: relative;
`;

const DefaultList = styled.li`
  list-style: none;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #a3a3a3;
  }
`;

const Header = styled.li`
  font-size: 1.2em;
  list-style: none;
  border-bottom: 1px solid #d3d3d3;
  padding-bottom:0.3em;
`;

const Team = styled(DefaultList)`
  padding: 0.5em 0 0.5em 0.5em;
`;


const Adder = styled(DefaultList)`
  display:flex;
  align-items:center;
  border-top: 1px solid #d3d3d3;
  padding-top:0.3em;
  color:#d3d3d3;
  ${props =>
    props.isOpen &&
    `
    color:#333;
    pointer-events: none;
  `}
`;



const TeamPanel = ({ teams, user }) => {
  const [adderOpen, toggleAdder] = useState(false)

  const _openAdder = () => { toggleAdder(true) }
  const _closeAdder = () => { toggleAdder(false) }

  const { byId, teams: teamInfo } = teams
  return (
    <PanelContainer>
      <TeamsContainer>
        <Header>Teams</Header>
        {byId.map(id => (
          <Team key={id}>{teamInfo[id].name}</Team>
        ))}
        <Adder onClick={_openAdder} isOpen={adderOpen}>
          <Icon icon={<FiPlus/>} right={15} color='inherit'/> Create a team
        </Adder>
        {adderOpen && (
          <TeamAdder onClose={_closeAdder} user={user}/>
        )}
      </TeamsContainer>
    </PanelContainer>
  );
}

export default TeamPanel;