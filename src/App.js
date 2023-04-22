import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import UserCard from "./UserCard";
import "./App.css";
import useUserState from "./UserState";

function App() {
  const { state, dispatch } = useUserState();
  const [isLoading, setLoading] = useState(true);
  let userData = state?.userData || [];

  useEffect(() => {
    async function fetchUsers() {
      try {
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
          dispatch({ type: "ADD_USER", payload: userWithImageData });
        });
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();

    return () => {
      if (userData?.length === 0) return;
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]?.imgURL) URL.revokeObjectURL(userData[i].imgURL);
      }
    };
  }, [dispatch]);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <Row gutter={[32, 32]}>
          {userData.map((user) => {
            return (
              <Col
                key={user.id}
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={6}
                xxl={6}
              >
                <UserCard key={user.id} user={user} dispatch={dispatch} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default App;
