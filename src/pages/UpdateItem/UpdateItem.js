import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;
const { Title } = Typography;

const UpdateItem = () => {
    const id = useParams();
    const [item, setItem] = useState({});
    const [loading, setloading] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        getItem();
    }, []);

    const getItem = async () => {
        setloading(false);
        await axios.get(`https://tranquil-beach-10309.herokuapp.com/item/${id.itemId}`).then(
            res => setItem(res.data)
        );
    };

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Row justify="center">
            <Col md={8} xs={24}>
                <Title type="success" style={{ margin: '20px 0 20px 0' }}>Update Item Information</Title>
                <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Item Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder={item.itemName} value={item.itemName} />
                    </Form.Item>
                    <Form.Item
                        label="Item Type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder={item.itemType} value={item.itemType} />
                    </Form.Item>
                    <Form.Item
                        label="Stock Limit"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder={item.stockLimit} value={item.stockLimit} />
                    </Form.Item>
                    <Form.Item label="Sub Category Name">
                        <Select
                            value={item.subCategory}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Unit Name"
                    >
                        <Input value={item.uniName} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default UpdateItem;