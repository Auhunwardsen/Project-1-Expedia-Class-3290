import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ff6b6b', 
          borderRadius: '5px', 
          backgroundColor: '#ffe0e0',
          margin: '20px 0' 
        }}>
          <h2 style={{ color: '#d63031', marginBottom: '10px' }}>Something went wrong</h2>
          <p style={{ color: '#636e72' }}>
            {this.props.message || 'An unexpected error occurred in this component.'}
          </p>
          {this.props.showDetails && (
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', color: '#74b9ff' }}>
                Error Details
              </summary>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                fontSize: '12px',
                overflow: 'auto',
                borderRadius: '3px',
                marginTop: '5px'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          {this.props.showRetry && (
            <button 
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#0984e3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  message: PropTypes.string,
  showDetails: PropTypes.bool,
  showRetry: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  showDetails: false,
  showRetry: true,
};

export default ErrorBoundary;