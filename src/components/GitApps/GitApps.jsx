<Fragment>
    <div
        style={{width:'100%', height: '100vh'}} 
        onClick={this.showSidedrawer ? ()=>this.sideDrawerHandler() : null}>
        {/* <iframe 
            id="running-app"
            title="running-app"
            src="https://developer.mozilla.org/en-US/docs/Glossary"
            width="100%" height="500" frameBorder="0"
            allowfullscreen sandbox={true}   
            >
        </iframe> */}
    </div>
    <Button
        style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%',
            width: '200px',
            height: '200px',
            transform: 'translate(-50%,-50%)'
        }}
        onClick={()=> this.sideDrawerHandler()}>
        Git Hell!
    </Button> 
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
                className="gitApps-sideDrawer-import-form-header py-2 mb-4"onClick={()=> this.showImportHandler()}>
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
                className="gitApps-sideDrawer-import-form-header py-2 mt-4"onClick={()=> this.showAppsHandler()}>
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
                                            <button
                                                onClick={()=>this.runningAppHandler(app._id)}   
                                                className="gitApps-sideDrawer-appsList-app-controls-button">
                                                {!app.running ? <i className="fas fa-play"></i> : <i className="fas fa-stop"></i>}
                                                
                                            </button>
                                            <button
                                                onClick={()=>this.deleteRepo(app._id)}
                                                type="button"
                                                className="gitApps-sideDrawer-appsList-app-controls-button">
                                                    <i className="fas fa-times"></i>
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


