import React, { useState } from "react";
import styled from '@emotion/styled';
import GridContainer from './GridContainer'
import Modal from 'react-modal'
import BoardAdder from '../BoardAdder'
import TeamTitle from './GridContainer/TeamTitle'

const PanelContainer = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  postion: fixed;
  // border: 1px solid blue;
  padding: 0 0.5em;
`;

const GridTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
  font-family: Oxygen, sans-serif;
  border-bottom: 1px solid #d3d3d3;
`;

Modal.setAppElement('#root')
const BoardPanel = ({ teams, boards, user }) => {
  const [adderOpen, toggleAdder] = useState(undefined)
  const _toggleAdder = val => toggleAdder(val)
  return (
    <React.Fragment>
      <PanelContainer>
        <React.Fragment>
          <GridTitle>Personal</GridTitle>
          <GridContainer
            ids={boards.personalIds}
            data={boards.personals}
            handleAdder={_toggleAdder}
            target="personal"
          />
        </React.Fragment>
        {teams.byId.map(id => {
          const teamBoardById = boards.teamIds.filter(info => info.id.split("@")[1] === id)
          return (
            <React.Fragment key={id}>
              <GridTitle>
                <TeamTitle 
                  value={teams.teams[id].name}
                  reference={{
                    id: id
                  }}
                  visible={teamBoardById.length ? false : true}
                />
              </GridTitle>
              <GridContainer
                ids={teamBoardById}
                data={boards.teams}
                handleAdder={_toggleAdder}
                target={id}
              />
            </React.Fragment>
          );
        })}
      </PanelContainer>
      {adderOpen !== undefined && (
        <Modal
          isOpen={adderOpen !== undefined}
          contentLabel="Board Adder"
          onRequestClose={() => toggleAdder(undefined)}
          className="modal adderDetail"
          overlayClassName="overlay"
        >
          <BoardAdder
            user={user}
            target={adderOpen}
            onClose={() => toggleAdder(undefined)}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default BoardPanel;
