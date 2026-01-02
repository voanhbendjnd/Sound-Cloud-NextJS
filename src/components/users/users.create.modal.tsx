import { Checkbox, Form, Input, Modal, notification, Select } from "antd";
import type { IRoles, IUsers } from "./users.table";
import { useForm } from "antd/es/form/Form";

interface IProps {
    isModalOpen: boolean
    setIsModalOpen: (v: boolean) => void
    getData: () => void
    listRoles: IRoles[]
}

const UserCreateModal = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();
    const [form] = useForm();
    const { isModalOpen, setIsModalOpen, getData, listRoles } = props
    const handleCloseCreateModal = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    const onFinish = async (values: IUsers) => {
        const data = {
            name: values.name,
            email: values.email,
            management_password: {
                password: values.password,
                confirm_password: values.confirm_password,

            },
            roleId: values?.role?.id
        };
        const res = await fetch(
            "http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
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
                    form.submit()
                }}
                onCancel={() => {
                    handleCloseCreateModal();
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item<IUsers>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<IUsers>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<IUsers>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your confirm password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<IUsers>
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[{ required: true, message: 'Please input your confirm password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<IUsers>
                        label="Role"
                        name={['role', 'id']}
                        rules={[{ required: true, message: 'Please input your role!' }]}
                    >
                        <Select

                            options={listRoles?.map(role => ({
                                label: role.name,
                                value: role.id,
                            }))} />
                    </Form.Item>

                    <Form.Item<IUsers>
                        valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>


                </Form>
                {/* <div>
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
                </div> */}
            </Modal>
        </div>
    )
}

export default UserCreateModal;