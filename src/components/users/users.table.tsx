import { useEffect, useState } from 'react'
// import '../../styles/users.css'
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
interface IUsers {
    id: number;
    name: string,
    email: string,
}

const UsersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const columns: ColumnsType<IUsers> = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (value, record) => {
                return (
                    <a>
                        {record.id}
                    </a>
                )
            }
        },
        {
            title: "Name",
            dataIndex: 'name'
        },
        {
            title: "Email",
            dataIndex: "email"
        }
    ]
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getData();
    }, [])
    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1>
                    User Table
                </h1>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setIsModalOpen(true)
                    }}
                >Add</Button>
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={() => {
                        setIsModalOpen(false)
                    }}
                    onCancel={() => {
                        setIsModalOpen(false)
                    }}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
            <Table
                rowKey={"id"}
                columns={columns}
                dataSource={listUsers}
            >

            </Table>
            {/* <table>
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

            </table> */}
        </div>
    )
}
export default UsersTable