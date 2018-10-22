<Fragment >
{/* <div onClick={this.props.toggleMember}>{this.props.buttonLabel}</div> */}
<div>{this.props.buttonLabel}</div> 
<Modal isOpen={this.props.isOpen}  toggle={this.props.toggle}>
    <ModalHeader toggle={this.props.toggle}>
    <Form>
    <FormGroup>
           <Label for="groupNameEdit" className="d-none" > <i className='fas fa-edit hover-show'></i></Label>
          <Input type="text" name="text" id="groupNameEdit" bsSize="sm" placeholder="group name" />
           </FormGroup> 
    </Form>
 
    
    {this.props.buttonLabel}</ModalHeader>
          <ModalBody>
         
           <FormGroup>
           <Label for="searchAddMemeber"> Search member</Label>
                    <Input type="text" id= "searchAddMemeber" bsSize="sm" />
                    </FormGroup> 
                    <Form>
                  
                    <FormGroup tag="fieldset">
                        <legend>Group members</legend>
                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" value="member 1"/>{' '}
                            Member 1
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" value="member 2"/>{' '}
                            Member 2
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                        <Label check>
                            <Input type="checkbox" value="Member 3" />{' '}
                            Member 3
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                        <Label check>
                            <Input type="checkbox" value="Member 3" />{' '}
                            Member 3
                            </Label>
                        </FormGroup><FormGroup check disabled>
                        <Label check>
                            <Input type="checkbox" value="Member 3" />{' '}
                            Member 3
                            </Label>
                        </FormGroup><FormGroup check disabled>
                        <Label check>
                            <Input type="checkbox" value="Member 3" />{' '}
                            Member 3
                            </Label>
                        </FormGroup><FormGroup check disabled>
                        <Label check>
                            <Input type="checkbox" value="Member 3" />{' '}
                            Member 3
                            </Label>
                        </FormGroup><FormGroup check disabled>
                        <Label check>
                            <Input type="checkbox" value="Member 3" />{' '}
                            Member 3
                            </Label>
                        </FormGroup>
                        </FormGroup>
                    </Form>
                   
         
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={()=>console.log("add")}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
      
        </Modal>
</Fragment>

