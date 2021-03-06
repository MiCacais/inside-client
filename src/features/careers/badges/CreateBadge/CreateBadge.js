import React from 'react';
import { Form, Button, message } from 'antd';
import PropTypes from 'prop-types';

import * as entries from './CreateBadgeEntries';
import getDecoratorManager from './CreateBadgeDecorators';

const FormItem = Form.Item;

class CreateBadge extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { form } = this.props;
    form.validateFields(error => {
      if (!error) {
        message.success('Badge criada com sucesso');
        this.props.history.push('/badges');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const decorators = getDecoratorManager(getFieldDecorator);

    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form layout={formLayout} onSubmit={this.handleOnSubmit}>
        <FormItem label="Nome" {...formItemLayout} hasFeedback>
          {decorators.nameDecorator(entries.getNameInput())}
        </FormItem>

        <FormItem label="Descrição" {...formItemLayout} hasFeedback>
          {decorators.descriptionDecorator(entries.getDescriptionInput())}
        </FormItem>

        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 4 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </FormItem>
      </Form>
    );
  }
}

CreateBadge.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object).isRequired,
};

const WrappedCreateBadgeForm = Form.create()(CreateBadge);

export default WrappedCreateBadgeForm;
