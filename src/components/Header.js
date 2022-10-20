import { Avatar, Button, Dropdown, Image, Layout, Menu, message } from "antd";
import { copyToClipboard } from "../utils/utils";
import { signOut } from "../firebase/authApi";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

const NavBar = ({ loggedIn, user }) => {
  return (
    <Layout.Header
      style={{
        position: "fixed",
        display: "flex",
        zIndex: 1,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="/" className="logo" style={{ marginRight: 16 }}>
          Oshaberi
        </a>
        {loggedIn && user && (
          <input type="hidden" id="userIdInput" value={user.uid} />
        )}
      </div>
      {loggedIn && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={() => {
              const res = copyToClipboard(user.uid);
              if (!res) {
                message.error("Could not copy to clipboard");
              } else {
                message.success("Copied to clipboard");
              }
            }}
          >
            Copy Your ID
          </Button>
          <Avatar
            src={
              <Image
                referrerPolicy={"no-referrer"}
                src={user?.photoURL.replace("s96-c", "s200-c")}
              />
            }
          />
          <Dropdown overlay={menu} trigger={["click"]}>
            <DownOutlined style={{ color: "white", marginLeft: 8 }} />
          </Dropdown>
        </span>
      )}
    </Layout.Header>
  );
};

const menu = (
  <Menu>
    <Menu.Item key={1}>
      <a href="/profile">
        <UserOutlined /> Profile
      </a>
    </Menu.Item>
    <Menu.Item danger key={2} onClick={signOut}>
      <LogoutOutlined /> Logout
    </Menu.Item>
  </Menu>
);

export default NavBar;
