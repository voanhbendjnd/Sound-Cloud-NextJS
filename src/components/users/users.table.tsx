import { useEffect, useState } from 'react'
// import '../../styles/users.css'
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { Button, Input, Modal, notification, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Password from 'antd/es/input/Password';
interface IUsers {
    id: number;
    name: string,
    email: string,
}
interface IRoles {
    id: number,
    name: string,
    description: string
}
const UsersTable = () => {
    const [api, contextHolder] = notification.useNotification();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [listRoles, setListRoles] = useState<IRoles[]>([]);
    const [roleId, setRole] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const handleCloseCreateModal = () => {
        setIsModalOpen(false)
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }
    const handleOk = async () => {
        const data = {
            name: name,
            email: email,
            roleId: roleId,
            management_password: {
                password: password,
                confirm_password: confirmPassword
            }
        }
        console.log("MY DATA: ", data)
        const res = await fetch(
            "http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
        }
        )
        const d = await res.json()
        if (res.status !== 201) {
            api.error({
                description: d.message,
                message: d.error
            })
        }
        else {
            api.success({
                message: "Success",
                description: "Create user success"
            })
            handleCloseCreateModal();
            await getData()
        }

    }
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
            {contextHolder}
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
                    title="Add new user"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    maskClosable={false}
                    onOk={() => {
                        handleOk()
                    }}
                    onCancel={() => {
                        handleCloseCreateModal();
                    }}
                >
                    <div>
                        <label>Name</label>
                        <Input
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <Input
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <Password
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <label>Confirm Password</label>
                        <Password
                            value={confirmPassword}
                            onChange={(event) => {
                                setConfirmPassword(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label>Role</label>
                        <Select
                            placeholder="Select role"
                            style={{ width: "100%" }}
                            options={listRoles.map(role => ({
                                label: role.name,
                                value: role.id,
                            }))}
                            onChange={(value) => setRole(value)}
                        ></Select>
                    </div>
                </Modal>
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