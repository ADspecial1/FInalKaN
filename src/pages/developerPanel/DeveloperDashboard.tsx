import React from "react";
import { Row, Col } from "antd";
import DeveloperUpcomingEvents from "./DeveloperUpcomingEvents"; // Adjust the path

const DeveloperDashboard: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <DeveloperUpcomingEvents />
        </Col>
        {/* Add more widgets or cards here if you want */}
      </Row>
    </div>
  );
};

export default DeveloperDashboard;
