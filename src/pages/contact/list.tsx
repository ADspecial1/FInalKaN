import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "@/firebase/fetchData";
import { List, Card } from "antd";
import { Text } from "../../components/text";

interface Contact {
  id: string;
  name: string;
  email: string;
}

const Contacts = () => {
  const { data } = useQuery(["contacts"], fetchContacts);

  return (
    <Card title="Contacts">
      <List
        dataSource={(data as Contact[]) || []}
        renderItem={(item) => (
          <List.Item>
            <Text strong>{item.name}</Text> - {item.email}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Contacts;
