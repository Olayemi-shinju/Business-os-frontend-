import React, { useState } from "react";
import {
  FiSettings,
  FiUser,
  FiShield,
  FiSliders,
  FiInfo,
  FiUpload,
} from "react-icons/fi";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("store");

  const [storeName, setStoreName] = useState("A.O.D Store");
  const [email, setEmail] = useState("aodstore@gmail.com");
  const [phone, setPhone] = useState("08012345678");
  const [address, setAddress] = useState(
    "No 12, Market Road, Akure, Ondo State, Nigeria"
  );

  const settingsTabs = [
    {
      id: "store",
      name: "Store",
      icon: <FiSettings />,
    },
    {
      id: "account",
      name: "Account",
      icon: <FiUser />,
    },
    {
      id: "security",
      name: "Security",
      icon: <FiShield />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-slate-800 md:p-8">
      {/* Page Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your store and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* Settings Navigation */}
        <div className="h-fit rounded-xl border border-slate-200 bg-white p-3">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <span className="text-lg">{tab.icon}</span>

              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* STORE */}
          {activeTab === "store" && (
            <>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                {/* Card Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-xl text-indigo-600">
                    <FiSettings />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Store Settings
                    </h2>

                    <p className="text-sm text-slate-500">
                      Update your store information and basic details.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  {/* Form */}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Store Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Store name
                      </label>

                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Phone number
                      </label>

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email address
                      </label>

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Address
                      </label>

                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
                    <button className="rounded-lg cursor-pointer btn-new-sale border px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>


            </>
          )}

          {/* ACCOUNT */}
          {activeTab === "account" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Account
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your personal account information.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    First name
                  </label>

                  <input
                    type="text"
                    defaultValue="Alex"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Last name
                  </label>

                  <input
                    type="text"
                    defaultValue="Morgan"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Email address
                  </label>

                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
                <button className="rounded-lg cursor-pointer border btn-new-sale px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                  Update profile
                </button>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Security
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your account security.
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 py-5">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Password
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Change your account password.
                  </p>
                </div>

                <button className="rounded-lg border border btn-new-sale px-4 py-2 text-sm cursor-pointer font-medium hover:bg-slate-50">
                  Change password
                </button>
              </div>

              <div className="flex items-center justify-between py-5">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Two-factor authentication
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Additional security will be available later.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Coming later
                </span>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Settings;