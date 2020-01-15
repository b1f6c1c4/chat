import React from 'react';
import PropTypes from 'prop-types';

import RawDocumentTitle from 'react-document-title';

class DocumentTitle extends React.PureComponent {
  render() {
    const { title, isPure } = this.props;

    const globalTitle = isPure ? '' : 'chat - Masquerade Seminar';

    if (!title) {
      return (
        <RawDocumentTitle title={globalTitle} />
      );
    }

    return (
      <RawDocumentTitle title={`${title} - ${globalTitle}`} />
    );
  }
}

DocumentTitle.propTypes = {
  title: PropTypes.any,
  isPure: PropTypes.bool,
};

export default DocumentTitle;
