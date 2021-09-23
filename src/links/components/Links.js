import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Table } from "semantic-ui-react";

export const Links = ({ links }) => {
  return _.isEmpty(links) ? (
    <Message
      icon="warning circle"
      header="No results found"
      content="Maybe you want shorten a new url first."
    />
  ) : (
    <Table basic="very" celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Complete Url</Table.HeaderCell>
          <Table.HeaderCell>Hash</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {links.map(({ url, hash }, key) => (
          <Table.Row key={key}>
            <Table.Cell>{url}</Table.Cell>
            <Table.Cell>{hash}</Table.Cell>
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
