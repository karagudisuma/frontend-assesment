import { Col, Row } from "antd";
import { Suspense, useEffect, useState } from "react";
import Loader from "./Loader";
import UserCard from "./UserCard";
import "./App.css";

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      await response.json().then(async (data) => {
        let userWithImageData = await Promise.all(
          data.map(async (user) => {
            const imgResponse = await fetch(
              `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`
            );
            let imgData = await imgResponse.blob();
            let imgURL = URL.createObjectURL(imgData);
            return {
              ...user,
              imgURL,
              liked: false,
            };
          })
        );
        setUserData(userWithImageData);
      });
    }
    fetchUsers();

    return () => {
      if (userData?.length === 0) return;
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]?.imgURL) URL.revokeObjectURL(userData[i].imgURL);
      }
    };
  }, []);

  console.log(userData);
  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <Row gutter={[32, 32]}>
          {userData.map((user) => {
            return (
              <Col className="gutter-row" span={6}>
                <UserCard key={user.id} user={user} />
              </Col>
            );
          })}
        </Row>
      </Suspense>
    </div>
  );
}

export default App;
