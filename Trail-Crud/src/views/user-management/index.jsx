import { EyeInvisibleFilled, EyeInvisibleOutlined, EyeTwoTone, MailOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { Fragment } from 'react';
import Dialog from '../../components/dialog';
import DataTable from '../../components/table';
import useUserManagementHook from './useUserManagmentHook';

export default function Index() {

  const {
    openModal, confirmLoading, columns, userData, values, errors, contextHolder, isLoading, openUpdateModal,
    setOpenModal, handleSubmit, handleChange, handleOpenModal, setOpenUpdateModal
  } = useUserManagementHook();

  return (
    <Fragment>
      {contextHolder}
      <div className='user-management'>
        <Button type='primary'
          onClick={handleOpenModal}
          className='add-user-btn'>
          Add New User <PlusOutlined />
        </Button>

        <DataTable
          dataSource={userData}
          columns={columns}
          pagination={false}
          loading={isLoading}
          scroll={{ y: 240 }}
          bordered
        />

        {/* Add User Dialog */}
        <Dialog
          okText={'Save'}
          open={openModal}
          confirmLoading={confirmLoading}
          setOpen={setOpenModal}
          className={"dialog-content"}
          width={500}
          onOk={handleSubmit}
        >
          <Space direction="vertical">
            <Input name='name' size="large" onChange={handleChange} autoComplete='new-password'
              value={values.name} placeholder="Enter Name" prefix={<UserOutlined />} />
            {errors.name && <span className='error-message'>{errors.name}</span>}

            <Input name='email' size="large" onChange={handleChange} autoComplete='new-password'
              value={values.email} placeholder="Enter Email" prefix={<MailOutlined />} />
            {errors.email && <span className='error-message'>{errors.email}</span>}

            <Input.Password name='password' size="large" onChange={handleChange}
              value={values.password} placeholder="Enter Password" autoComplete='new-password'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {errors.password && <span className='error-message'>{errors.password}</span>}

            <Input.Password name='confirmPassword' size="large" onChange={handleChange}
              value={values.confirmPassword} placeholder="Enter Confirm Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword}</span>}
          </Space>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog
          okText={'Update'}
          open={openUpdateModal}
          confirmLoading={confirmLoading}
          setOpen={setOpenUpdateModal}
          className={"dialog-content"}
          width={500}
          onOk={handleSubmit}
          title="Edit User"
        >
          <Space direction="vertical">
            <Input name='name' size="large" onChange={handleChange}
              value={values.name} placeholder="Enter Name" prefix={<UserOutlined />} />
            {errors.name && <span className='error-message'>{errors.name}</span>}

            <Input name='email' size="large" onChange={handleChange}
              value={values.email} placeholder="Enter Email" prefix={<MailOutlined />} />
            {errors.email && <span className='error-message'>{errors.email}</span>}
          </Space>
        </Dialog>
      </div>
    </Fragment>
  )
}
