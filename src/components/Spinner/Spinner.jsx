<div className="lds-dual-ring">
    <div className="spinner-progress-wrapper">
        {this.props.gitIcon ?  
            <i className="fab fa-github fa-5x spinner-progress-git-icon"></i>
        :null}
        <p className="spinner-progress-label">
            {this.props.progress ? `${this.props.progress}` : null}
        </p>
    </div>
</div>