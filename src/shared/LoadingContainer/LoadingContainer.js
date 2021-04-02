import React from 'react';
import PropTypes from 'prop-types';

import Preloader from './Preloader/Preloader';
import PreviewPreloader from './Preloader/PreviewPreloader';

const LoadingContainer = ({
  isLoading,
  isEmpty,
  isPreview,
  loadingMessage,
  children
}) => {
  if (isLoading && isPreview) {
    return (
      <div>
        <PreviewPreloader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div>
        <p>{loadingMessage}</p>
      </div>
    );
  }

  return children;
};

LoadingContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool,
  loadingMessage: PropTypes.string,
  children: PropTypes.node.isRequired
};

LoadingContainer.defaultProps = {
  isEmpty: false,
  loadingMessage: ''
};

export default LoadingContainer;
