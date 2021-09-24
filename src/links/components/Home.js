import React from "react";
import {
  Container,
  Icon,
  Header,
  Grid,
  Menu,
  Segment,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Links from "./Links";
import LinkForm from "./LinkForm";
import Alert from "./Alert";

export const Home = ({ loading }) => (
  <>
    <Menu attached="top">
      <Menu.Item header>
        <Icon name="world" size={"big"} /> My first url shortener
      </Menu.Item>
    </Menu>
    <Container text style={{ marginTop: "40px" }}>
      <Alert />
    </Container>
    <Container fluid style={{ marginTop: "40px" }}>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign={"center"}>
            <Header as="h2">
              URL Shortener
              <Header.Subheader>
                Manage and simplify your urls.
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment placeholder loading={loading}>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column verticalAlign={"middle"}>
              <Links />
            </Grid.Column>
            <Grid.Column verticalAlign={"middle"}>
              <Container textAlign="center">
                <Header icon>
                  <Icon name="world" />
                  Add New Url
                </Header>
              </Container>
              <Container>
                <LinkForm />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  </>
);

Home.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = ({ createLinkLoading, linksLoading }) => ({
  loading: createLinkLoading || linksLoading,
});

export default connect(mapStateToProps)(Home);
