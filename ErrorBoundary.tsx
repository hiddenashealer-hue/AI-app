import React, { Component, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

type Props = {
  FallbackComponent?: React.ComponentType<any>;
  onError?: (error: Error, stack?: string) => void;
  children?: ReactNode;
};

type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    FallbackComponent: ErrorFallback,
  };

  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info?.componentStack);
    }
  }

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    const { FallbackComponent } = this.props;

    if (this.state.error && FallbackComponent) {
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children as ReactNode;
  }
}

export default ErrorBoundary;
