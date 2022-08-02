import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Todo } from "../types/Todo";

const Todo = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTodoList()
    }, []);

    const loadTodoList = async () => {
        setLoading(true)
        const list = await fetch(`https://jsonplaceholder.typicode.com/todos`).then(response => response.json());
        setTodoList(list);
        setLoading(false)
    }

    return (
        <Layout>
            <div>
                <h1>Todo List</h1>

                {loading &&
                    <div>Loading...</div>
                }

                <ul>
                    {todoList.map((item, index) => (
                        <li key={index}>{item.title} - {item.completed ? 'DONE' : 'UNDONE'}</li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export default Todo;

// export const getServerSideProps = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
//     const todoList: Todo[] = await res.json();

//     return {
//         props: {
//             todo: todoList
//         }
//     }
// }