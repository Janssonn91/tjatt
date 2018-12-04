<div className={`gitAppsChat-sidebar gitAppsChat-sidebar-${this.props.open ? 'open' : null}`}>
    <Button
        onClick={()=> this.props.onClose()} 
        className="gitAppsChat-sidebar-close-button">
            <i className="fas fa-times"></i>
    </Button>
    <Iframe url='http://localhost:3000'
        className="gitApps-app-frame"
        display="initial"
        allowFullScreen/> 
</div>