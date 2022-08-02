import Link from 'next/link';
import styles from './Navbar.module.css';
import { navigationLinks } from '../../utils/data';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

const NavBar = () => {
    const router = useRouter()
    const { data: session } = useSession();

    return (
        <div className={styles.container}>
            <ul className={styles.navbar}>
                {navigationLinks.map((link, index) => (
                    <li key={index} className={`${styles.navbar} ${link.path.includes(router.pathname) ? styles.active : null}`}>
                        <Link href={link.path[0]}>{link.label}</Link>
                    </li>
                ))}
                <li>
                    {session &&
                        <button onClick={() => signOut()}>Sair</button>
                    }

                    {!session &&
                        <Link href={"/auth/login"}>
                            <a>Login</a>
                        </Link>
                    }
                </li>
            </ul>
        </div>
    )
}

export default NavBar;