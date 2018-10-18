<Fragment>
  <div>
    <InputGroup className="url-input">
      {/* <Labe{}l for="url">Url</Label> */}
        <Input 
          id="url-text"
          type="text"
          placeholder="url"
          value={this.urlToSet}
          onChange={e => this.editText(e)}
          onKeyPress={e => this.checkForEnter(e)}
          />
        <InputGroupAddon addonType="append">
          <Button 
          onClick={this.submit}>Click button!</Button>
        </InputGroupAddon>
      </InputGroup>
  </div>
</Fragment>