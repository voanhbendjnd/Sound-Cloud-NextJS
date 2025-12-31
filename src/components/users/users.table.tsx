import { useEffect, useState } from 'react'
// import '../../styles/users.css'
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserCreateModal from './users.create.modal';
import '../../App.scss'
import UserUpdateModal from './users.update.modal';
export interface IUsers {
    id: number;
    name: string,
    email: string,
    role: {
        id: number,
        name: string,
    }

}
export interface IRoles {
    id: number,
    name: string,
    description: string
}

const UsersTable = () => {
    const [dataUser, setDataUser] = useState<IUsers>();
    const [listRoles, setListRoles] = useState<IRoles[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

    const columns: ColumnsType<IUsers> = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (_value, record) => {
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
        },
        {
            title: "Actions",
            render: (value, record) => {
                return (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button style={{ backgroundColor: "white", color: "green", border: "2px solid green" }}
                            onClick={() => {
                                setIsOpenUpdateModal(true)
                                setDataUser(record)
                            }}
                        >Edit</Button>
                        <Button type="primary" danger ghost>
                            Delete
                        </Button>
                    </div>
                )
            }
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
    const getRole = async () => {
        const res = await fetch("http://localhost:8080/api/v1/roles", {
            headers: {
                "Content-Type": "application/json",
            }
        })
        const d = await res.json();
        setListRoles(d.result);

    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getData();
        getRole();
    }, [])
    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-between",
                alignItems: "flex-start"
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
                <UserCreateModal
                    listRoles={listRoles}
                    getData={getData}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
                <UserUpdateModal
                    listRoles={listRoles}
                    getData={getData}
                    isModalOpen={isOpenUpdateModal}
                    setIsModalOpen={setIsOpenUpdateModal}
                    dataUser={dataUser}
                    setDataUser={setDataUser}
                />

            </div>
            <Table
                rowKey={"id"}
                columns={columns}
                dataSource={listUsers}
            >

            </Table>
        </div>
    )
}
export default UsersTable