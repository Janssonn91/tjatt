<Fragment>
    <div className={`gitApps-sideDrawer gitApps-sideDrawer-${this.props.open ? 'open' : null}`}>
        
        <div className="gitApps-sideDrawer-header">
            <Button
                onClick={()=> this.sideDrawerHandler()} 
                className="gitApps-sideDrawer-close-button">
                    <i className="fas fa-times"></i>
            </Button>
            <h5 className='gitApps-sideDrawer-header-title'>Git Apps</h5>
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
                    <FormGroup>
                        <Label className="gitApps-sideDrawer-import-form-label-port" for="PortNo">Web port</Label>
                        <Input
                        id="port-git"
                        type="text"
                        placeholder="Web Port"
                        value={this.portToSet}
                        onChange={e => this.onWebPortChangeHandler(e)}
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
                                                    <Link
                                                        to={this.props.openApp && this.props.openApp._id === app._id ? '/git-app' :`/git-app/${app.name}`}
                                                        data-tip data-for={`launch-${app._id}`}
                                                        // onClick={() => this.openAppHandler(app)} 
                                                        onClick={() => this.props.onOpenApp(app)}  
                                                        className="gitApps-sideDrawer-appsList-app-controls-button ">
                                                        <i className={`fas ${this.props.openApp && this.props.openApp._id === app._id ? 'fa-times' : 'fa-rocket'}`}></i> 
                                                    </Link> 
                                                    <ReactTooltip id={`launch-${app._id}`} effect='solid'>
                                                    <span>{this.openApp._id === app._id ? 'Close' :'Launch'} App</span>
                                                    </ReactTooltip>
                                                    <button
                                                        data-tip data-for={`branch-${app._id}`}
                                                        onClick={()=>this.onOpenBranchesHandler(app)}
                                                        className="gitApps-sideDrawer-appsList-app-controls-button ">
                                                    <i className="fas fa-code-branch"></i>
                                                    </button>
                                                    <ReactTooltip id={`branch-${app._id}`} effect='solid'>
                                                    <span>Get Branches</span>
                                                    </ReactTooltip>
                                                </Fragment>
                                            : null}
                                            <button
                                                data-tip data-for={`start-${app._id}`}
                                                id={`run-${app._id}`}
                                                onClick={()=>this.startAppHandler(app._id)}   
                                                className="gitApps-sideDrawer-appsList-app-controls-button">
                                                {!app.running ? <i className="fas fa-play"></i> : <i className="fas fa-stop"></i>}
                                            </button>
                                            <ReactTooltip id={`start-${app._id}`} effect='solid'>
                                              <span>{`${app.running ? 'Stop' : 'Start'}`} App</span>
                                            </ReactTooltip>
                                            <button
                                                data-tip data-for={`refresh-${app._id}`}
                                                onClick={()=>this.onPullApp(app._id)}
                                                className="gitApps-sideDrawer-appsList-app-controls-button ">
                                               <i className="fas fa-sync-alt"></i>
                                            </button>
                                            <ReactTooltip id={`refresh-${app._id}`} effect='solid'>
                                              <span> Pull App</span>
                                            </ReactTooltip>
                                            <button
                                                data-tip data-for={`delete-${app._id}`}
                                                onClick={()=>this.deleteRepo(app._id)}
                                                type="button"
                                                className="gitApps-sideDrawer-appsList-app-controls-button">
                                                    <i className="fas fa-trash-alt"></i>
                                            </button>  
                                            <ReactTooltip id={`delete-${app._id}`}effect='solid'>
                                              <span>Delete App</span>
                                            </ReactTooltip> 
                                        </div>
                                </div>
                                <Collapse 
                                    className="gitApps-sideDrawer-appsList-app-controls-branch-wrapper"
                                    isOpen={this.openBranches === app._id ? true : false}>
                                    <div className="gitApps-sideDrawer-appsList-app-controls-branch">
                                        <p className="gitApps-sideDrawer-appsList-app-controls-label-branch">Remote</p>                                        
                                        {app.branches && app.branches.filter(item => item.includes('origin/')).map((branch, index) => (
                                            <button 
                                                key={index} 
                                                className="gitApps-sideDrawer-appsList-app-controls-button-branch">
                                                    {branch.split('origin/')[1]}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="gitApps-sideDrawer-appsList-app-controls-branch">
                                        <p className="gitApps-sideDrawer-appsList-app-controls-label-branch">Local</p>                                        
                                        {app.branches && app.branches.filter(item => !item.includes('origin/')).map((branch, index) => (
                                            <button 
                                                key={index} 
                                                className="gitApps-sideDrawer-appsList-app-controls-button-branch">
                                                    {branch}
                                            </button>
                                        ))}
                                    </div>

                                </Collapse>
                        </li>
                    ))}
                </ul>
            </Collapse>
        </div>
        
    </div>  
</Fragment>


