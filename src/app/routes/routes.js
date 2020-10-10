import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router'; // react-router v4
import { BrowserRouter } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { PropTypes } from 'prop-types';


// Dynamically loaded components
const Landing = React.lazy(() => import('../Home/Landing.jsx'));

const DefaultRoot = ({ component: Component, path, exact, withHeader, withSidebar, activeItem, ...rest }) => {

    return (
        <Route
            path={path}
            exact={exact}
            render= { props => {
                const { match : {params: urlProps} = {}} = props;
                const { location: {state: navigationStateProps}} = props;
                
                return (
                    <>
                        <div className='main-body'>
                            <Component {...rest} {...urlProps} {...navigationStateProps} />
                        </div>
                    </>
                );
            }
         }
        />
    );

};

// configuring route sof app with cutsom sidebar and header..this way w ecan add more properties in app base don configuration.
const getRoutes = props => {
    return (
        <Suspense fallback={<Loader />}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>                    
                    <DefaultRoot component={Landing} exact={true} path='/' withHeader= {false} withSidebar= {false} activeItem=''/>
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
};

getRoutes.propTypes = {
    history: PropTypes.array,
};

export default getRoutes;

