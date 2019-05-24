import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DevelopersActions from '../../store/actions/developers';

import { DeveloperItem } from './style';

const DevelopersListItem = (props) => {
  const { item, removeDeveloper } = props;
  return (
    <DeveloperItem>
      <div>
        <img src={item.avatar} alt={item.name} />
        <div className="info">
          <strong>{item.name}</strong>
          <span>{item.login}</span>
        </div>
      </div>
      <div className="action">
        <button type="button" onClick={() => removeDeveloper(item.id)}>
          <i className="fa fa-times-circle" />
        </button>
      </div>
    </DeveloperItem>
  );
};

DevelopersListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    login: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  removeDeveloper: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(DevelopersActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(DevelopersListItem);
