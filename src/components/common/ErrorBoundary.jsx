import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error(`[ErrorBoundary] Error caught in component "${this.props.name || 'Component'}":`, error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback({
            error: this.state.error,
            resetError: this.handleReset
          });
        }
        return this.props.fallback;
      }

      // Default branded recovery UI
      const isNavbar = this.props.name === 'Navbar';

      if (isNavbar) {
        return (
          <header className="bg-[#F5F1E8] border-b border-[#E5DFD5] py-3 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                <span className="text-[#FF751F]">HARE</span> SPORTSWEAR
              </a>
              <div className="flex items-center gap-3 text-sm">
                <a href="/" className="px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD5] hover:border-[#FF751F] text-xs font-semibold">
                  Home
                </a>
                <a href="/products" className="px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD5] hover:border-[#FF751F] text-xs font-semibold">
                  Products
                </a>
                <a href="/contact" className="px-3 py-1.5 rounded-lg bg-[#FF751F] text-white text-xs font-bold shadow-sm">
                  Request RFQ
                </a>
                <button
                  onClick={this.handleReset}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#FF751F]"
                  title="Reload navigation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>
        );
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-[#F5F1E8]">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#E5DFD5] shadow-xl text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-[#FF751F] border border-[#FF751F]/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-[#1A1A1A]">
                Something went wrong
              </h3>
              <p className="text-xs text-[#595856] leading-relaxed">
                We encountered an unexpected display issue while rendering this section. You can reload this view or return safely to the home page.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5DFD5] hover:border-[#FF751F] text-[#1A1A1A] text-xs font-bold transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#FF751F]" />
                <span>Retry View</span>
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF751F] hover:bg-[#E65E08] text-white text-xs font-bold transition-all shadow-glow-orange"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
