<Container className="Signup">
  <Form>
    <h1 className="mt-5">Create account</h1>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <FormGroup className="mt-4">
          <Label for="username">Username</Label>
          <Input type="email" name="email" id="username" placeholder="Choose username" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Choose password" />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input type="password" name="password" id="confirmPassword" placeholder="Confirm password" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col sm="12" md="12" lg="12" className="mt-4 mb-5 text-center">
        <Button color="info">Sign up</Button>
      </Col>
    </Row>

  </Form>
</Container >