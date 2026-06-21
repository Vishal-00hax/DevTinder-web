import React from "react";
import { BASE_URL } from "../utils/constents";
import axios from "axios";

function Premium() {
  const handlePayment = async (planType) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/payment/create-order`,
        { planType },
        { withCredentials: true },
      );
      // Get stripe url from backend we will navigate user on this url
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.log("Payment failed", err.message);
    }
  };

  return (
    <>
      <div className="card w-96 bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Bronz Membership 🥉</h2>
          <p>Get 40 Requests Per Day + Chat 💬</p>
          <div className="justify-end card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handlePayment("Bronz")}
            >
              Buy Now At 140
            </button>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Sliver Membership 🥈</h2>
          <p>Get 70 Requests Per Day + Chat 💬</p>
          <div className="justify-end card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handlePayment("Silver")}
            >
              Buy Now At 160
            </button>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 card-lg shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Gold Membership 🏅</h2>
          <p>Get 100+ Requests Per Day + Chat 💬</p>
          <div className="justify-end card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handlePayment("Gold")}
            >
              Buy Now At 200
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Premium;
