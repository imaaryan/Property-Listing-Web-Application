import React, { useContext, useState } from "react";
import { RiWifiOffLine, RiRefreshLine } from "@remixicon/react";
import { AppContext } from "../../context/AppContext";

const ServerDown = () => {
  const { checkConnection } = useContext(AppContext);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    // Add a small artificial delay to show the user something is happening
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await checkConnection();
    setIsRetrying(false);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-base-100 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-error/20 rounded-full blur-xl"></div>
          <div className="relative bg-base-100 p-6 rounded-full border border-base-200 shadow-xl">
            <RiWifiOffLine size={64} className="text-error" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-display text-base-content">
            Server Not Responding
          </h1>
          <p className="text-base-content/70">
            We're having trouble connecting to our servers. Please check your
            internet connection or try again in a few moments.
          </p>
        </div>

        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="btn btn-primary btn-lg w-full sm:w-auto min-w-[200px] shadow-lg shadow-primary/30"
        >
          {isRetrying ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Checking Connection...
            </>
          ) : (
            <>
              <RiRefreshLine size={20} />
              Retry Connection
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServerDown;
