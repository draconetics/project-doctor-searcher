import React, {Component} from 'react';

class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

        };
        console.log("Main constructor es invocado");
    }

    render() {

        console.log("Main render es invocado");
        return (
            <div>
                HOME
            </div>
        );
    }
}

export default Home;