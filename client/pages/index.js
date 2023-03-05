import axios from "axios";
import buildRequest from "../apis/build-request";

const LandingPage = ({currentUser}) => {
    return currentUser ? <h1> You are signed in! </h1> : <h1>You are not signed in!</h1>
};

// Get initial props is a next js function where we can fetch data for the given component
// Pass res.data to the Landing page as a prop

// Server side execution here for this func (EXCEPT FOR NAVIGATING INSIDE THE APP - ONE PAGE TO ANOTHER)
// Inside the K8s cluster

// Since we don't want to reach out to auth directly as it will introduce hardcoding service url
// We are reaching out to ingress nginx to do the routing of the request for us 
// The request url would look like
// http://NAME_OF_SERVICE.NAMESPACE.svc.cluster.local
// We can get the namespace by kubectl get namespace command
// We can also get the name of service in ingress-nginx by
// kubectl get services -n ingress-nginx

// Look at the build-request API

LandingPage.getInitialProps = async (context) =>{
    const {data} = await buildRequest(context).get("/api/users/currentuser");
    return data;
};
   
export default LandingPage;