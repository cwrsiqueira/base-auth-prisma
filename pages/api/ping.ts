import { NextApiHandler } from "next";

const Handler: NextApiHandler = (req, res) => {
    res.json({ pong: true })
}

export default Handler;