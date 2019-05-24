import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MapGl, { Marker } from 'react-map-gl';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import * as DevelopersActions from '../../store/actions/developers';

import { Form } from './style';
import DevelopersList from '../DevelopersList';

import 'react-toastify/dist/ReactToastify.css';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.css';

class Map extends Component {
  static propTypes = {
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
    addDeveloperRequest: PropTypes.func.isRequired,
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -30.03677,
      longitude: -51.214185,
      zoom: 12.3,
    },
    mapTarget: [],
    formInput: '',
    show: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = (e) => {
    this.setState({
      show: true,
      mapTarget: [...e.lngLat],
    });
  };

  handleViewportChange = (viewport) => {
    this.setState({
      viewport,
    });
  };

  handleChange = (e) => {
    this.setState({
      formInput: e.target.value,
    });
  };

  handleFormHide = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      show: false,
      mapTarget: [],
      formInput: '',
    });
  };

  handleSubmit(e) {
    const { addDeveloperRequest } = this.props;
    const { mapTarget, formInput } = this.state;
    e.preventDefault();
    addDeveloperRequest({
      username: formInput,
      target: [...mapTarget],
    });

    this.setState({
      show: false,
      mapTarget: [],
      formInput: '',
    });
  }

  render() {
    const { viewport, show, formInput } = this.state;
    const { developers } = this.props;
    return (
      <Fragment>
        <ToastContainer />
        <DevelopersList />
        <MapGl
          {...viewport}
          onClick={e => this.handleMapClick(e)}
          mapboxApiAccessToken="pk.eyJ1IjoiYWxlbWFvY2FzdHJvMTk4NiIsImEiOiJjanZjbnF2a2UwMmViNDRtZTBtOTZvZWJsIn0.2ygT6B8li03IMU4s9_DgTQ"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={this.handleViewportChange}
        >
          {developers.data.map(dev => (
            <Marker
              key={dev.id}
              latitude={dev.target[1]}
              longitude={dev.target[0]}
              onClick={() => {}}
              captureClick
            >
              <img
                src={dev.avatar}
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48,
                  border: '4px solid #336699',
                }}
                alt={dev.name}
              />
            </Marker>
          ))}
        </MapGl>
        <Modal
          show={show}
          size="lg"
          onHide={this.handleFormHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Insert a Developer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">
                    https://api.github.com/users/
                  </span>
                </div>

                <input
                  className="form-control"
                  type="text"
                  id="basic-url"
                  placeholder="username"
                  value={formInput}
                  onChange={e => this.handleChange(e)}
                  aria-describedby="basic-addon3"
                />
              </div>
              <div className="action">
                <button
                  onClick={this.handleFormHide}
                  className="btn btn-secondary btn-block"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  onClick={e => this.handleSubmit(e)}
                >
                  Find
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  developers: state.developers,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevelopersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
