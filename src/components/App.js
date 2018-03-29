import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fragment from './Fragment';
import ErrorList from './ErrorList';
import './App.css';


import HtmlValidator from 'html-validator';
import fs from 'fs';


class App extends Component {
    static propTypes = {

    }
    state = {
        loading: false,
        messages: [],
        source: ''
    }
    constructor(props) {
        super(props);
        
        this.validateCheck(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Title of the document</title>
</head>

<body>
Content of the document......
<p
</body>

</html>`);

    }
    authHandler = async authData => {
        //await firebase.auth().signOut();
        //this.setState({ uid: null });
    }
    validateCheck = code => {
        
        const options = {
            //url: 'http://www.naver.com',
            validator: 'https://html5.validator.nu/',
            data: code,
            format: 'json'
        };

        HtmlValidator(options).then((data) => {
            console.log(data);

            this.setState({
                loading: false,
                messages: data.messages,
                source: code
            });
        })
        .catch((error) => {
            //console.error(error);
            console.log(`Oh dear, this service at ${options.validator} is no longer working...`);
        });





        /*
        const url = 'https://html5.validator.nu/'; //http://validator.w3.org/nu/
        
        let startTime = new Date();
        let maxTime = 6000;
        let timer = window.setTimeout(() => {
            this.setState({
                reportTime: maxTime / 1000
            });
            console.log(`Call to ${url} timed out after ${maxTime}ms.`);
        }, maxTime);
        
        let schemaURL = 'https://raw.githubusercontent.com/citation-style-language/schema/v1.0.1/csl.rnc';
        schemaURL += " " + 'https://raw.githubusercontent.com/citation-style-language/schema/master/csl.sch';
        let formData = new FormData();

        // formData.append('schema', schemaURL);
        // formData.append('parser', 'xml');
        // formData.append('laxtype', 'yes');
        // formData.append('level', 'error');
        // formData.append('out', 'json');
        // formData.append('showsource', 'yes');
        formData.append('content', code);

        this.setState({ loading: true });

        fetch(url, { 
            method: 'post',
            body: formData
        })
        .then(response => response.json())
        .then(response => {

            window.clearTimeout(timer);
            let endTime = new Date();
            //console.log(`Received response from ${url} after ${endTime - startTime}ms.`);

            this.setState({
                loading: false,
                messages: response.messages,
                sourceCode: response.source.code
            });

        }).catch(error => {
            this.setState({ warning: true });
            console.log(`Oh dear, this service at ${url} is no longer working...`);
        });

        */
    }
    onErrorSelect = (firstLine, firstColumn, lastLine, lastColumn) => {

    }
    render() {
        const { loading, messages, source } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <Fragment validateCheck={this.validateCheck} />
                    <ErrorList messages={messages} source={source} onErrorSelect={this.onErrorSelect} />
                </div>
            </div>
        );
    }
}

export default App;
