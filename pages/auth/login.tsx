import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../../styles/Auth.module.css'

const Login = () => {
    const [name, setName] = useState('Admin');
    const [email, setEmail] = useState('admin@email.com');
    const [error, setError] = useState('');

    const router = useRouter();

    const handlerSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            name,
            email,
            callbackUrl: `${window.location.origin}`,
        });

        if (res.error) {
            setError(res.error)
        }

        if (res.url) router.push(res.url);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>LOGIN</div>
            {error &&
                <div>{error}</div>
            }
            <form onSubmit={handlerSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite o nome" />
                <br /><br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email" />
                <br /><br />
                <input type="submit" value="Logar" />
            </form>
        </div>
    );
}

export default Login;
