import 'bootstrap/dist/css/bootstrap.css'
import buildRequest from '../apis/build-request';
import Header from '../components/header';

// Next will put the page react component into this (so its like a wrapper)
// We are doing this to apply boostrap to all pages 
const AppGlobalComponent = ({Component , pageProps, currentUser}) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
            <Component {...pageProps}/>
        </div>
    )
};

AppGlobalComponent.getInitialProps = async (appContext) =>{
    const request = buildRequest(appContext.ctx);
    const {data} = await request.get("/api/users/currentuser");

    let pageProps;
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {pageProps, ...data};
};

export default AppGlobalComponent;