import 'bootstrap/dist/css/bootstrap.css'

// Next will put the page react component into this (so its like a wrapper)
// We are doing this to apply boostrap to all pages 
export default ({Component , pageProps}) => {
    return <Component {...pageProps}/>
};