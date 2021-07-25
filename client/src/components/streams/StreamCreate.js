import React from  'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {//our callback gets invoked with all the values out of our form.
        this.props.createStream( formValues );//onsubmit will call action creator of createStream which make request to api server and create a stream.
    }

    render() {
        
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}


export default connect(null, { createStream } )(StreamCreate);