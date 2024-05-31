import { Table as AntDataTable, Space } from 'antd';
import React, { useMemo } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const DataTable = ({ dataSource, columns, ...rest }) => {


    return (
        <AntDataTable
            dataSource={dataSource ?? []}
            columns={columns}
            {...rest}
        />
    )
}


export default DataTable