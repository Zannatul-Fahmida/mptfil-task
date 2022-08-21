import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;
const { Title } = Typography;

const UpdateItem = () => {
    const id = useParams();
    const [item, setItem] = useState({});
    const [itemName, setItemName] = useState(`${item?.itemName}`);
    const [itemType, setItemType] = useState(`${item?.itemType}`);
    const [stockLimit, setStockLimit] = useState(`${item?.stockLimit}`);
    const [subCategory, setSubCategory] = useState(`${item?.subCategory}`);
    const [uniName, setUniName] = useState(`${item?.uniName}`);
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);

    const handleUpdatedItem = () => {
        const updatedItem = { itemName, itemType, stockLimit, subCategory, uniName };
        axios.patch(`https://tranquil-beach-10309.herokuapp.com/item/${id.itemId}`, updatedItem)
            .then(res => {
                if (res.data) {
                    setSuccess(true);
                    console.log(res.data)
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
                        <Input onBlur={(e) => setItemName(e.target.value)} placeholder={item.itemName} value={item.itemName} />
                    </Form.Item>
                    <Form.Item
                        label="Item Type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setItemType(e.target.value)} placeholder={item.itemType} value={item.itemType} />
                    </Form.Item>
                    <Form.Item
                        label="Stock Limit"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onBlur={(e) => setStockLimit(e.target.value)} placeholder={item.stockLimit} value={item.stockLimit} />
                    </Form.Item>
                    <Form.Item label="Sub Category Name">
                        <Select
                            mode="multiple"
                            onBlur={setSubCategory}
                            placeholder="Select Sub Category">
                            {
                                item?.subCategory?.map(it =>
                                    <Option key={it} value={it}>{it}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Unit Name"
                    >
                        <Input onBlur={(e) => setUniName(e.target.value)} value={item.uniName} />
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

export default UpdateItem;