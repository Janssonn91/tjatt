<Container>
  <Row>
    <Col className="login-area">
      <h1>Let's tj@!</h1>
      <FormGroup className="mt-4">
        <Input type="text" id="username" placeholder="Användarnamn" value={this.usernameToSet} onChange= {e => this.usernameChange(e)} />
      </FormGroup>
      <FormGroup>
        <Input type="text" id="password" placeholder="Lösenord" value={this.passWordToSet} onChange= {e => this.passwordChange(e)} />
      </FormGroup>
      <Button color="primary">Skapa konto</Button>{' '}
      <Button color="primary">Logga in</Button>{' '}
    </Col>
  </Row>
</Container>