import React, { Component } from "react";
import { Card } from "antd";
import "../../App.css";
import { Modal, Form, Input, Select, Button } from "antd";

const { Meta } = Card;

export default class PokeCard extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const { Option } = Select;
    return (
      <div>
        <Card
          hoverable
          className="antd-card"
          cover={
            <img
              src={this.props.pokemon.sprites.front_default}
              alt="Not Found"
            />
          }
          bordered={true}
          style={{
            border: "1px solid rgb(0, 72, 131)",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Meta
            title={"Pokemon: " + this.props.pokemon.name}
            // style={{
            //   border: "1px solid rgb(0, 72, 131)",
            //   width: "100%",
            //   textAlign: "center",
            // }}
          ></Meta>

          <br></br>
          <Button type="primary" onClick={this.showModal}>
            Ver Características
          </Button>
        </Card>

        <Modal
          title={" Características de " + this.props.pokemon.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Confirmar"
          cancelText="Cancelar"
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <Form
            name="control-ref"
            initialValues={{
              title: this.props.pokemon.name,
              base_experience: this.props.pokemon.base_experience,
              weight: this.props.pokemon.weight,
              height: this.props.pokemon.height,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            {...layout}
          >
            <Form.Item
              label="Nombre"
              name="title"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                disabled={true}
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Experiencia Base"
              name="base_experience"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                disabled={true}
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Peso"
              name="weight"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                disabled={true}
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Altura"
              name="height"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                disabled={true}
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
