import { Input, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import type { IRoles, IUsers } from "./users.table";

interface IProps {
    isModalOpen: boolean
    setIsModalOpen: (v: boolean) => void
    getData: () => void
    listRoles: IRoles[]
    dataUser: IUsers | undefined
    setDataUser: (v: IUsers) => void
}


const UserUpdateModal = (props: IProps) => {
    const { isModalOpen, setIsModalOpen, getData, listRoles, dataUser, setDataUser } = props;
    const [api, contextHolder] = notification.useNotification();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [roleId, setRole] = useState<number>(0);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    useEffect(() => {
        if (dataUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(dataUser.name);
            setEmail(dataUser.email)
            setRole(dataUser.role?.id ?? 0)
            setPassword("")
            setConfirmPassword("")
        }
    }, [dataUser])
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
            await getData()
            setIsModalOpen(false)
        }

    }

    return (
        <div>
            {contextHolder}
            <Modal
                title="Update User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                maskClosable={false}
                onOk={() => {
                    handleOk()
                }}
                onCancel={() => {
                    setIsModalOpen(false)
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
                    <label>Role</label>
                    <Select
                        placeholder="Select role"
                        value={roleId > 0 ? roleId : undefined}
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
    )
}

export default UserUpdateModal