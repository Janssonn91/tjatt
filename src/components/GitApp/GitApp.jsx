<div className="git-app--wrapper">
    <Button
        style={{position: 'absolute', top: '20px', left: '20px', zIndex: '1'}}  
        onClick={() => this.openGitAppsSidebarHandler()}>
        <i className="fab fa-github fa-3x py-2"></i>
    </Button>
    <GitAppsSidebar open={this.openGitAppsSidebar} onClose={() => this.openGitAppsSidebarHandler()} onOpenApp={(app) => this.openAppHandler(app)}/>
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
    :null}
</div>