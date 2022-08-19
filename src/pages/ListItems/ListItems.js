import { Space, Table, Row, Col, Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
                        SubCategory: item.subCategory.join(", "),
                        id: item._id,
                        key: item._id
                    }))
                );
            }
        );
    };
    const deleteItem = async (Id) => {
        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed) {
            await axios.delete(`https://tranquil-beach-10309.herokuapp.com/item/${Id}`).then(
                res => {
                    if (res.status == '200') {
                        window.location.reload();
                    }
                }
            ).catch(err => {
                console.log(err)
            });
        }
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
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Space size="middle">
                    <Button type="primary"><Link to={`/update/${id}`}>Update</Link></Button>
                    <Button type="primary" danger onClick={() => deleteItem(id)}>Delete</Button>
                </Space>
            ),
        }
    ];

    return (
        <div>
            <Title type="success" style={{ margin: '20px 0 20px 0' }}>Items Information List</Title>
            <Space align="center" direction="vertical">
                <Button
                    type="dashed"
                    size={size}
                    style={{ margin: '0 0 20px 0', color: 'green', fontWeight: 'bold', borderColor: '#52c41a' }}
                >
                    <Link to="/createItem">+ Create Item</Link>
                </Button>
            </Space>
            <Row justify="center">
                <Col span={18}>
                    {
                        loading ? (
                            "Loading"
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={items}
                                pagination={{ pageSize: 5 }}
                                bordered={true}
                            />
                        )
                    }
                </Col>
            </Row>
        </div>
    );
};

export default ListItems;