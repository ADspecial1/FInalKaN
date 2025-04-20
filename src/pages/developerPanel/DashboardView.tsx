import React from "react";
import { Row, Col } from "antd";
import DeveloperUpcomingEvents from "./DeveloperUpcomingEvents"; // Adjust the path if needed

const DashboardView: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <DeveloperUpcomingEvents />
        </Col>
        {/* You can add more cards or components for other sections */}
      </Row>
    </div>
  );
};

export default DashboardView;
