import { Badge, Card, List } from "antd";
import React, { useEffect, useState } from "react";
import { Text } from "../../components/text";
import { db, auth } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";

interface EventType {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  userId: string;
  color: string;
}

const DeveloperUpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchEvents(user.uid);
      }
    });
  }, []);

  const fetchEvents = async (uid: string) => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "events"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      const now = dayjs();
      const upcomingEvents: EventType[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          } as EventType;
        })
        .filter((event) => {
          const eventStart = dayjs(`${event.startDate} ${event.startTime}`, "YYYY-MM-DD HH:mm");
          const eventEnd = dayjs(`${event.endDate} ${event.endTime}`, "YYYY-MM-DD HH:mm");

          return eventStart.isAfter(now) || (now.isAfter(eventStart) && now.isBefore(eventEnd));
        })
        .sort((a, b) =>
          dayjs(`${a.startDate} ${a.startTime}`, "YYYY-MM-DD HH:mm").diff(
            dayjs(`${b.startDate} ${b.startTime}`, "YYYY-MM-DD HH:mm")
          )
        )
        .slice(0, 5); // Top 5 upcoming only

      setEvents(upcomingEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1px" }}>
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: "0.3rem" }}>Your Upcoming Events</Text>
        </div>
      }
      bodyStyle={{ padding: "0 0 0 15px" }}
      style={{
        height: "482px",
        overflow: "auto",
        borderRadius: "12px",
        marginBottom: "20px"
      }}
    >
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "4px", fontSize: "10px", color: "#999" }}>
          Loading...
        </div>
      ) : events.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={events}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge color={item.color || "blue"} />}
                title={
                  <Text size="xs">
                    {dayjs(item.startDate).format("DD MMM YYYY")} | {item.startTime} - {item.endTime}
                  </Text>
                }
                description={<Text ellipsis={{ tooltip: true }} strong>{item.title}</Text>}
              />
            </List.Item>
          )}
        />
      ) : (
        <div style={{ textAlign: "center", padding: "4px", fontSize: "10px", color: "#999" }}>
          No Upcoming Events
        </div>
      )}
    </Card>
  );
};

export default DeveloperUpcomingEvents;
