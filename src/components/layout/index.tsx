import React, { PropsWithChildren } from "react";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import Header from "./Header";
// import FAV from '../../../public/favicon.ico'
import FAV from '../../../public/ksn-removebg-preview (1).png'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(titleProps) => (
        <ThemedTitleV2
          {...titleProps}
          text="KANBAN BOARD"
          icon={<img src={FAV} alt="Logo" style={{ width: 24 }} />}
        />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
