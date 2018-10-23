!this.props.isOpen ? null : <div>
  <Modal isOpen={true} keyboard={true} >
    {this.props.children}
  </Modal>
</div>