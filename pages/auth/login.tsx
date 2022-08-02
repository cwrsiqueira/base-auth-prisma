import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../../styles/Auth.module.css'

const Login = () => {
    const [email, setEmail] = useState('admin@email.com');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handlerSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: `${window.location.origin}`,
        });

        if (res.error) {
            switch (res.error) {
                case "CredentialsSignin":
                    setError("Credenciais Inválidas")
                    break;

                default:
                    setError(res.error)
                    break;
            }
        }

        if (res.url) router.push(res.url);
    }

    return (
        <div className={styles.container}>

            <Head>
                <title>Site | Login</title>
            </Head>

            <Image src={"/vercel.svg"} alt="logo" width={200} height={200} />

            <div className={styles.title}>Login</div>

            <div className={styles.errorArea}>
                <div className={error ? styles.error : ''}>{error}</div>
            </div>

            <form onSubmit={handlerSubmit}>
                <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email" />
                <br /><br />
                <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a senha" />
                <br /><br />
                <input className={`${styles.input} ${styles.btn}`} type="submit" value="Logar" />
            </form>

            <div className={styles.link}>
                <Link href={"/auth/forgot-password"}>
                    <a>Esqueci a senha</a>
                </Link>
            </div>

            <div className={styles.link}>
                <Link href={"/auth/register"}>
                    <a>Não tenho cadastro</a>
                </Link>
            </div>
        </div>
    );
}

export default Login;
