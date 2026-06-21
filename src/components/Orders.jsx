import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addOrder } from "../utils/orderSlice";

function Orders() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.order);

  const getOrders = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user/orders`, {
        withCredentials: true,
      });
      dispatch(addOrder(res.data.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-center max-w-md mx-auto mt-10 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-mono">
        Error: {error.message || error}
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-[#070b0a] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 pb-4 border-b border-white/5">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">
              My Orders<span className="text-[#5ed29c]">.</span>
            </h2>
            <p className="text-xs text-white/40 font-mono mt-1">
              Invoice history and active active subscriptions logs.
            </p>
          </div>

          {!orders || orders.length === 0 ? (
            <div className="p-12 text-center border border-white/5 bg-white/1 rounded-xl">
              <p className="text-sm text-white/40">No transactions recorded.</p>
            </div>
          ) : (
            /* Simple Cards Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white/1 border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors"
                >
                  <div>
                    {/* Status Header Line */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 text-white/40">
                        <span className="text-[10px] font-mono">
                          ID: {order._id.substring(0, 8).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#5ed29c] bg-[#5ed29c]/5 border border-[#5ed29c]/10 px-2 py-0.5 rounded-md flex items-center gap-1"></span>
                    </div>

                    {/* Pricing Matrix details */}
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                        {order.membershipType} Plan
                      </h3>
                      <span className="text-base font-bold font-mono text-white">
                        ₹{order.amount}
                      </span>
                    </div>
                  </div>

                  {/* Footer Time Metrics */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex justify-between text-[10px] font-mono text-white/40">
                    <div>
                      <span className="block text-[9px] uppercase">
                        Purchased
                      </span>
                      <span className="text-white/70">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] uppercase">
                        Expires
                      </span>
                      <span className="text-white/70">
                        {new Date(
                          order.membershipExpireDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
