import React, { Component, ErrorInfo } from "react";

interface State {
  hasError: boolean;
}
interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}
class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <p>Sorry, something went wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
