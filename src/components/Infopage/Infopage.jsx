<Fragment>
  <Row className="infopage">
    <Col className="col-12 px-0">
      <div className="introduction">
        <h2 className="m-0 pt-0 pt-md-4">Introduction</h2>
      </div>
      <hr className="mt-2 mb-4"/>
    </Col>
    <Col className="col-12 main-info">
      <Row className="settings-info">
        <Col className="col-12">
          <h4 className="text-center mb-3">User settings</h4>
        </Col>
        <Col className="col-6">
          <img src={"/images/settings-dropdown-menu.PNG"} className="img-fluid d-block mb-2" alt="Settings dropdown menu for user"/>
          <img src={"/images/settings.PNG"} className="img-fluid d-block mt-2" alt="Settings window opened"/>
        </Col>
        <Col className="col-6">
          <ol>
            <li>You can find the user menu by clicking on your username.</li>
            <li>In the menu you can find options such as settings for your user account and logout.</li>
            <li>When clicking settings, a new window appears with different kind of settings for you.</li>
            <li>Add an image to your user. You're doing that by clicking on the pen on the on the image to the right. Now a new window appears and this time you just have to select the image of your choice to be yor profile image.</li>
            <li>Create a nickname for yourself. If you didn't get the username of your choice or you just want to present yourself otherwise to others in the chat. The nickname and the username will still be visiable to others by searching, but in the chat the nickname only and always shows.</li>
            <li>If you want to change your password if you feel like you don't have a strong enough password or whatever reason you might have, you can do it here. Just type in your current password, with a new one twice after eachother to confirm you typed the same password.</li>
          </ol>
        </Col>
      </Row>
      <hr className="my-4"/>
      <Row className="sidebar-info">
        <Col className="col-12">
          <h4 className="text-center mb-3">Find contacts & create groups</h4>
        </Col>
        <Col className="col-6">
          <img src={"/images/search-contacts.PNG"} className="img-fluid d-block mb-2" alt="Window opened for searching for new contacts"/>
          <img src={"/images/create-group.PNG"} className="img-fluid d-block mt-2" alt="Create Group window opened"/>
        </Col>
        <Col className="col-6">
          <ol>
            <li>On the sidebar you will find a + icon next to <i>My contacts</i>. When clicking that you will open a new window.</li>
            <li>The window that opens is used to search for contacts by using the input field.</li>
            <li>The searchresult is based upon you searching for a user that matches the <i>Username</i>, <i>Nickname</i> or <i>E-mail</i> of another user.</li>
            <li>On the sidebar next to <i>My groups</i> you will find another + icon. When clicking that you will open a new window.</li>
            <li>The window that opens is used to create groups. There is no restriction on how many users there can be in a group. You can even be alone in a group if you want some documents or notes for yourself.</li>
            <li>The first input field is a requirement to create a group. That is the name of the group.</li>
            <li>To choose what other users you want in the group, you have to search for each contact. To create a group with other members, you must already have these uers in your contactlist. There is no limit to how many users there can be in a group.</li>
            <li>If you want to list all users from your contactlist automatically instead of searching for them one by one, you can click the <i>View all users</i> option.</li>
            <li>When a user is shown from a searchresult or by clicking the <i>View all users> option</i>, they will list in the left column. To have them on the group, you click on the <i>Add user</i> text to add them to the right column.</li>
            <li>The right column represents the users that are going to be in the group. You who creates the group are automatically in the group and will therefore not be listed.</li>
          </ol>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row className="group-management">
        <Col className="col-12">
          <h4 className="text-center mb-3">Group management</h4>
        </Col>
        <Col className="col-6">
          <img src={"/images/group-dropdown-menu.PNG"} className="img-fluid d-block mb-2" alt="Group management dropdown menu"/>
          <img src={"/images/add-delete-groupmembers.PNG"} className="img-fluid d-block mt-2" alt="Window open for add/delete members of the group"/>
        </Col>
        <Col className="col-6">
          <ol>
            <li>You can find the group menu by clicking on the group icon in the top-right corner of the chatpage.</li>
            <li>The option <i>Add/Delete member</i> is only visable for admins of the group. The creator of the group automatically becomes the admin. Clicking on that option opens a new window.</li>
            <li>To add new members to an already existing group is very similar of how to create the group. The proccess is the same (search for a user and click on <i>Add user</i> but now you have to save your changes.</li>
            <li>If you want to remove an user from the group the proccess is the same as adding one but in reverse. In the right column there is a list of the users in the group already. Click on <i>Remove user</i> so that it switches to the left column. Now save and confirm your changes.</li>
            <li>The red circle indicates that user is admin of the group. Not that there can be multiple admins of an group.</li>
            <li>To make another member of a group an admin, click the <i>Admin management</i> in the dropdown menu. Note that only an admin can make another user an admin, your admin status will not disappear when making another user admin. A new window will appear.</li>
            <li>On the right side of the window that appear you will see who is admin and who is not. Click the <i>Make admin</i> button to make user admin.</li>
            <li>To leave the group you're in, you just simply have to click the <i>Leave group</i> option. A new window will appear to have you confirm of cancel your choice.</li>
          </ol>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row className="chat-management">
        <Col className="col-12">
          <h4 className="text-center mb-3">Chat management</h4>
        </Col>
        <Col className="col-6">
          <img src={"/images/chat-menu.PNG"} className="img-fluid d-block mb-2" alt="Menu open to upload things to the chat"/>
          <img src={"/images/delete-message.PNG"} className="img-fluid d-block mt-2" alt="Showing how to delete a message"/>
        </Col>
        <Col className="col-6">
          <ol>
            <li></li>
            <li></li>
          </ol>
        </Col>
      </Row>
    </Col>
  </Row>
</Fragment>