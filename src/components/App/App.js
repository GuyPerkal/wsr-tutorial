import React, { useState } from 'react';
import {
  Button,
  Box,
  Checkbox,
  Container,
  Row,
  Col,
  Card,
  FormField,
  Input,
  InputArea,
  Dropdown,
  Page,
  Text,
} from 'wix-style-react';

const colors = [
  {
    id: 'red',
    value: 'Red',
  },
  {
    id: 'blue',
    value: 'Blue',
  },
  {
    id: 'green',
    value: 'Green',
  },
  {
    id: 'yellow',
    value: 'Yellow',
  },
  {
    id: 'pink',
    value: 'Pink',
  },
];

export default () => {
  const [name, setName] = useState('');
  const [colorId, setColorId] = useState();
  const [funFact, setFunFact] = useState('');
  const [acceptedTerms, acceptTerms] = useState(false);
  const [submittedValues, submitValues] = useState();
  const clear = () => {
    setName('');
    setColorId();
    setFunFact('');
    acceptTerms(false);
    submitValues();
  };
  const submit = () => {
    submitValues({
      name,
      color: colors.find((color) => color.id === colorId).value,
      funFact,
    });
  };

  return (
    <Page height="100vh">
      <Page.Header title="WSR Form" />
      <Page.Content>
        <Container>
          <Row>
            <Col span={8}>
              <Card>
                <Card.Header
                  title="WSR Form"
                  subtitle="Create your own page with wix-style-react"
                />
                <Card.Divider />
                <Card.Content>
                  <Row>
                    <Col span={8}>
                      <FormField label="Name" required>
                        <Input
                          dataHook="name-input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter a name"
                        />
                      </FormField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <FormField label="Favorite Color">
                        <Dropdown
                          data-hook="color-dropdown"
                          selectedId={colorId}
                          onSelect={(option) => setColorId(option.id)}
                          options={colors}
                          placeholder="Enter a color"
                        />
                      </FormField>
                    </Col>
                  </Row>
                  <Row>
                    <Box verticalAlign="middle">
                      <Col span={7}>
                        <Checkbox
                          dataHook="terms-checkbox"
                          checked={acceptedTerms}
                          onChange={() => acceptTerms(!acceptedTerms)}
                        >
                          I agree to the terms of use
                        </Checkbox>
                      </Col>
                      <Col span={5}>
                        <Box>
                          <Box marginRight="SP3">
                            <Button priority="secondary" onClick={clear}>
                              Clear
                            </Button>
                          </Box>
                          <Button
                            dataHook="submit-button"
                            disabled={!name || !colorId || !acceptedTerms}
                            onClick={submit}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Col>
                    </Box>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={4}>
              <Row>
                <Col>
                  <Card>
                    <Card.Header title="Extra" />
                    <Card.Divider />
                    <Card.Content>
                      <FormField label="Fun Fact">
                        <InputArea
                          dataHook="fun-fact-input-area"
                          value={funFact}
                          onChange={(e) => setFunFact(e.target.value)}
                          rows={4}
                          placeholder="Enter something interesting"
                        />
                      </FormField>
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
              {submittedValues && (
                <Row>
                  <Col>
                    <Card>
                      <Card.Header title="Submitted info" />
                      <Card.Divider />
                      <Card.Content>
                        <Row>
                          <Col span={6}>
                            <Text>Name:</Text>
                          </Col>
                          <Col span={6}>
                            <Text>{submittedValues.name}</Text>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6}>
                            <Text>Favorite Color:</Text>
                          </Col>
                          <Col span={6}>
                            <Text>{submittedValues.color}</Text>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6}>
                            <Text>Fun Fact:</Text>
                          </Col>
                          <Col span={6}>
                            <Text>{submittedValues.funFact}</Text>
                          </Col>
                        </Row>
                      </Card.Content>
                    </Card>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </Page>
  );
};
