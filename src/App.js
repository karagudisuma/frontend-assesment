import { Col, Row } from "antd";
import { Suspense, useEffect, useReducer, useState } from "react";
import Loader from "./Loader";
import UserCard from "./UserCard";
import "./App.css";
import useUserState from "./UserState";

function App() {
  // const [userData, setUserData] = useState([]);
  const { state, dispatch } = useUserState();
  let userData = state?.userData || [];

  console.log(state);

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
        // setUserData(userWithImageData);
        console.log(userWithImageData);
        dispatch({ type: "ADD_USER", payload: userWithImageData });
      });
    }
    fetchUsers();

    return () => {
      if (userData?.length === 0) return;
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]?.imgURL) URL.revokeObjectURL(userData[i].imgURL);
      }
    };
  }, [dispatch]);

  // const handleLike = (id) => {
  //   let index = userData.findIndex((u) => u.id === id);
  //   let updatedLike = !userData[index].liked;
  //   let modifiedData = [
  //     ...userData.slice(0, index),
  //     { ...userData[index], liked: updatedLike },
  //     ...userData.slice(index + 1),
  //   ];
  //   setUserData(modifiedData);
  // };

  // const handleDelete = (id) => {
  //   let index = userData.findIndex((u) => u.id === id);
  //   let modifiedData = [
  //     ...userData.slice(0, index),
  //     ...userData.slice(index + 1),
  //   ];
  //   setUserData(modifiedData);
  // };

  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <Row gutter={[32, 32]}>
          {userData.map((user) => {
            return (
              <Col key={user.id} className="gutter-row" span={6}>
                <UserCard
                  key={user.id}
                  user={user}
                  dispatch={dispatch}
                  // cbHandleLike={handleLike}
                  // cbHandleDelete={handleDelete}
                />
              </Col>
            );
          })}
        </Row>
      </Suspense>
    </div>
  );
}

export default App;
