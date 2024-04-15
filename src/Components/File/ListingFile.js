import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Flex, message, Table, Tag } from 'antd';

import AuthService from '../../Services/AuthService';


const API_URL = process.env.REACT_APP_API_URL;
const keyMetricColumns = [
    {
        title: 'Name',
        dataIndex: 'file',
        key: 'file_name',
        render: (file) => {
            return (
                <div style={{ textAlign: 'center' }}>
                    <b>{file.name}</b>
                </div>
            )
        }
    },
    {
        title: 'Total Unique',
        dataIndex: 'total_unique',
        key: 'total_unique',
        render: (text) => {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Tag color={'green'}>
                        {text}
                    </Tag>
                </div>
            )
        }
    },
    {
        title: 'Total Empty',
        dataIndex: 'total_empty',
        key: 'total_empty',
        render: (text) => {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Tag color={'gray'}>
                        {text}
                    </Tag>
                </div>
            )
        }
    },
    {
        title: 'Total Invalid',
        dataIndex: 'total_invalid',
        key: 'total_invalid',
        render: (text) => {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Tag color={'red'}>
                        {text}
                    </Tag>
                </div>
            )
        }
    },
    {
        title: "Total Duplicated in File",
        dataIndex: 'total_duplicated_in_file',
        key: 'total_duplicated_in_file',
        render: (text) => {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Tag color={'yellow'}>
                        {text}
                    </Tag>
                </div>
            )
        }
    },
    {
        title: "Total Duplicated in Database",
        dataIndex: 'total_duplicated_in_database',
        key: 'total_duplicated_in_database',
        render: (text) => {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Tag color={'blue'}>
                        {text}
                    </Tag>
                </div>
            )
        }
    },
    {
        title: 'Update at',
        dataIndex: 'file',
        key: 'file_update_at',
        render: (file) => {
            const dateObject = new Date(file.updated_at);
            return dateObject.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    },
]


const ListFile = () => {
    const [token, setToken] = useState(AuthService.getToken());
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    
    const handleListingFile = async (page, pageSize) => {
        try {
            const query_params = "page=" + page + "&page_size=" + pageSize;
            const response = await axios.get(
                API_URL + '/file/all' + "?" + query_params,
                {
                    headers: {
                        'Authorization': `Bearer ${token.access}`
                    },
                }
            )
            if (response.status === 200) {
                setDataSource(response.data.data);
                setTotal(response.data.total);
                setTotalPage(response.data.total_page);
                setCurrentPage(response.data.page);
                setPageSize(response.data.page_size);
            }
        } catch (error) {
            message.error(error);
        }
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        handleListingFile(page, pageSize);
    }

    useEffect(() => {
        handlePageChange(1, 2);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '20px' }}>
                <Table
                    bordered
                    columns={keyMetricColumns}
                    dataSource={dataSource}
                    scroll={{ y: 240 }}
                    size='small'
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: total,
                        totalPage: totalPage,
                        onChange: handlePageChange,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '50'],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                      }}
                />
            </div>
        </div>
    );
}


export default ListFile;
