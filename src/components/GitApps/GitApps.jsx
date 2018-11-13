<Fragment>
    <div
        style={{width:'100%', height: '100vh'}} >
        {Object.keys(this.openApp).length ? 
            <div>
                <Button
                    style={{position: 'absolute', top: '20px', left: '20px', zIndex: '1'}} 
                    onClick={()=>this.closeAppHandler()}>
                        <i className="fas fa-times"></i>
                    </Button>
                <Iframe url={this.openApp.url}
                    className="gitApps-app-frame"
                    display="initial"
                    allowFullScreen/> 
            </div>
        :null}
    </div>
    <Button
        style={{
            position: 'absolute', 
            top: '50%', 
            left: '20px',
            width: '100px',
            height: '100px',
        }}
        onClick={()=> this.sideDrawerHandler()}>
        Git Hell!
    </Button>
    {/* <div className={`gitApps-app-launcher ${this.runningApps.length ? 'gitApps-app-launcher-show' : null}`}>
        <Dropdown 
            isOpen={this.runningAppDropdown} 
            toggle={() => this.runningAppDropdownHandler()}>
            <DropdownToggle>
                <i className="fas fa-rocket fa-2x"></i>
            </DropdownToggle>
            <DropdownMenu>
                {this.runningApps.map((app, index)=>
                    <DropdownItem
                        onClick={() => this.openAppHandler(app)} 
                        key={index}>
                        {app.name}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    </div> */}
    <div className={`gitApps-sideDrawer gitApps-sideDrawer-${this.showSidedrawer ? 'open' : null}`}>
        <Button
            onClick={()=> this.sideDrawerHandler()} 
            className="gitApps-sideDrawer-close-button">
                <i className="fas fa-times"></i>
        </Button>
        <div className="gitApps-sideDrawer-header py-4">
            <h5>Git Apps</h5>
            <i className="fab fa-github fa-3x gitApps-sideDrawer-git-icon py-2"></i>
        </div>
        
        <div className="gitApps-sideDrawer-import-form-content p-4">
            <div
                className="gitApps-sideDrawer-import-form-header py-2 mb-4"onClick={()=> this.sideDrawerShowImportHandler()}>
                    <i className="fab fa-github-alt"></i>
                    <p className="gitApps-sideDrawer-import-form-header-label">Import from GitHub</p>
            </div>
            <Collapse isOpen={this.showImport}>
                <Form 
                    className="gitApps-sideDrawer-import-form">
                    <FormGroup>
                        <Label className="gitApps-sideDrawer-import-form-label" for="urlText">URL to Git Repository</Label>
                        <Input
                        id="url-git"
                        type="text"
                        placeholder="URL"
                        value={this.urlToSet}
                        onChange={e => this.onUrlChangeHandler(e)}
                        onKeyPress={(e)=> this.onSubmitEnterHandler(e)}
                        />
                    </FormGroup>
                    <InputGroupAddon addonType="append">
                        <Button 
                            className="gitApps-sideDrawer-submit-button ml-1 float-right"
                            onClick={()=> this.onSubmitClickHandler()}>
                            Import
                        </Button>
                    </InputGroupAddon>
                
                    {this.importingRepo ? 
                        <div className="gitApps-sideDrawer-spinner">
                            <Spinner 
                                progress="Importing"
                                gitIcon={true}
                            />
                        </div>
                    :null}
                </Form>
            </Collapse>
            <div 
                className="gitApps-sideDrawer-import-form-header py-2 mt-4"onClick={()=> this.sideDrawerShowAppsHandler()}>
                    <i className="fas fa-rocket"></i>
                    <p className="gitApps-sideDrawer-import-form-header-label">Available Apps</p>
            </div>
            <Collapse isOpen={this.showApps}>
                <ul className="gitApps-sideDrawer-appsList mt-2">
                    {this.importedApps.map(app=>(
                        <li
                            className="py-1" 
                            key={app._id}>
                                <div
                                    className="gitApps-sideDrawer-appsList-app">
                                        <p className="gitApps-sideDrawer-appsList-app-label">{app.name}</p>
                                        <div className="gitApps-sideDrawer-appsList-app-controls">
                                            {app.running ? 
                                            <Fragment>
                                                <button
                                                    onClick={() => this.openAppHandler(app)}   
                                                    className="gitApps-sideDrawer-appsList-app-controls-button ">
                                                    <i className={`fas fa-rocket`}></i> 
                                                </button> 
                                            </Fragment>
                                            : null}
                                            <button
                                                id={`run-${app._id}`}
                                                onClick={()=>this.runningAppHandler(app._id)}   
                                                className="gitApps-sideDrawer-appsList-app-controls-button">
                                                {!app.running ? <i className="fas fa-play"></i> : <i className="fas fa-stop"></i>}
                                                
                                            </button>
                                            <button
                                                id={`run-${app._id}`}
                                                onClick={()=>this.deleteRepo(app._id)}
                                                type="button"
                                                className="gitApps-sideDrawer-appsList-app-controls-button">
                                                    <i className="fas fa-trash-alt"></i>
                                            </button>   
                                        </div>
                                </div>
                        </li>
                    ))}
                </ul>
            </Collapse>
        </div>
        
    </div>  
</Fragment>


