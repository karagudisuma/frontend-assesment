import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      await response.json().then(async (data) => {
        let userWithImageData = await Promise.all(
          data.map(async (user) => {
            const imgResponse = await fetch(
              "https://avatars.dicebear.com/v2/avataaars/{{username}}.svg?options[mood][]=happy"
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
      if (userData?.length == 0) return;
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]?.imgURL) URL.revokeObjectURL(userData[i].imgURL);
      }
    };
  }, []);

  return <div>Main page</div>;
}

export default App;
