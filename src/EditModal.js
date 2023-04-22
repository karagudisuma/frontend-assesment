import { Form, Input, Modal } from "antd";
import "./EditModal.css";

const EditModal = ({ isModalOpen, cbHandleOk, cbHandleCancel, user }) => {
  let { name, id, email, phone, website } = user;

  const onFinish = (values) => {
    cbHandleOk(values);
  };

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={onFinish}
      onCancel={cbHandleCancel}
      className="modal-custom-container"
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "This field is required",
              type: "string",
            },
          ]}
        >
          <Input defaultValue={name} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
            {
              type: "email",
              message: "Invalid email",
            },
          ]}
        >
          <Input defaultValue={email} />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "This field is required",
              type: "string",
            },
          ]}
        >
          <Input defaultValue={phone} />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
            {
              type: "url",
              message: "Invalid website name",
            },
          ]}
        >
          <Input defaultValue={website} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
