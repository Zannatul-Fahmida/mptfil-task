import React, { useState } from 'react';
import { Form, Row, Col, Button, Typography, Input, Select, Alert, Tooltip, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [newSub, setNewSub] = useState('');
    const [newUnit, setNewUnit] = useState('');

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
                    <Row justify="center" align="middle">
                        <Col span={20}>
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
                                    {newSub && <Option value={newSub}>{newSub}</Option>}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Tooltip title="Add">
                                <Button shape="circle" onClick={() => setModal1Visible(true)} icon={<PlusOutlined />} size="large" />
                            </Tooltip>
                            <Modal
                                title="Add New Sub Category Name"
                                centered
                                visible={modal1Visible}
                                onOk={() => setModal1Visible(false)}
                                onCancel={() => setModal1Visible(false)}
                            >
                                <Input onChange={(e) => setNewSub(e.target.value)} placeholder="Enter Sub Category Name" />
                            </Modal>
                        </Col>
                    </Row>
                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item
                                label="Unit Name"
                                rules={[
                                    {
                                        required: true,
                                        type: 'array',
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    onChange={setUniName}
                                    placeholder="Select Unit Name"
                                >
                                    <Option value="Piece">Piece</Option>
                                    {newUnit && <Option value={newUnit}>{newUnit}</Option>}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Tooltip title="Add">
                                <Button shape="circle" onClick={() => setModal2Visible(true)} icon={<PlusOutlined />} size="large" />
                            </Tooltip>
                            <Modal
                                title="Add New Unit Name"
                                centered
                                visible={modal2Visible}
                                onOk={() => setModal2Visible(false)}
                                onCancel={() => setModal2Visible(false)}
                            >
                                <Input onChange={(e) => setNewUnit(e.target.value)} placeholder="Enter Unit Name" />
                            </Modal>
                        </Col>
                    </Row>
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