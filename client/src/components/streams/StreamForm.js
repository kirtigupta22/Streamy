import React from  'react';
import { Field, reduxForm } from 'redux-form';//Field will be a react component while reduxForm is function the exact same functionality of the connect in react-redux which is responsible to call an action creator and get some form data into our component


class StreamForm extends React.Component {

    renderError({ error, touched }){
        if( touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, meta, label}) => {// we can destructure it as {input, meta, label} or we can directly pass formProps. //onChange={formProps.input.onChange} // value={formProps.input.value}
        //console.log(formProps);
        //console.log(formProps.meta);
        const className = `field ${meta.error && meta.touched ? 'error' : '' }`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {//our callback gets invoked with all the values out of our form.
        this.props.onSubmit( formValues );//onsubmit will call the function of onSubmit passed down as prop from parent component.
    }

    render() {
        
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.title){
        //only ran if user did not enter title
        errors.title = 'You must enter a title';
    }

    if(!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm( {
    form: 'streamForm',
    validate
} )(StreamForm);

