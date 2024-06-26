import React, { createContext, useState, useContext } from "react";

interface TabBarHeightContextType {
  tabBarHeight: number;
  setTabBarHeight: (height: number) => void;
}

const TabBarHeightContext = createContext<TabBarHeightContextType>({
  tabBarHeight: 50, // Default value
  setTabBarHeight: () => {}, // Placeholder function
});

interface TabBarHeightProviderProps {
  children: React.ReactNode;
}

export const TabBarHeightProvider: React.FC<TabBarHeightProviderProps> = ({
  children,
}) => {
  const [tabBarHeight, setTabBarHeight] = useState(50); // Default height

  return (
    <TabBarHeightContext.Provider value={{ tabBarHeight, setTabBarHeight }}>
      {children}
    </TabBarHeightContext.Provider>
  );
};

export const useTabBarHeight = () => useContext(TabBarHeightContext);
