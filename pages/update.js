import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

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
