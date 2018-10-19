


<Fragment>
  {/* <MemberModal toggleModal={this.toggleModal.bind(this)} {...this.propsToModal} addMemberModal={this.addMemberModal} buttonLabel='Add members'/> */}

    <AddMemberModal {...this.sendToAddModal}/>
    <AddMemberModal {...this.sendToDeleteModal}/>
    <Row className="chat-header">
    <Col sm="11" className="chat-about">
          <div className="chat-with">Chat with channel name</div>
          </Col>
          {/* change icon if channel is group or not */}
          {/* <Col sm="1" className="dialog-icon">
          <FontAwesomeIcon icon="user" />
          </Col> */}
          <Col sm="1" className="dialog-icon">
         
          <Dropdown isOpen={this.dropdownOpen} toggle={this.dropdownToggle}>
          <DropdownToggle
            tag="span"
            
            data-toggle="dropdown"
            aria-expanded={this.dropdownOpen}
          >
            <FontAwesomeIcon icon="users" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Group Name</DropdownItem>
          <DropdownItem onClick={this.addMemberModalToggle.bind(this)}>
            Add members
          </DropdownItem>
          <DropdownItem onClick={this.deleteMemberModalToggle.bind(this)}>
            Delete members
          </DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
          
          </Col> 
    </Row>
    
    <div className="chat-history">
    <ul>
    <li className="clearfix ">
            <div className=" me">
              <span className="message-data-time" >10:10 AM, Today</span> &nbsp; 
              <span className="message-data-name " >Me</span> 
              
              
            </div>
            <div className="message my-message">
              How are you?
            </div>
          </li>

           <li>
            <div className="message-data">
            <span className="online circle"><FontAwesomeIcon icon="circle" /></span> &nbsp;
              <span className="message-data-name">Other</span>
              <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message other-message">
            I am fine, thank you. And you?
            </div>
          </li>

          <li>
            <div className="message-data">
            <span className="offline circle"><FontAwesomeIcon icon="circle" /></span> &nbsp;
              <span className="message-data-name">Another</span>
              <span className="message-data-time">10:14 AM, Today</span>
            </div>
            <div className="message other-message">
            Good!
            </div>
          </li>
         
         
    </ul>
    
    </div>
{/* End chat history */}

    <div className="chat-message clearfix">
       <Form inline>
       <ButtonDropdown direction="up" isOpen={this.isOpen} toggle={e => this.toggle()} className="btn-dropup">
        <DropdownToggle caret>
            <FontAwesomeIcon icon="plus" />
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem><FontAwesomeIcon icon="file" />&nbsp; &nbsp; Document </DropdownItem>
            <DropdownItem><FontAwesomeIcon icon="file-image" />&nbsp; &nbsp; Image</DropdownItem>
            <DropdownItem><FontAwesomeIcon icon="code" />&nbsp; Code or text snippet</DropdownItem>
            <DropdownItem><FontAwesomeIcon icon="code-branch" />&nbsp; &nbsp;Git repository</DropdownItem>
        </DropdownMenu>
       </ButtonDropdown>  {' '}
           <FormGroup>
           <Label for="messageArea" className="d-none">Message</Label>
          <Input type="textarea" name="text" id="messageArea" value={this.inputMessage} onChange={e => this.message = e.currentTarget.value} 
          onKeyPress={e => e.key === 'Enter' && this.sendMessage()}/>
           </FormGroup> {' '}
           <Button className="send" onClick={ e => this.sendMessage()}>Send</Button>
   
    </Form> 

      </div>

</Fragment>