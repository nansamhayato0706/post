import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const postData = async (e) => {
    setText(e.target.value);
    console.log(text);
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: { text } }),
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  };

  return (
    <div>
      <input type="text" onKeyUp={postData} />
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.last_name + "　" + user.first_name}</li>
        ))}
      </ul>
    </div>
  );
}
