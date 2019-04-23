import React from 'react';
import styled from '@emotion/styled';
import Text from 'components/Text'
import Icon from 'components/Icon'
import { FiRefreshCcw } from 'react-icons/fi'

const Container = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
  background: #F68C76;
  align-items:center;
`;
const ArchiveHandler = ({ isArchived, handleUpdate, reference }) => {
  const taskData = {...reference}

  const _handleUpdate = async e => {
    taskData.isArchived = false
    await handleUpdate(taskData);
  }
  if(isArchived){
    return (
      <Container>
        <Text>This is an archived task</Text>
        <Icon icon={<FiRefreshCcw />} onClick={_handleUpdate} />
      </Container>
    );
  }
  return null
}

export default ArchiveHandler;