import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dimmer, Icon, Input, Message, Loader, Table } from "semantic-ui-react";
import { deleteLink, setQuery } from "../routines";

export const Links = ({ loading, deleteLink, linksQuery, links, setQuery }) => {
  const baseURL = process.env.REACT_APP_API_HOST;
  const copy = (id) => {
    const text = document.getElementById(id).firstChild?.data;
    navigator.clipboard.writeText(text);
  };
  const onInputChange = (_e, { value }) => setQuery(value);

  return (
    <>
      <Input
        icon={{ name: "search", circular: true }}
        placeholder="Search..."
        onChange={onInputChange}
        value={linksQuery || ""}
      />
      {_.isEmpty(links) && !loading ? (
        <Message
          icon="question"
          header="No results found"
          content="Maybe you want shorten a new url first."
        />
      ) : (
        <>
          <Dimmer.Dimmable dimmed={loading}>
            <Dimmer active={loading} inverted>
              <Loader />
            </Dimmer>
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
                      <Icon
                        name={"copy"}
                        link
                        onClick={() => copy(`link_${key}`)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name={"trash"}
                        link
                        onClick={() => deleteLink(hash)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Dimmer.Dimmable>
        </>
      )}
    </>
  );
};

Links.propTypes = {
  deleteLink: PropTypes.func,
  links: PropTypes.array,
  linksQuery: PropTypes.string,
  setQuery: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = ({ linksQuery, links, linksLoading }) => ({
  linksQuery,
  links,
  loading: linksLoading,
});

const mapDispatchToProps = { deleteLink, setQuery };

export default connect(mapStateToProps, mapDispatchToProps)(Links);
