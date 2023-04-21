import { useState } from "react";
import { WechatOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import ChatCard from "../cards/ChatCard";

function ChatIcon() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WechatOutlined
        className="position-chat-icon btn "
        onClick={() => setOpen(true)}
      />

      <Modal
          open={open}
          onCancel={() => setOpen(false)}
          title="Chat"
          footer={true}
          className="text-center"
          width={1000}
        >
         بسم الله الرحم الرحيم
         <ChatCard />
      </Modal>

    </>
  );
}

export default ChatIcon;
