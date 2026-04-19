// // developerPanel/DeveloperLayout.tsx
// import React from "react";
// import { Layout, Menu, Typography } from "antd";
// import {
//   AppstoreOutlined,
//   ProjectOutlined,
// } from "@ant-design/icons";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// const { Sider, Content, Header } = Layout;
// const { Title } = Typography;

// const DeveloperLayout: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider theme="light" width={220}>
//         <div style={{ padding: "16px", textAlign: "center" }}>
//           <Title level={4} style={{ margin: 0 }}>
//             Dev Panel
//           </Title>
//         </div>
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           onClick={({ key }) => navigate(key)}
//           items={[
//             {
//               key: "/developer-dashboard/dashboard",
//               icon: <AppstoreOutlined />,
//               label: "Dashboard",
//             },
//             {
//               key: "/developer-dashboard/kanban",
//               icon: <ProjectOutlined />,
//               label: "Kanban Board",
//             },
//           ]}
//         />
//       </Sider>

//       {/* Main Content */}
//       <Layout>
//         <Header
//           style={{
//             background: "#fff",
//             padding: "0 24px",
//             borderBottom: "1px solid #f0f0f0",
//           }}
//         >
//           <Title level={5} style={{ margin: 0 }}>
//             Developer Workspace
//           </Title>
//         </Header>
//         <Content style={{ padding: "24px" }}>
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default DeveloperLayout;


// developerPanel/DeveloperLayout.tsx

// import React from "react";
// import { Layout, Menu, Typography, Avatar, Dropdown, Space } from "antd";
// import { AppstoreOutlined, ProjectOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useGetIdentity } from '@refinedev/core'; // Import to get user data

// const { Sider, Content, Header } = Layout;
// const { Title } = Typography;

// const DeveloperLayout: React.FC = () => {
//   const { data: user } = useGetIdentity(); // Get user data using Refine's hook
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Handle menu click actions
//   const handleMenuClick = (e: any) => {
//     if (e.key === "logout") {
//       // Add logout logic here
//       console.log("Logout clicked");
//     }
//   };

//   // Dropdown menu content for user profile
//   const userMenu = (
//     <Menu onClick={handleMenuClick}>
//       <Menu.Item key="logout" icon={<LogoutOutlined />}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider theme="light" width={220}>
//         <div style={{ padding: "16px", textAlign: "center" }}>
//           <Title level={4} style={{ margin: 0 }}>
//             Dev Panel
//           </Title>
//         </div>
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           onClick={({ key }) => navigate(key)}
//           items={[
//             {
//               key: "/developer-dashboard/dashboard",
//               icon: <AppstoreOutlined />,
//               label: "Dashboard",
//             },
//             {
//               key: "/developer-dashboard/kanban",
//               icon: <ProjectOutlined />,
//               label: "Kanban Board",
//             },
//           ]}
//         />
//       </Sider>

//       {/* Main Content */}
//       <Layout>
//         <Header
//           style={{
//             background: "#fff",
//             padding: "0 24px",
//             borderBottom: "1px solid #f0f0f0",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Title level={5} style={{ margin: 0 }}>
//             Developer Workspace
//           </Title>

//           {/* Profile Dropdown with Avatar */}
//           <Dropdown overlay={userMenu} trigger={['click']}>
//             <a onClick={(e) => e.preventDefault()}>
//               <Space>
//                 <Avatar
//                   size="small"
//                   src={user?.avatarUrl || <UserOutlined />} // Fetch avatar from Gmail if available
//                 />
//                 <span>{user?.name || "Username"}</span> {/* Display user's name */}
//               </Space>
//             </a>
//           </Dropdown>
//         </Header>

//         <Content style={{ padding: "24px" }}>
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default DeveloperLayout;


// import React from "react";
// import { Layout, Menu, Typography, Avatar, Dropdown, Space } from "antd";
// import { AppstoreOutlined, ProjectOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useGetIdentity } from "@refinedev/core"; // Import to get user data

// const { Sider, Content, Header } = Layout;
// const { Title } = Typography;

// const DeveloperPanelLayout: React.FC = () => {
//   const { data: user } = useGetIdentity(); // Fetch user data using Refine's hook
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Handle menu click actions (including logout)
//   const handleMenuClick = (e: any) => {
//     if (e.key === "logout") {
//       // Add your logout logic here
//       console.log("Logout clicked");
//     }
//   };

//   // Dropdown menu content for user profile
//   const userMenu = (
//     <Menu onClick={handleMenuClick}>
//       <Menu.Item key="logout" icon={<LogoutOutlined />}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider theme="light" width={220}>
//         <div style={{ padding: "16px", textAlign: "center" }}>
//           <Title level={4} style={{ margin: 0 }}>
//             Developer Panel
//           </Title>
//         </div>
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           onClick={({ key }) => navigate(key)}
//           items={[
//             {
//               key: "/developer-dashboard/dashboard",
//               icon: <AppstoreOutlined />,
//               label: "Dashboard",
//             },
//             {
//               key: "/developer-dashboard/kanban",
//               icon: <ProjectOutlined />,
//               label: "Kanban Board",
//             },
//           ]}
//         />
//       </Sider>

//       {/* Main Content */}
//       <Layout>
//         <Header
//           style={{
//             background: "#fff",
//             padding: "0 24px",
//             borderBottom: "1px solid #f0f0f0",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Title level={5} style={{ margin: 0 }}>
//             Developer Workspace
//           </Title>

//           {/* Profile Dropdown with Avatar */}
//           <Dropdown overlay={userMenu} trigger={['click']}>
//             <a onClick={(e) => e.preventDefault()}>
//               <Space>
//                 <Avatar
//                   size="small"
//                   src={user?.avatarUrl || <UserOutlined />} // Fetch avatar from Gmail if available
//                 />
//                 <span>{user?.name || "Username"}</span> {/* Display user's name */}
//               </Space>
//             </a>
//           </Dropdown>
//         </Header>

//         <Content style={{ padding: "24px" }}>
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default DeveloperPanelLayout;

import React from "react";
import { Layout, Menu, Typography, Avatar, Dropdown, Space } from "antd";
import {
  AppstoreOutlined,
  ProjectOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetIdentity, useLogout } from "@refinedev/core"; // Import logout too

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

const DeveloperPanelLayout: React.FC = () => {
  const { data: user } = useGetIdentity<{ name?: string; avatarUrl?: string }>(); // Get user data
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout(); // Refine's logout function

  // Handle menu click actions
  const handleMenuClick = (e: any) => {
    if (e.key === "logout") {
      logout(); // Call Refine's logout
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider theme="light" width={220}>
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Title level={4} style={{ margin: 0 }}>
            Developer Panel
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/developer-dashboard/dashboard",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
            },
            {
              key: "/developer-dashboard/kanban",
              icon: <ProjectOutlined />,
              label: "Kanban Board",
            },
          ]}
        />
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Developer Workspace
          </Title>

          {/* Profile Dropdown */}
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  src={user?.avatarUrl}
                />
                <span>{user?.name || "Username"}</span>
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content style={{ padding: "24px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeveloperPanelLayout;
