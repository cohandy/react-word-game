import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TransitionContainer = Layout => {
    return props => 
        <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName="SlideIn"
        >
            <Layout {...props} />
        </ReactCSSTransitionGroup>
}

export default TransitionContainer;