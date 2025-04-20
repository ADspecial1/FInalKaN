import React, { useEffect, useState } from "react";
import { Card, List, Avatar, Tag } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const DeveloperPanel: React.FC = () => {
  const [developers, setDevelopers] = useState<string[]>([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "upcomingEvents"));
        const devSet = new Set<string>();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.developer) {
            devSet.add(data.developer);
          }
        });

        setDevelopers(Array.from(devSet));
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <Card title="Developers with Upcoming Events" style={{ marginTop: 16 }}>
      <List
        dataSource={developers}
        renderItem={(dev) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{dev.charAt(0).toUpperCase()}</Avatar>}
              title={<span>{dev}</span>}
              description={<Tag color="blue">Upcoming Task</Tag>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DeveloperPanel;
