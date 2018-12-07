<div className="git-app--wrapper">
    <Button
        style={{position: 'absolute', top: '20px', left: '20px', zIndex: '1', borderRadius: '50%'}}  
        onClick={() => this.openGitAppsSidebarHandler()}>
        <i className="fab fa-github fa-2x py-2"></i>
    </Button>
    <Button
        style={{position: 'absolute', top: '100px', left: '20px', zIndex: '1', borderRadius: '50%'}}  
        onClick={() => this.openChatSidebarHandler()}>
        <i className="fas fa-comments fa-2x py-2"></i>
    </Button>
    <Link
        to={this.props.userStore.user ? `/${this.props.userStore.user.username}` : '/'}
        style={{
            position: 'absolute', 
            top: '180px', 
            left: '20px', 
            zIndex: '1', 
            borderRadius: '50%', 
            width:'62px', 
            height: '62px', 
            backgroundColor: '#6D757D',
            color: '#fff', 
            display:'flex',
            justifyContent:'center',
            alignItems: 'center'}}  
        onClick={() => this.openChatSidebarHandler()}>
        <i className="fas fa-arrow-left fa-2x py-2"></i>
    </Link>
    <GitAppsSidebar open={this.openGitAppsSidebar} openApp={this.openApp} onClose={() => this.openGitAppsSidebarHandler()} onOpenApp={(app) => this.openAppHandler(app)}/>
    <GitAppsChatSidebar open={this.chatSidebar} onClose={() => this.openChatSidebarHandler()} />
    {Object.keys(this.openApp).length ?
        <div
            style={{width:'100%'}} >
                <div>
                    <Iframe url={this.openApp.url}
                        className="gitApps-app-frame"
                        display="initial"
                        allowFullScreen/> 
                </div>
        </div>
    :
    <div className="git-app--splash-screen">
        <h1>Launch an App</h1>
        <i className="fab fa-github fa-10x py-2"></i>
    </div>
    }
</div>