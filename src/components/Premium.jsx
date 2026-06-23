import React from "react";
import { BASE_URL } from "../utils/constents";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Premium() {
  const [isPremium, setIsPremium] = useState(false);

  const tiers = [
    {
      name: "Bronze",
      price: "140",
      features: [
        "20 Connection Requests / Day",
        "Enhanced Profile Visibility",
        "Unlimited Chat",
        "Email Support",
      ],
      isPopular: false,
      accentClass: "border-base-300 hover:border-orange-500/50",
      btnClass: "btn-outline btn-primary",
    },
    {
      name: "Gold",
      price: "200",
      features: [
        "50 Connection Requests / Day",
        "Priority Profile Visibility",
        "Unlimited Chat",
        "Priority Email Support",
        "24/7 Premium Support",
      ],
      isPopular: true,
      accentClass:
        "border-warning/50 bg-gradient-to-b from-base-100 to-warning/5 ring-2 ring-warning scale-105 md:scale-110 z-10 shadow-2xl",
      btnClass:
        "btn-warning text-warning-content shadow-lg shadow-warning/20 animate-pulse-subtle",
    },
    {
      name: "Silver",
      price: "160",
      features: [
        "35 Connection Requests / Day",
        "Enhanced Profile Visibility",
        "Unlimited Chat",
        "Priority Email Support",
      ],
      isPopular: false,
      accentClass: "border-base-300 hover:border-slate-400/50",
      btnClass: "btn-outline btn-primary",
    },
  ];

  const handlePayment = async (tierName) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/payment/create-order`,
        { planType: tierName },
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
        <div className="max-w-md mx-auto mt-16 px-4">
          <div className="relative overflow-hidden bg-base-100 border border-success/30 rounded-3xl p-8 text-center shadow-2xl transition-all duration-300 hover:shadow-success/10 group">
            {/* Decorative Premium Subtle Background Glow (Uses safe solid colors with low opacity instead of gradients) */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-success/10 rounded-full blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-150"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-150"></div>

            {/* Modern Animated Icon Container */}
            <div className="relative mx-auto w-20 h-20 bg-success/10 rounded-2xl flex items-center justify-center mb-6 border border-success/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <span
                className="text-4xl animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                🎉
              </span>
              {/* Sparkle micro-dot */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-success rounded-full animate-ping"></span>
            </div>

            {/* Typography - Changed from text-gradient to solid, reliable text-success */}
            <h2 className="text-3xl font-black tracking-tight mb-2 text-success">
              Premium Activated!
            </h2>

            <p className="text-base-content/70 text-sm md:text-base max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you for upgrading. Your premium membership is fully active.
              Enjoy your unlocked superpowers!
            </p>

            {/* Status Metadata Badge Container */}
            <div className="bg-base-200/60 border border-base-300 rounded-xl p-4 mb-8 flex items-center justify-between text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Status
                </p>
                <p className="text-sm font-bold text-success flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  Active & Billing
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Plan Tier
                </p>
                <p className="text-sm font-bold text-base-content">
                  Gold Member
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <Link to="/profile">
              <button className="btn btn-success text-success-content w-full font-bold uppercase tracking-wider shadow-lg shadow-success/20 hover:shadow-xl hover:shadow-success/30 transition-all duration-300">
                Go to Dashboard
              </button>
            </Link>

            {/* Secondary Subtext link */}
            <p className="text-xs text-base-content/40 mt-4 cursor-pointer hover:text-base-content/70 transition-colors underline underline-offset-4">
              View billing history or manage subscription
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
            {/* Header Section */}
            <div className="text-center mb-16 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-primary">
                Upgrade Your Experience
              </h1>
              <p className="text-base-content/70 text-lg">
                Select the perfect plan designed to fast-track your networking
                and maximize visibility.
              </p>
            </div>

            {/* Responsive Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 w-full max-w-6xl items-center px-2">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`card w-full bg-base-100 border transition-all duration-300 ease-in-out transform hover:-translate-y-2 group relative rounded-2xl ${tier.accentClass}`}
                >
                  {/* "Most Popular" Ribbon with absolute positioning so it doesn't break alignment */}
                  {tier.isPopular && (
                    <span className="absolute -top-3 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 badge badge-warning text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-2.5 md:px-4 md:py-3 shadow-md border-none">
                      Most Popular
                    </span>
                  )}

                  <div className="card-body p-6 md:p-8 flex flex-col h-full justify-between">
                    {/* Card Header */}
                    <div>
                      <div className="flex items-baseline justify-between mb-4">
                        <h2 className="text-2xl font-black tracking-tight">
                          {tier.name}
                        </h2>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-extrabold tracking-tight">
                            ₹{tier.price}
                          </span>
                          <span className="text-base-content/60 ml-1 font-medium">
                            /mo
                          </span>
                        </div>
                      </div>

                      <div className="divider my-2 opacity-50"></div>

                      {/* Features List */}
                      <ul className="space-y-3 mt-6">
                        {tier.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm transition-transform duration-200 group-hover:translate-x-1"
                          >
                            <div className="shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="font-medium text-base-content/80">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Call To Action Button */}
                    <div className="mt-8">
                      <button
                        className={`btn w-full font-bold uppercase tracking-wider transition-all duration-300 ${tier.btnClass}`}
                        onClick={() => handlePayment(tier.name)}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Premium;
