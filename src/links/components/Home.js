import React from "react";
import { Container, Icon, Header, Grid, Menu } from "semantic-ui-react";
import Links from "./Links";
import LinkForm from "./LinkForm";

const Home = () => (
  <>
    <Menu attached="top"></Menu>

    <Grid columns={2} relaxed='very'>
      <Grid.Column>
        <Links />
      </Grid.Column>
      <Grid.Column>
      <Container textAlign='center'>
        <Header icon>
          <Icon name="world" />
          Add New Country
        </Header>
        </Container>
        <Container>
          <LinkForm />
        </Container>
      </Grid.Column>
    </Grid>
  </>
);

export default Home;
