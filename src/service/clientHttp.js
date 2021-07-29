export default class clientHttp {
    constructor(baseURL, options) {
        this.baseURL = baseURL;
        this.options = options;
    }

    fetch(url, options) {

        // json으로 변환해야하는 promise를 반환
        const res = await fetch(this.baseURL+url,
            {
                headers:{'Content-Type':'application/json'}
                ,...options
        });

        let data;
        try {
            data = res.body;
        }catch(err) {
            console.error(err);
        }

        if(res.status < 200 || res.status>400) {
            throw Error({message:'Something went wrong!'});
        }

        return res.json();
    }

}