import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;
const { Title } = Typography;

const UpdateItem = () => {
    const id = useParams();
    const [item, setItem] = useState({});
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [stockLimit, setStockLimit] = useState('');
    const [subCategory, setSubCategory] = useState([]);
    const [uniName, setUniName] = useState([]);
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);

    const handleUpdatedItem = () => {
        const updatedItem = { itemName, itemType, stockLimit, subCategory, uniName };
        axios.patch(`https://tranquil-beach-10309.herokuapp.com/item/${id.itemId}`, updatedItem)
            .then(res => {
                if (res) {
                    setSuccess(true);
                }
            })
    }

    useEffect(() => {
        axios.get(`https://tranquil-beach-10309.herokuapp.com/item/${id.itemId}`).then(
            res => setItem(res.data)
        );
    }, [id.itemId]);

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Row justify="center">
            <Col md={8} xs={24}>
                <Title type="success" style={{ margin: '20px 0 20px 0' }}>Update Item Information</Title>
                <Form form={form} name="control-hooks" onFinish={handleUpdatedItem} layout="vertical">
                    <Form.Item
                        label="Item Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setItemName(e.target.value)} placeholder={item.itemName} />
                    </Form.Item>
                    <Form.Item
                        label="Item Type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setItemType(e.target.value)} placeholder={item.itemType} />
                    </Form.Item>
                    <Form.Item
                        label="Stock Limit"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setStockLimit(e.target.value)} placeholder={item.stockLimit} />
                    </Form.Item>
                    <Form.Item
                        label="Sub Category Name"
                        rules={[
                            {
                                required: true,
                                type: 'array',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            onChange={setSubCategory}
                            placeholder="Select Sub Category"
                        >
                            <Option value="XXL">XXL</Option>
                            <Option value="XL">XL</Option>
                            <Option value="L">L</Option>
                            <Option value="M">M</Option>
                            <Option value="S">S</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Unit Name"
                    >
                        <Input onBlur={(e) => setUniName(e.target.value)} placeholder={item.uniName} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ backgroundColor: '#52c41a', color: 'white', border: '#52c41a' }} htmlType="submit">
                            Submit
                        </Button>
                        <Button style={{ margin: "0 5px 0 5px" }} type="primary" danger htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                        <Button type="primary">
                            <Link to="/">
                                Cancel
                            </Link>
                        </Button>
                    </Form.Item>
                </Form>
                {success && <Alert message="New Item Updated Successfully" type="success" showIcon />}
            </Col>
        </Row>
    );
};

export default UpdateItem;