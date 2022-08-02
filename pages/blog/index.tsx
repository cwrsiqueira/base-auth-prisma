import Link from "../../node_modules/next/link";
import React from "react";
import { Post } from "../../types/Post";
import { Layout } from "../../components/Layout";

type Props = {
    name: string;
    posts: Post[];
}

const Blog = ({ name, posts }: Props) => {
    return (
        <Layout>
            <div>
                <h1>Blog</h1>
                <p>Blog do {name}</p>
                <ul>
                    {posts.map((post, index) => (
                        <li key={index}>
                            <Link href={`/blog/${post.id}`}>
                                <a>{post.id} - {post.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {

    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await res.json();

    return {
        props: {
            name: "Carlos",
            posts
        },
        revalidate: 7200
    }
}

export default Blog;