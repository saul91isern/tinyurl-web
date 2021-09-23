import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Table } from "semantic-ui-react";

export const Links = ({ links }) => {
  const baseURL = process.env.REACT_APP_API_HOST;
  return _.isEmpty(links) ? (
    <Message
      icon="question"
      header="No results found"
      content="Maybe you want shorten a new url first."
    />
  ) : (
    <Table celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Complete Url</Table.HeaderCell>
          <Table.HeaderCell>Shortened Url</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {links.map(({ url, hash }, key) => (
          <Table.Row key={key}>
            <Table.Cell>{url}</Table.Cell>
            <Table.Cell>{`${baseURL}/${hash}`}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

Links.propTypes = {
  links: PropTypes.array,
};

const mapStateToProps = ({ links }) => ({
  links,
});

export default connect(mapStateToProps)(Links);
