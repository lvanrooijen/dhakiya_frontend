import React, { createContext, useEffect, useState } from "react";
import { AxiosClient } from "src/services/AxiosClient";
import { GetFullEnvironment } from "src/types/api";

interface EnvironmentContextType {
  environment: GetFullEnvironment;
  updateEnvironment: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined
);

interface EnvironmentProviderProps {
  children: React.ReactNode;
  id: number | string;
}

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({
  children,
  id,
}) => {
  const [environment, setEnvironment] = useState<GetFullEnvironment>(null);

  const updateEnvironment = () => {
    AxiosClient.get(`environments/${id}`)
      .then((response: GetFullEnvironment) => {
        setEnvironment(response);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (id) {
      updateEnvironment();
    }
  }, [id]);

  return (
    <EnvironmentContext.Provider
      value={{
        environment,
        updateEnvironment,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  const context = React.useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      "useEnvironment must be used within an EnvironmentProvider"
    );
  }
  return context;
};
