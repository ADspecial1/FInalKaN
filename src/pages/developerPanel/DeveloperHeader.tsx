import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const DeveloperHeader: React.FC = () => {
  return (
    <Header
      style={{
        backgroundColor: "#001529",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Title level={4} style={{ color: "white", margin: 0 }}>
        Developer Panel
      </Title>
    </Header>
  );
};

export default DeveloperHeader;
