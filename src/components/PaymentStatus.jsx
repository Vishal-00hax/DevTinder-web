import React from "react";
import { Link } from "react-router";

export function PaymentSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-base-200/50">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-success/20 rounded-3xl overflow-hidden relative group">
        {/* Animated Celebration Micro-Dots Background */}
        <div className="absolute top-4 left-6 w-2 h-2 bg-success/40 rounded-full animate-ping"></div>
        <div
          className="absolute bottom-12 right-8 w-3 h-3 bg-info/30 rounded-full animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div>

        <div className="card-body p-8 items-center text-center">
          {/* Animated Success Checkmark Ring */}
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success border border-success/20 shadow-inner mb-6 relative group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-10 h-10 transform scale-100 transition-transform duration-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="absolute inset-0 rounded-full border-2 border-success animate-ping opacity-25"></span>
          </div>

          {/* Typography */}
          <h2 className="text-3xl font-black tracking-tight text-success mb-2">
            Payment Successful!
          </h2>
          <p className="text-base-content/60 text-sm max-w-xs mb-8">
            Your transaction has completed successfully. Your premium features
            are unlocked instantly.
          </p>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <Link to="/">
              <button className="btn btn-success text-success-content w-full font-bold uppercase tracking-wider shadow-lg shadow-success/20 hover:shadow-xl transition-all duration-300">
                Start Using Premium
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentCancel() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-base-200/50">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-error/20 rounded-3xl overflow-hidden relative group">
        <div className="card-body p-8 items-center text-center">
          {/* Animated Error Cross Ring */}
          <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center text-error border border-error/20 shadow-inner mb-6 relative group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-9 h-9 animate-pulse"
              style={{ animationDuration: "2.5s" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Typography */}
          <h2 className="text-3xl font-black tracking-tight text-error mb-2">
            Payment Failed
          </h2>
          <p className="text-base-content/60 text-sm max-w-xs mb-6">
            Don't worry, your funds are safe. The transaction was declined by
            your bank or card issuer.
          </p>

          {/* Helpful troubleshooting tips to assist the user */}
          <div className="w-full bg-base-200/60 border border-base-300 rounded-2xl p-4 mb-8 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-2.5">
              Common Solutions
            </p>
            <ul className="text-xs space-y-2 text-base-content/70 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>{" "}
                Verify internet connection banking limits.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>{" "}
                Ensure international transactions are enabled.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Try
                alternative UPI or payment modes.
              </li>
            </ul>
          </div>

          {/* Action Call to Actions */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/premium">
              <button className="btn btn-outline border-base-300 hover:bg-base-200 text-base-content font-bold uppercase tracking-wider transition-all duration-300">
                Try Again
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
