import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./UserCard.css";

const { Meta } = Card;

const UserCard = ({ user }) => {
  const { imgURL, name, id, email, phone, username, website, liked } = user;
  return (
    <Card
      // style={{ background-color }}
      cover={<img alt={name} src={imgURL} />}
      bodyStyle={{}}
      bordered={false}
      actions={[
        <HeartOutlined key="heart" />,
        <EditOutlined key="edit" />,
        <DeleteOutlined key="delete" />,
      ]}
    >
      <Meta
        // title="Card title"
        description={
          <div className="description">
            <div className="desc-name">{name}</div>
            <div className="desc-element">
              <MailOutlined />
              {email}
            </div>
            <div className="desc-element">
              <PhoneOutlined />
              {phone}
            </div>
            <div className="desc-element">
              <GlobalOutlined />
              {website}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default UserCard;
