import React, { useState } from 'react';
import { Form, Row, Col, Button, Typography, Input, Select, Alert } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { Title } = Typography;
const { Option } = Select;

const CreateItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [stockLimit, setStockLimit] = useState('');
    const [subCategory, setSubCategory] = useState([]);
    const [uniName, setUniName] = useState([]);
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);

    const handleItem = e => {
        const newItem = { itemName, itemType, stockLimit, subCategory, uniName };
        axios.post("https://tranquil-beach-10309.herokuapp.com/item", newItem)
            .then(res => {
                if (res.data) {
                    setSuccess(true);
                    form.resetFields();
                }
            })
    }
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Row justify="center">
            <Col md={8} xs={24}>
                <Title type="success" style={{ margin: '20px 0 20px 0' }}>Create Item Information</Title>
                <Form form={form} name="control-hooks" layout="vertical" onFinish={handleItem}>
                    <Form.Item
                        name="itemName"
                        label="Item Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setItemName(e.target.value)} placeholder="Item Name" />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Item Type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setItemType(e.target.value)} placeholder="Item Type" />
                    </Form.Item>
                    <Form.Item
                        name="limit"
                        label="Stock Limit"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setStockLimit(e.target.value)} placeholder="Stock Limit [number]" />
                    </Form.Item>
                    <Form.Item
                        name="subName"
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
                            placeholder="SubCategory Name"
                        >
                            <Option value="XXL">XXL</Option>
                            <Option value="XL">XL</Option>
                            <Option value="L">L</Option>
                            <Option value="M">M</Option>
                            <Option value="S">S</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="unit"
                        label="Unit Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setUniName(e.target.value)} placeholder="Unit Name" />
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
                {success && <Alert message="New Item Added Successfully" type="success" showIcon />}
            </Col>
        </Row>
    );
};

export default CreateItem;