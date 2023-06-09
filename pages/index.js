import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

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

  const postData = useCallback(
    async (e) => {
      setText(e.target.value);
      // console.log(text);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const resData = await res.json();
        setUsers(resData.users);
      }
    },
    [text]
  );

  return (
    <div>
      <header className={styles.header}>
        <Link href="/" legacyBehavior>
          <a className={styles.anchor}>Index</a>
        </Link>
        <Link href="about" legacyBehavior>
          <a className={styles.anchor}>About</a>
        </Link>
      </header>
      <input type="text" onKeyUp={postData} />
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <a href={"/update"}>{user.last_name + "　" + user.first_name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
