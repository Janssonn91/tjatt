<Fragment>
  <div className="gitNav p-4">
    <Form>
    <h5>Git repository</h5>
      <FormGroup>
        <Label for="projectName">Project</Label>
          <Input
            id="project-name"
            type="text"
            placeholder="Project name"
            value={this.projectToSet}
            onChange={e => this.editProjectName(e)}
            onKeyPress={e => this.checkForEnter(e)}
            />
      </FormGroup>
      <FormGroup>
        <Label for="urlText">URL</Label>
        <Input
          id="url-text"
          type="text"
          placeholder="url"
          value={this.urlToSet}
          onChange={e => this.editText(e)}
          onKeyPress={e => this.checkForEnter(e)}
          />
      </FormGroup>
      <InputGroupAddon>
        <Button className="bg-warning ml-1 float-right"
          onClick={this.submit}>Clone</Button>
      </InputGroupAddon>
      {/* <Button className="bg-danger ml-1 float-right"
        onClick={this.submit}>Close</Button> */}
    </Form>
    {(this.showMessage) && (
      <FormText color="white">
        Cloned!
      </FormText>
    )}
  </div>
</Fragment>



// {/* <Fragment>
//   <div>
//     <InputGroup className="url-input">
//       {/* <Labe{}l for="url">Url</Label> */}
//       <Input 
//           id="project-name"
//           type="text"
//           placeholder="project-name"
//           value={this.projectToSet}
//           onChange={e => this.editProjectName(e)}
//           onKeyPress={e => this.checkForEnter(e)}
//           />
//         <Input 
//           id="url-text"
//           type="text"
//           placeholder="url"
//           value={this.urlToSet}
//           onChange={e => this.editText(e)}
//           onKeyPress={e => this.checkForEnter(e)}
//           />
//         <InputGroupAddon addonType="append">
//           <Button 
//           onClick={this.submit}>Click button!</Button>
//         </InputGroupAddon>
//       </InputGroup>
//   </div>
// </Fragment> */}

// {/* <Fragment>
//   <Col className="gitNav">
//     <div className="justify-content-end d-flex">
//       <InputGroup className="url-input">
//         {/* <Labe{}l for="url">Url</Label> */}
//         <Input
//           id="project-name"
//           type="text"
//           placeholder="project-name"
//           value={this.projectToSet}
//           onChange={e => this.editProjectName(e)}
//           onKeyPress={e => this.checkForEnter(e)}
//         />
//         <Input
//           id="url-text"
//           type="text"
//           placeholder="url"
//           value={this.urlToSet}
//           onChange={e => this.editText(e)}
//           onKeyPress={e => this.checkForEnter(e)}
//         />
//         <InputGroupAddon addonType="append">
//           <Button className="bg-warning rounded-0 ml-1"
//             onClick={this.submit}>Clone</Button>
//         </InputGroupAddon>
//       </InputGroup>
//     </div>

//     <div className="justify-content-end d-flex pt-1">
//       <ButtonDropdown isOpen={this.isOpen} toggle={e => this.toggle()}>
//         <Button className="rounded-0" id="caret" color="light">{this.props.text}Select Branch</Button>
//         <DropdownToggle className="rounded-0" caret color="success" />
//         <DropdownMenu>
//           <DropdownItem>GIT EXAMPLE</DropdownItem>
//           <DropdownItem>GIT EXAMPLE</DropdownItem>
//           <DropdownItem>GIT EXAMPLE</DropdownItem>
//           <DropdownItem>GIT EXAMPLE</DropdownItem>
//         </DropdownMenu>
//       </ButtonDropdown>
//     </div>
//     <div className="justify-content-end d-flex mt-3">
//     <Button className="bg-danger rounded-0 ml-1"
//       onClick={this.submit}>Close</Button>
//   </div>
//   </Col>
// </Fragment> */}


