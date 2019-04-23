import React from 'react';
import Grid from 'components/Grid'
import Card from 'components/Card'
import { Link } from 'react-router-dom'
import slugify from 'slugify'
import Text from 'components/Text'


const GridContainer = ({ ids, data, handleAdder, target }) => {
  return (
    <Grid itemWidth={200} justify='center'>
      {ids.map(info => {
        return (
            <Card
              direction="column"
              key={info.id}
              justify='center'
              align='center'
              width={200}
              height={75}
              shadow={4}
              background={data[info.id].color}
              as={Link}
              to={{
                pathname: `/b/${data[info.id].sid}/${slugify(
                  data[info.id].title
                )}`,
                state: {
                  boardId: `${data[info.id].sid}`,
                  boardType: `${data[info.id].type}`
                }
              }}
            >
              <Text color="#fff">{data[info.id].title}</Text>
            </Card>
        );
      })}
      <Card
        width={200}
        height={75}
        shadow={4}
        clickable
        justify="center"
        align="center"
        onClick={() => handleAdder(target)}
      >
        +
      </Card>
    </Grid>
  );
}



export default GridContainer;