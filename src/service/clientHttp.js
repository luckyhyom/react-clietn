export default class clientHttp {
    constructor(baseURL, options) {
        this.baseURL = baseURL;
    }

    fetch(url, options) {

        // json으로 변환해야하는 promise를 반환
        const res = await fetch(this.baseURL+url,{
            ...options,
            headers:{
                'Content-Type':'application/json',
                ...options.headers,
            }
        });

        let data;
        try {
            // 이게 언제 되고 안되는지? 당연히 제이슨을 안보내줄때?
            data = res.json();
        }catch(err) {
            console.error(err);
        }

        if(res.status < 200 || res.status>299) {
            throw new Error({message:'Something went wrong!'});
        }

        return data;
    }

}