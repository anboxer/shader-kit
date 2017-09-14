type RequestOption = {
    url?: string
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
    from?: FormData
    headers?: { [key: string]: string }
    timeout?: number
    async?: boolean
}
type AjaxResponse = {
    status: boolean
    sources: string
}
export class Ajax {
    static request(option: RequestOption): Promise<AjaxResponse> {
        return new Promise<AjaxResponse>((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.timeout = option.timeout || 30000
            if (option.headers) {
                let headers = option.headers
                for (let key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, headers[key])

                    }
                }
            }

            xhr.onreadystatechange = () => {
                if (xhr.status === 200) {
                    resolve({
                        status: true,
                        sources: xhr.responseText
                    })
                } else {
                    reject()
                }
            }

            xhr.open(option.method, option.url, !!option.async);
            xhr.send();
        })
    }

    static get(url, opt?: RequestOption) {
        let option: RequestOption = {
            url: url
        }

        option.method = "GET"
        return this.request(option)
    }
    static syncGet(url, opt?: RequestOption): AjaxResponse {
        let option: RequestOption = {
            url: url
        }

        option.method = "GET"
        option.async = true

        let response: AjaxResponse
        this.request(option).then((res: AjaxResponse) => {
            response = res
        })

        return response
    }
}