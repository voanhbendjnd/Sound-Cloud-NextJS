import { useEffect, useState } from 'react'
// import '../../styles/users.css'
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { Button, notification, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserCreateModal from './users.create.modal';
import '../../App.scss'
import UserUpdateModal from './users.update.modal';
export interface IUsers {
    id: number;
    name: string,
    email: string,
    password: string,
    confirm_password: string,
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
    const [api, contextHolder] = notification.useNotification();

    const [dataUser, setDataUser] = useState<IUsers>();
    const [listRoles, setListRoles] = useState<IRoles[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [meta, setMeta] = useState({
        page: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const handleDelete = async (user: IUsers) => {
        const res = await fetch(
            `http://localhost:8080/api/v1/users/${user.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (res.status !== 200) {
            const d = await res.json()
            api.error({
                description: d.message,
                message: d.error
            })
        }
        else {
            api.success({
                message: "Delete User",
                description: "Delete User Successfully"
            })
            await getData();
        }
    }
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
                console.log(value)
                return (
                    <div style={{ display: "flex", gap: "10px" }}>

                        <Button style={{ backgroundColor: "white", color: "green", border: "2px solid green" }}
                            onClick={() => {
                                setIsOpenUpdateModal(true)
                                setDataUser(record)
                            }}
                        >Edit</Button>
                        <Popconfirm
                            description={"Are You Sure Delete This User?"}
                            title={"Delete User"}
                            placement='top'
                            okText="YES"
                            cancelText="NO"
                            onConfirm={() => {
                                handleDelete(record)
                            }}

                        >
                            <Button type="primary" danger ghost>
                                Delete
                            </Button>
                        </Popconfirm>


                    </div>
                )
            }
        }
    ]
    const [listUsers, setListUsers] = useState<IUsers[]>([]);
    const getData = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/users?page=${meta.page}&size=${meta.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const d = await res.json();
        console.log(d.data);
        setListUsers(d.data?.result || [])
        setMeta({
            page: d.data.meta.page,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total
        })
    }
    const getRole = async () => {
        const res = await fetch("http://localhost:8080/api/v1/roles", {
            headers: {
                "Content-Type": "application/json",
            }
        })
        const d = await res.json();
        setListRoles(d.data?.result || []);

    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getRole();
    }, [])
    const handleOnChange = async (page: number, pageSize: number) => {

        const res = await fetch(
            `http://localhost:8080/api/v1/users?page=${page}&size=${pageSize}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const d = await res.json();
        if (!d.data) {
            api.error({
                message: d.error,
                description: d.message
            })
        }
        else {
            setListUsers(d.data.result)
            setMeta({
                page: d.data.meta.page,
                pageSize: d.data.meta.pageSize,
                pages: d.data.meta.pages,
                total: d.data.meta.total
            })
        }
    }
    return (
        <div>
            {contextHolder}
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
                pagination={{
                    current: meta.page,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize),
                    showSizeChanger: true
                }}
            >

            </Table>
        </div >
    )
}
export default UsersTable