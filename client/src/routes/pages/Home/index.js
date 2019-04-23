import React from 'react';
import styled from '@emotion/styled';
import TeamPanel from './TeamPanel'
import BoardPanel from "./BoardPanel";



const HomeWrapper = styled.div`
  display:flex;
  // border:1px solid black;
  justify-content: center;
  align-items:center;
  padding: 1.5em;
  margin-top:48px;
`

const PanelContainer = styled.div`
  display: flex;
  max-width: 1200px;
  // border: 1px solid red;
  width:100%;
`;
const Home = ({ init }) => {
  const { user, teams, boards } = init
  return(
    <HomeWrapper>
      <PanelContainer>
        <TeamPanel teams={teams} user={user}/>
        <BoardPanel teams={teams} boards={boards} user={user}/>
      </PanelContainer>
    </HomeWrapper>    
  )
}

export default Home;