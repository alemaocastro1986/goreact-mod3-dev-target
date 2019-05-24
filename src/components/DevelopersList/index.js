import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DevelopersActions from '../../store/actions/developers';

import DeveloperListItem from '../DevelopersListItem';

import './style.css';

const DevelopersList = (props) => {
  const { developers } = props;
  return (
    <Fragment>
      <div className="container">
        <div className="title-list">
          <strong>Developers</strong>
          <small>List</small>
        </div>
        <hr />
        <ul className="list-developers">
          {developers.data.map(dev => (
            <DeveloperListItem key={dev.id} item={dev} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

DevelopersList.propTypes = {
  developers: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        login: PropTypes.string,
        target: PropTypes.array,
        avatar: PropTypes.string,
      }),
    ),
  }).isRequired,
};

const mapStateToProps = state => ({
  developers: state.developers,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevelopersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevelopersList);
