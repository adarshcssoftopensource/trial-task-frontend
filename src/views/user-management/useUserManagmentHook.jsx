import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Popconfirm, Space, notification } from 'antd';
import { useFormik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { createUser, deleteUser, getAllUsers, updateUser } from '../../apis/services';
import { z } from "zod";
import { toFormikValidationSchema } from 'zod-formik-adapter';

const ValidationSchema = z.object({
    name: z
        .string({ required_error: 'Field is required' })
        .min(3, "Username is too short")
        .max(20, "Username is too long"),
    email: z.string({ required_error: 'Field is required' }).email("Invalid email address").min(5, "Email is too short"),
    password: z.string({ required_error: 'Field is required' }).min(8, "Password is too short").max(10, 'Password is too long'),
    confirmPassword: z.string({ required_error: 'Field is required' }).min(6, "Password is too short").max(10, 'Password is too long'),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
);

const ValidationSchema2 = z.object({
    name: z
        .string({ required_error: 'Field is required' })
        .min(3, "Username is too short")
        .max(20, "Username is too long"),
    email: z.string({ required_error: 'Field is required' }).email("Invalid email address").min(5, "Email is too short"),
})


const key = 'updatable';


const useUserManagementHook = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users_data'],
        queryFn: async () => await getAllUsers(),
    });


    if (isError) return error.message;

    const { mutate: createUserMutate } = useMutation({
        mutationFn: async (payload) => await createUser(payload), mutationKey: ['createuser'],
    });
    const { mutate: deleteUserMutate } = useMutation({
        mutationFn: async (id) => await deleteUser(id),
        mutationKey: ['delete_user'],
    })
    const { mutate: updateUserMutate } = useMutation({
        mutationFn: async (payload) => await updateUser(payload),
        mutationKey: ['update_user'],
    })

    const handleOpenModal = () => setOpenModal(!openModal);

    const openNotification = (message, descriptipon) => {
        api.open({
            key,
            message: message,
            description: descriptipon,
            type: 'success'
        });
    };

    const { handleChange, values, errors, handleSubmit, resetForm, setValues } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: toFormikValidationSchema(openUpdateModal ? ValidationSchema2 : ValidationSchema),
        enableReinitialize: true,
        onSubmit: async (values) => {
            setConfirmLoading(true);
            const payload = {
                name: values.name,
                email: values.email,
                password: values.password
            }
            try {
                if (openUpdateModal) {
                    updateUserMutate(values, {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ['users_data'] })
                            setOpenUpdateModal(false);
                            openNotification("Updated user", 'User updated successfully');
                        }
                    });

                } else {
                    createUserMutate(payload, {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ['users_data'] })
                            setOpenModal(false);
                            openNotification('Created user', 'User created successfully');
                        },
                        onError: (err) => {
                            console.log(err);
                        }
                    })
                }
                setConfirmLoading(false);
                resetForm();
            } catch (error) {
                resetForm();
                setConfirmLoading(false);
            }
        },
    });
    const confirmDelete = useCallback(async (id) => {
        deleteUserMutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users_data'] })
                openNotification('User Deleted', 'User deleted successfully');
            }
        });
    }, [])

    const columns = useMemo(() => (
        [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => {
                    const { id } = record
                    return (
                        <Space size="middle" >
                            <EditOutlined onClick={() => { setValues(record); setOpenUpdateModal(true) }} />
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                icon={
                                    <QuestionCircleOutlined
                                        style={{
                                            color: 'red',
                                        }}
                                    />
                                }
                                onConfirm={() => confirmDelete(id)}
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </Space>
                    )
                }
            },
        ]
    ), [])

    return {
        userData: data?.data ?? [], columns, openModal, errors, isLoading, openUpdateModal,
        values, confirmLoading, contextHolder, setOpenModal, setConfirmLoading,
        handleSubmit, handleChange, handleOpenModal, setOpenUpdateModal,
    }
}

export default useUserManagementHook