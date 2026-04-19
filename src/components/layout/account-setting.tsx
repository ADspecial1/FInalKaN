import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Spin, message } from "antd";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { Text } from "../text";
import CustomAvatar from "../custom-avatar";
import { getNameInitials } from "@/utilities";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

export const AccountSettings = ({ opened, setOpened }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!opened) return;
    setLoading(true);
    const user = auth.currentUser;
    if (!user) { setLoading(false); return; }

    // Try Firestore first, fall back to Firebase Auth profile
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      const data = snap.exists() ? snap.data() : {};
      const resolvedName = data.name || user.displayName || "";
      const resolvedAvatar = data.avatarUrl || user.photoURL || "";
      setName(resolvedName);
      setAvatarUrl(resolvedAvatar);
      form.setFieldsValue({
        name: resolvedName,
        email: user.email || "",
        jobTitle: data.jobTitle || "",
        phone: data.phone || "",
      });
    }).finally(() => setLoading(false));
  }, [opened]);

  const handleSave = async () => {
    const values = await form.validateFields();
    const user = auth.currentUser;
    if (!user) return;
    setSaving(true);
    try {
      // Update Firebase Auth display name
      if (values.name !== user.displayName) {
        await updateProfile(user, { displayName: values.name });
      }
      // Persist extra fields to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: values.name,
        jobTitle: values.jobTitle || "",
        phone: values.phone || "",
        avatarUrl: avatarUrl || "",
        email: user.email,
      }, { merge: true });
      setName(values.name);
      message.success("Profile updated!");
      setOpened(false);
    } catch (err: any) {
      message.error("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      onClose={() => setOpened(false)}
      open={opened}
      width={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", backgroundColor: "#fff" }}>
        <Text strong>Account Settings</Text>
        <Button type="text" icon={<CloseOutlined />} onClick={() => setOpened(false)} />
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
          <Spin />
        </div>
      ) : (
        <div style={{ padding: "16px" }}>
          <Card>
            <Form form={form} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl ?? undefined}
                name={getNameInitials(name)}
                style={{ width: 96, height: 96, marginBottom: "24px" }}
              />
              <Form.Item label="Name" name="name">
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" disabled />
              </Form.Item>
              <Form.Item label="Job title" name="jobTitle">
                <Input placeholder="Job title" />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Phone" />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              loading={saving}
              onClick={handleSave}
              style={{ display: "block", marginLeft: "auto" }}
            >
              Save
            </Button>
          </Card>
        </div>
      )}
    </Drawer>
  );
};
