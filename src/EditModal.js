import { Form, Input, Modal } from "antd";
import "./EditModal.css";

const EditModal = ({ isModalOpen, cbHandleOk, cbHandleCancel, user }) => {
  let { name, id, email, phone, website } = user;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
      cbHandleOk(values);
    });
  };

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={cbHandleCancel}
      className="modal-custom-container"
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        initialValues={{ name, email, phone, website }}
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
          <Input />
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
          ]}
        >
          <Input defaultValue={website} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
