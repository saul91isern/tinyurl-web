import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Input, Message, Table } from "semantic-ui-react";
import { deleteLink } from "../routines";

export const Links = ({ deleteLink, links }) => {
  const baseURL = process.env.REACT_APP_API_HOST;
  const copy = (id) => {
    const text = document.getElementById(id).firstChild?.data;
    navigator.clipboard.writeText(text);
  };
  return _.isEmpty(links) ? (
    <Message
      icon="question"
      header="No results found"
      content="Maybe you want shorten a new url first."
    />
  ) : (
    <>
      <Input
        icon={{ name: "search", circular: true }}
        placeholder="Search..."
      />
      <Table celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Complete Url</Table.HeaderCell>
            <Table.HeaderCell>Shortened Url</Table.HeaderCell>
            <Table.HeaderCell>Copy</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {links.map(({ url, hash }, key) => (
            <Table.Row key={key}>
              <Table.Cell>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </Table.Cell>
              <Table.Cell>
                <a
                  id={`link_${key}`}
                  href={`${baseURL}/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${baseURL}/${hash}`}
                </a>
              </Table.Cell>
              <Table.Cell>
                <Icon name={"copy"} link onClick={() => copy(`link_${key}`)} />
              </Table.Cell>
              <Table.Cell>
                <Icon name={"trash"} link onClick={() => deleteLink(hash)} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

Links.propTypes = {
  deleteLink: PropTypes.func,
  links: PropTypes.array,
};

const mapStateToProps = ({ links }) => ({
  links,
});

const mapDispatchToProps = { deleteLink };

export default connect(mapStateToProps, mapDispatchToProps)(Links);
