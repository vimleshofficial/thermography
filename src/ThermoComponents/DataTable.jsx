import React from 'react'
import { Table, Icon } from 'antd'
import ColorBox from '../CanvasComponents/ColorBox'

const DataTable = ({ deleteDrawing, data }) => {
  const handleDelete = key => {
    deleteDrawing(key)
  }
  const dataSource = data
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'count',
      key: 'count',
      render: (text, record) => (
        <span>
          {text} <ColorBox bgColor={record.color} />
        </span>
      ),
      sorter: (a, b) => a.count.length - b.count.length,
    },
    {
      title: 'MAX',
      dataIndex: 'mx',
      key: 'mx',
      sorter: (a, b) => a.mx - b.mx,
    },
    {
      title: 'MIN',
      dataIndex: 'mi',
      key: 'mi',
      sorter: (a, b) => a.mi - b.mi,
    },
    {
      title: 'AVERAGE',
      dataIndex: 'avr',
      sorter: (a, b) => a.avr - b.avr,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Icon
          type="close-circle"
          onClick={() => handleDelete(record.key)}
          title="Remove"
          theme="twoTone"
          twoToneColor="#FF0000"
        />
      ),
    },
  ]
  return <Table dataSource={dataSource} columns={columns} rowKey="count" />
}

export default DataTable
