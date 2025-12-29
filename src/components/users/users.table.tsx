import { useEffect, useState } from 'react'
import '../../styles/users.css'
interface IUsers {
    id: number;
    name: string,
    email: string,
}
const UsersTable = () => {
    const [listUsers, setListUsers] = useState<IUsers[]>([]);
    const getData = async () => {
        const res = await fetch("http://localhost:8080/api/v1/users", {
            method: "GET",
            // body: JSON.stringify({
            //     email: "benva.ce190709@gmail.com",
            //     password: "123456"
            // }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const d = await res.json();
        console.log(d.result);
        setListUsers(d.result)
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <div>
                User Table
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                    </tr>

                </thead>
                <tbody>
                    {
                        listUsers.map((user: IUsers) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}
export default UsersTable