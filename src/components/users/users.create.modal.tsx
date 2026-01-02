import { Input, Modal, notification, Select } from "antd";
import Password from "antd/es/input/Password";
import { useState } from "react";
import type { IRoles } from "./users.table";

interface IProps {
    isModalOpen: boolean
    setIsModalOpen: (v: boolean) => void
    getData: () => void
    listRoles: IRoles[]
}

const UserCreateModal = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();

    const { isModalOpen, setIsModalOpen, getData, listRoles } = props
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [roleId, setRole] = useState<number>(0);
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
                description: "Create User Successfully"
            })
            handleCloseCreateModal();
            await getData()
        }

    }
    return (
        <div>
            {contextHolder}
            <Modal
                title="Add new User"
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
                        options={listRoles?.map(role => ({
                            label: role.name,
                            value: role.id,
                        }))}
                        onChange={(value) => setRole(value)}
                    ></Select>
                </div>
            </Modal>
        </div>
    )
}

export default UserCreateModal;