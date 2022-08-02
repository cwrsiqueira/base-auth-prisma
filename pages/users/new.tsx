import Head from "next/head"
import { Layout } from "../../components/Layout"
import styles from "../../styles/UsuariosNovo.module.css"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const UsuariosNovo = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleAddUser = async () => {
        if (!name || !email) {
            alert('Todos os campos são obrigatórios')
            return;
        }

        const json = await axios.post('/api/users', { name, email })

        if (json.data.error) {
            alert('Erro no cadastro')
            return;
        }
        router.push('/usuarios')
    }

    return (
        <Layout>
            <div>
                <Head>
                    <title>Usuários - Novo</title>
                </Head>

                <h1>Página Usuários - Novo</h1>

                <input
                    type='text'
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite o nome do usuário"
                />

                <input
                    type='email'
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o email do usuário"
                />

                <button onClick={handleAddUser}>Inserir</button>
            </div>
        </Layout>
    )
}

export default UsuariosNovo;