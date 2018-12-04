<div className="git-app--wrapper">
    <Button
        style={{position: 'absolute', top: '20px', left: '20px', zIndex: '1'}}  
        onClick={() => this.openGitAppsSidebarHandler()}>
        <i className="fab fa-github fa-3x py-2"></i>
    </Button>
    <Button
        style={{position: 'absolute', top: '150px', left: '20px', zIndex: '1'}}  
        onClick={() => this.openChatSidebarHandler()}>
        <i className="fas fa-comments fa-3x py-2"></i>
    </Button>
    <Link
        to='/'
        style={{position: 'absolute', top: '250px', left: '20px', zIndex: '1'}}  
        onClick={() => this.openChatSidebarHandler()}>
        <i className="fas fa-arrow-left fa-3x py-2"></i>
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