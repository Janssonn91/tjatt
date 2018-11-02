<Fragment>
    <Button
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
                    <p className="gitApps-sideDrawer-import-form-header-label">Import App</p>
            </div>
            <Collapse isOpen={this.showImport}>
                <Form className="gitApps-sideDrawer-import-form">
                    <FormGroup>
                        <Label className="gitApps-sideDrawer-import-form-label" for="projectName">Choose App name</Label>
                        <Input
                            id="app-name"
                            type="text"
                            placeholder="App name"
                            value={this.projectToSet}
                            onChange={e => this.editProjectName(e)}
                            onKeyPress={e => this.checkForEnter(e)}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label className="gitApps-sideDrawer-import-form-label" for="urlText">URL to Git Repository</Label>
                        <Input
                        id="url-git"
                        type="text"
                        placeholder="URL"
                        value={this.urlToSet}
                        onChange={e => this.editText(e)}
                        onKeyPress={e => this.checkForEnter(e)}
                        />
                    </FormGroup>
                    <InputGroupAddon addonType="append">
                        <Button className="gitApps-sideDrawer-submit-button ml-1 float-right"
                        onClick={this.submit}>Import</Button>
                    </InputGroupAddon>
                
                    {this.importingRepo ? 
                        <div className="gitApps-sideDrawer-spinner">
                            <Spinner 
                                progress={this.loadingStatus}
                                gitIcon={true}
                            />
                        </div>
                    :null}
                </Form>
            </Collapse>
            <div 
                className="gitApps-sideDrawer-import-form-header py-2 mt-4"onClick={()=> this.showAppsHandler()}>
                    <i className="fas fa-play"></i>
                    <p className="gitApps-sideDrawer-import-form-header-label">Available Apps</p>
            </div>
            <Collapse isOpen={this.showApps}>
                <ul className="gitApps-sideDrawer-appsList mt-2">
                    {this.importedApps.map(app=>(
                        <li
                            className="py-1" 
                            key={app._id}>
                                <button
                                    className="gitApps-sideDrawer-appsList-app-button">
                                        <p className="gitApps-sideDrawer-appsList-app-label">{app.name}</p>
                                </button>
                        </li>
                    ))}
                </ul>
            </Collapse>
        </div>
        
    </div>  
</Fragment>


