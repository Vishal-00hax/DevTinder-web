import React from "react";

export function PaymentSuccess() {
  return (
    <div class="badge badge-success">
      <svg
        class="size-[1em]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            stroke-linecap="square"
            stroke-miterlimit="10"
            stroke-width="2"
          ></circle>
          <polyline
            points="7 13 10 16 17 8"
            fill="none"
            stroke="currentColor"
            stroke-linecap="square"
            stroke-miterlimit="10"
            stroke-width="2"
          ></polyline>
        </g>
      </svg>
      Payment Success
    </div>
  );
}

export function PaymentCancel() {
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-red-500">Payment Failed !</h2>
      </div>
    </div>
  );
}
