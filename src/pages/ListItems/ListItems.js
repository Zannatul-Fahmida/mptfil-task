import { Space, Table, Row, Col, Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const { Title } = Typography;

const ListItems = () => {
    const [size, setSize] = useState('large');
    const [items, setItems] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        getItems();
    }, []);
    const getItems = async () => {
        setloading(false);
        await axios.get("https://tranquil-beach-10309.herokuapp.com/items").then(
            res => {
                setItems(
                    res.data.map(item => ({
                        ItemName: item.itemName,
                        ItemType: item.itemType,
                        StockLimit: item.stockLimit,
                        UnitName: item.uniName,
                        SubCategory: item.subCategory,
                        id: item._id,
                        key: item._id
                    }))
                );
            }
        );
    };
    const columns = [
        {
            title: "Item Type",
            dataIndex: "ItemType"
        },
        {
            title: "Item Name",
            dataIndex: "ItemName"
        },
        {
            title: "Sub-Category",
            dataIndex: "SubCategory"
        },
        {
            title: "Unit Name",
            dataIndex: "UnitName"
        },
        {
            title: "Stock Limit",
            dataIndex: "StockLimit"
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => (
                <Space size="middle">
                    <a>Delete</a>
                    <a>Update</a>
                </Space>
            ),
        }
    ];

    return (
        <div>
            <Title type="success">Items List</Title>
            <Space align="center" direction="vertical">
            <Button type="dashed" size={size}>+ Create Item</Button>
            </Space>
            <Row justify="center">
                <Col span={16}>
                    {
                        loading ? (
                            "Loading"
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={items}
                                pagination={{ pageSize: 10 }}
                            />
                        )
                    }
                </Col>
            </Row>
        </div>
    );
};

export default ListItems;