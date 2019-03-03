import React, {Component} from 'react';
import { UncontrolledAlert } from 'reactstrap';

class Message extends Component {

	constructor(props, context) {
        super(props, context);
    }

	render () {
		let object = this.props.object;
		if( object == null) 
			return (<div></div>);

		return (<div>
			    <UncontrolledAlert color="info">
      				Successfull created user {object.name} with id {object._id}
    			</UncontrolledAlert>
		</div>);
	}

}

export default Message;