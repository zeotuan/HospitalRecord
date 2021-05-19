import isString from './stringParser';
const tokenExtractor = ():string|null => {
    const usertoken = localStorage.getItem('userToken');
    if(usertoken){
        const token:unknown = JSON.parse(usertoken);
        //
        if(isString(token)){// eslint-disable-line
            return token;
        }
    }
    return null;
};

export default tokenExtractor;