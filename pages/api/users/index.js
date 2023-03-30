import { query } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        const getquerySql = "SELECT * FROM users";
        const getvalueParams = [];
        const getdata = await query({
          query: getquerySql,
          values: [getvalueParams],
        });

        res.status(200).json({ users: getdata });
        break;
      case "POST":
        const querySql =
          "SELECT * FROM users where last_name like '%" +
          req.body.key.text +
          "%'";
        const valueParams = [];
        const data = await query({ query: querySql, values: [valueParams] });

        res.status(200).json({ users: data });
        break;
      case "PATCH":
        res.json({ message: "PATCHリクエスト" });
        break;
      default:
        res.json({ message: "GET/POST/PATCHでもないリクエストです。" });
        break;
    }

    // console.log(req.body.name.text);

    // if (req.method == "GET") {
    //   const querySql = "SELECT * FROM users";
    //   const valueParams = [];
    //   const data = await query({ query: querySql, values: [valueParams] });

    //   res.status(200).json({ users: data });
    //   console.log(req.method);
    // }
  } catch (error) {
    // unhide to check error
    // res.status(500).json({ error: error.message });
  }
}
