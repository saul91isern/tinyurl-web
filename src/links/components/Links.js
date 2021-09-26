import _ from "lodash/fp";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Dimmer,
  Icon,
  Input,
  Loader,
  Message,
  Popup,
  Table,
} from "semantic-ui-react";
import { deleteLink, setQuery } from "../routines";
import { getLinksChunk } from "../selectors";
import Pagination from "./Pagination";

const timeout = 1000;

const CopyCell = ({ iconId }) => {
  const [open, setOpen] = useState(false);
  const copy = (id) => {
    const text = document.getElementById(id).firstChild?.data;
    navigator.clipboard.writeText(text);

    !open && setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, timeout);
  };

  return (
    <Popup
      trigger={
        <Icon name={"copy"} link onClick={() => copy(`link_${iconId}`)} />
      }
      content={"Copied!"}
      on="click"
      open={open}
      position="top center"
    />
  );
};

CopyCell.propTypes = {
  iconId: PropTypes.number,
};

export const Links = ({ loading, deleteLink, linksQuery, links, setQuery }) => {
  const baseURL = process.env.REACT_APP_API_HOST;

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
            <Table striped collapsing>
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
                  <Table.Row key={`row_${key}`}>
                    <Table.Cell>
                      <Popup
                        content={url}
                        trigger={
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {_.truncate({ length: 100 })(url)}
                          </a>
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Popup
                        content={`${baseURL}/${hash}`}
                        trigger={
                          <a
                            id={`link_${key}`}
                            href={`${baseURL}/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {_.truncate({ length: 100 })(`${baseURL}/${hash}`)}
                          </a>
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <CopyCell iconId={key} />
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
            <Pagination />
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

const mapStateToProps = (state) => ({
  linksQuery: state.linksQuery,
  links: getLinksChunk(state),
  loading: state.linksLoading,
});

const mapDispatchToProps = { deleteLink, setQuery };

export default connect(mapStateToProps, mapDispatchToProps)(Links);
