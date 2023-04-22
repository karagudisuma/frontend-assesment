import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import "./UserCard.css";

const { Meta } = Card;

const UserCard = ({ user, cbHandleLike, key }) => {
  const { imgURL, name, id, email, phone, username, website, liked } = user;
  return (
    <Card
      style={{ border: "1px solid #e8e8e8", borderRadius: 0 }}
      className="card-container"
      cover={<img alt={name} src={imgURL} width="200px" height="200px" />}
      bordered={false}
      key={key}
      actions={[
        <div className="action-container">
          {liked ? (
            <HeartFilled
              key="heart-filled"
              onClick={() => cbHandleLike(id)}
              style={{ fontSize: "20px", color: "red" }}
            />
          ) : (
            <HeartOutlined
              key="heart"
              onClick={() => cbHandleLike(id)}
              style={{ fontSize: "20px", color: "red" }}
            />
          )}
        </div>,
        <EditOutlined key="edit" style={{ fontSize: "18px" }} />,
        <DeleteOutlined key="delete" style={{ fontSize: "18px" }} />,
      ]}
    >
      <Meta
        description={
          <div className="description">
            <h3>{name}</h3>
            <div className="desc-element">
              <MailOutlined style={{ fontSize: "18px" }} />
              <p>{email}</p>
            </div>
            <div className="desc-element">
              <PhoneOutlined style={{ fontSize: "18px" }} />
              <p>{phone}</p>
            </div>
            <div className="desc-element">
              <GlobalOutlined style={{ fontSize: "18px" }} />
              <p>http://{website}</p>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default UserCard;
