import { NextApiHandler } from "next";
import api from "../../../libs/api";

// GET ALL USERS
const HandlerGet: NextApiHandler = async (req, res) => {
    const { perPage, page, active } = req.query;
    const users = await api.getAllUsers(parseInt(perPage as string), parseInt(page as string), active == 'true')
        .catch((e) => {
            res.status(400).json({ error: e })
        })
    res.status(200).json({ status: 200, users })
}

// CREATE USER
const HandlerPost: NextApiHandler = async (req, res) => {
    const { name, email, password } = req.body
    const newUser = await api.createUser(name, email, password)
        .catch((e) => {
            res.status(400).json({ error: e })
        })

    res.status(201).json({ success: newUser })
}

// DEFINE METHOD
const Handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            HandlerGet(req, res)
            break;
        case 'POST':
            HandlerPost(req, res)
            break;

        default:
            res.status(405).json({ error: '405 Method Not Allowed' })
            break;
    }
}

export default Handler;