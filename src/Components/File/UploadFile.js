import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Dropdown, message, Table, Tag, Upload, Button, Flex, Space } from 'antd';
import { DownOutlined, DownloadOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';

import AuthService from '../../Services/AuthService';


const { Dragger } = Upload;
const API_URL = process.env.REACT_APP_API_URL;


const columns = [
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
    key: 'name',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type) => {
      let color;
      switch (type) {
        case 'unique':
          color = 'green';
          break;
        case 'invalid':
          color = 'red';
          break;
        case 'duplicated_in_file':
          color = 'yellow'
          break;
        case 'duplicated_in_database':
          color = 'blue'
          break;
        default:
          color = 'gray';
          break
      }
      return (
        <Tag color={color} key={type}>
          {type.toUpperCase()}
        </Tag>
      );
    },
  },
];


const UploadFile = () => {
  const [token, _] = useState(AuthService.getToken());
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);
  const [fileObject, setFileObject] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  const handleUploadFile = async (options) => {
    const { file, onSuccess, onError } = options;
    setDataSource([]);
    setIsReadyToDownload(false);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const headers = {}
      headers['Content-Type'] = 'multipart/form-data'
      if (token) {
        headers['Authorization'] = `Bearer ${token.access}`;
      }

      const response = await axios.post(
        API_URL + "/file/upload",
        formData,
        { headers },
      );

      console.log('Upload response:', response.data);
      console.log('Upload response status:', response.status);

      if (response.status === 201) {
        onSuccess(response.data);
        setFileObject(response.data)
        console.log('File uploaded successfully:', response.data)
        return response.data;
      } else {
        onError(response.data);
        return null;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      onError('Error uploading file');
      return null;
    }
  };

  const handleGetProcessedFileResult = async (fileId, currentPage, pageSize, retryCount = 10, timeOut = 1000) => {
    try {
      const response = await axios.get(
        API_URL + "/file/" + fileId + "/results",
        {
          params: {
            page: currentPage,
            page_size: pageSize,
          }
        },
      );

      if (response.status === 200) {
        if (response.data.data.length === 0) {
          if (retryCount > 0) {
            console.log('Retrying to fetch data...');
            setTimeout(function () {
              timeOut = Math.min(timeOut * 2, 5000);
              message.info('This file is processing, please wait in a few seconds.')
              handleGetProcessedFileResult(fileId, currentPage, pageSize, retryCount - 1, timeOut);
            }, timeOut);
          } else {
            message.error('Failed to fetch data: Empty response');
          }
        } else {
          setDataSource(response.data.data);
          setTotal(response.data.total);
          setTotalPage(response.data.total_page);
          setCurrentPage(response.data.page);
          setPageSize(response.data.page_size);
          setIsReadyToDownload(true);
        }
      } else {
        message.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Error fetching data');
    }
  };

  const handleCustomRequest = async ({ options }) => {
    const fileObject = await handleUploadFile(options);
    if (fileObject) {
      handleGetProcessedFileResult(fileObject.id, currentPage, pageSize);
    } else {
      message.error('Failed to upload file');
    }
  }

  const handleDownloadFile = async (event) => {
    console.log('Download file:', event.key);
    let fileName = 'validated_data.csv';
    if (fileObject !== null) {
      fileName = fileObject.name + "." + fileObject.tag;
    }

    let query_params = "to_download=true";
    if (event.key) {
      query_params += "&download_file_tag=" + event.key;
    }

    try {
      const response = await fetch(
        API_URL + "/file/" + fileObject.id + "/results" + "?" + query_params,
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      if (response.status === 200) {
        console.log('Download response:', response.data);
        console.log('Download response status:', response.status);
        message.success('File downloaded successfully');
      } else {
        message.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      message.error('Error downloading file');
    }
  }

  const handlePageChange = (page, pageSize) => {
    console.log('Page change:', page, pageSize);
    setCurrentPage(page);
    setPageSize(pageSize);
    handleGetProcessedFileResult(fileObject.id, page, pageSize);
  };

  const customRequest = (options) => {
    handleCustomRequest({ options });
  };

  const onChangeProcess = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      onUploadSuccess(info);
    } else if (info.file.status === 'error') {
      onUploadError(info);
    }
  }

  const onUploadSuccess = (info) => {
    console.log('File uploaded successfully:', info);
    message.success(`${info.name} uploaded successfully`);
  };

  const onUploadError = (error) => {
    console.error('File upload error:', error);
    message.error('File upload failed');
  };

  const items = [
    {
      label: 'Download as CSV',
      key: 'csv',
    },
    {
      label: 'Download as XLSX',
      key: 'xlsx',
    },
  ]
  const menuProps = {
    items,
    disabled: !isReadyToDownload,
    onClick: handleDownloadFile,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <Dragger
          customRequest={customRequest}
          onChange={onChangeProcess}
          maxCount={1}
          multiple={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-text">Only support for CSV, or XLSX file</p>
        </Dragger>
      </div>

      <div>
        <Flex gap="middle" align="end" vertical>
            <Dropdown menu={menuProps}>
              <Button type="primary">
                <Space>
                  Download
                  <DownloadOutlined />
                </Space>
              </Button>
            </Dropdown>
        </Flex>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: 240 }}
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

    </div >
  );
};

export default UploadFile;
