import React from "react";
import { BASE_URL } from "../utils/constents";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Premium() {
  const [isPremium, setIsPremium] = useState(false);

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

  const verifyPayment = async () => {
    try {
      const res = await axios.get(BASE_URL + `/payment/verify`, {
        withCredentials: true,
      });
      setIsPremium(res.data.isPremium);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      {isPremium === true ? (
        <div className="max-w-md mx-auto mt-16">
          <div className="bg-base-100 border border-success/20 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-6xl mb-4">🎉</div>

            <h2 className="text-3xl font-bold mb-3">Premium Active</h2>

            <p className="text-base-content/70 mb-6">
              Your premium membership is already active and ready to use.
            </p>

            <div className="badge badge-success badge-lg">
              Active Subscription
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Premium;
