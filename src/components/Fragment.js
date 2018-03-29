import React, { Component } from 'react';

class CodeForm extends Component {
    sourceRef = React.createRef();
    
    updateHtml = e => {
        e.preventDefault();
        const code = this.sourceRef.value.value;
        
        this.props.validateCheck(code);
        e.currentTarget.reset();
    }
    render() {
        return (
            <div className="col-sm-4">
                <h2>HTML Fragment</h2>

                <form onSubmit={this.updateHtml}>
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="form-control" 
                            placeholder="Enter your HTML fragment here..."
                            rows="10"
                            ref={this.sourceRef}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <div className="pull-right">
                            <button type="submit" className="btn btn-default">
                                <i className='fa fa-spinner fa-pulse'></i> Validate
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CodeForm;