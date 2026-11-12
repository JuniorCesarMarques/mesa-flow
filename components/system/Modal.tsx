"use client";

import { ReactNode } from "react";
import { Modal } from "antd";

const App = ({
  children,
  title,
  isModalOpen,
  close,
}: {
  children: ReactNode;
  title: string;
  isModalOpen: boolean;
  close: () => void;
}) => {

  return (
    <>
      <Modal
        destroyOnHidden
        centered
        title={title}
        closable={{ "aria-label": "Custom Close Button" }}
        footer={null}
        open={isModalOpen}
        onCancel={close}
      >
        {children}
      </Modal>
    </>
  );
};

export default App;
