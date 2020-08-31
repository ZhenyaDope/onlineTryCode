import React from 'react';
// import brace from 'brace';
import '../../scss/app.css';
import AceEditor from "react-ace";

import 'brace/mode/javascript';
import 'brace/theme/github';

import {Button, Header, Input} from "semantic-ui-react";

import socket from "../socket";



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            connected: false,
            room: '---'
        }
    }

    handleChange(value){

        socket.emit('CHANGE_CLIENT',{
            room: this.state.room,
            code: value
        })
        this.setState({
            value
        })
    }

    componentDidMount() {
        socket.on('CHANGE_SERVER',(value)=>{
            this.setState({
                value
            })
        })
    }

    connectRoom(){
        socket.emit('JOIN_ROOM',this.state.room);
        this.setState({
            connected: true
        })
    }
    render(){
        return (
            <div>
                <div className="header">
                    <Header size='huge'>
                        TryCode - {this.state.room}
                    </Header>
                    <Input onChange={e=> this.setState({room: e.target.value})}/>
                    <Button
                        disabled={this.state.connected}
                        onClick={this.connectRoom.bind(this)}
                    >
                        Connect
                    </Button>
                    <div className="editor">
                        <AceEditor
                            fontSize={18}
                            showGutter={true}
                            highlightActiveLine={true}
                            mode="javascript"
                            theme="github"
                            name="editor"
                            value={this.state.value}
                            editorProps={{ $blockScrolling: true }}
                            onChange={this.handleChange.bind(this)}
                        />

                    </div>
                </div>
            </div>
        );
    }

}

export default App;
