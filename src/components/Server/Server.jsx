<div className="justify-content-end d-flex">
  <div className="pt-3 pr-2">
    <InputGroup className="url-input">
      {/* <Labe{}l for="url">Url</Label> */}
      <Input className="rounded-0 border border-warning"
        id="url-text"
        type="text"
        placeholder="URL"
        value={this.urlToSet}
        onChange={e => this.editText(e)}
        onKeyPress={e => this.checkForEnter(e)}
      />
      <Input
        id="project-name"
        type="text"
        placeholder="project-name"
        value={this.projectToSet}
        onChange={e => this.editProjectName(e)}
        onKeyPress={e => this.checkForEnter(e)}
      />
      <InputGroupAddon addonType="append">
        <Button className="btn-warning rounded-0 ml-1"
          onClick={this.submit}>Clone</Button>
      </InputGroupAddon>
    </InputGroup>
    <div className="justify-content-end d-flex pt-2">
      <InputGroupAddon addonType="append">
        <Button className="btn-success rounded-0 ml-1"
          onClick={this.submit}>Submit</Button>
      </InputGroupAddon>
    </div>
  </div>
</div>