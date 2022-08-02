import { NextApiHandler } from "next";
import api from "../../../libs/api";

// GET ONE USER
const HandlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const user = await api.getOneUser(parseInt(id as string))
        .catch((e) => {
            res.status(400).json({ error: e })
        })

    if (!user) {
        res.status(200).json({ error: "Usuário não encontrado" })
    }

    res.status(200).json({ user })

}

// UPDATE USER
const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query
    let { name, active, role } = req.body
    const user = await api.updateUser(parseInt(id as string), name, active, role)
        .catch((e) => {
            res.status(400).json({ error: e })
        })

    res.status(200).json({ user })

}

// DELETE USER
const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query

    const user = await api.deleteUser(parseInt(id as string))
        .catch((e) => {
            res.status(400).json({ error: e })
        })

    res.status(200).json({ success: "Usuário deletado com suecsso" })
}

// DEFINE METHOD
const Handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            HandlerGet(req, res)
            break;
        case 'PUT':
            handlerPut(req, res)
            break;
        case 'DELETE':
            handlerDelete(req, res)
            break;

        default:
            res.status(405).json({ error: '405 Method Not Allowed' })
            break;
    }
}

export default Handler;