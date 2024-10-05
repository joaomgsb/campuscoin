export const fetchHeaders = {
    'Content-Type': 'application/json',
}

export const requests = {

    /**
    * @typedef {'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'} RequestMethod
    */

    /** 
    * Fazer requisição via get ou post
    * @param {String} url - endpoint de requisição
    * @param {{method: RequestMethod, path?: string, body: object}} config - objeto de configuração da requisição
    * @return {Promise<any>}
    */

    build: async (url, config = {}) => {

        var baseApiPath = `${window.origin}/${'CampusCoin-master'}/${url}`

        const configRequest = {
            method: config.method ?? 'GET',
        }

        if (config.method === 'POST' || 'PUT' && config.body) {

            if(config.formData){

                const formData = new FormData()

                for (const key in config.body) {
                    formData.append(key, config.body[key])
                }

                configRequest.body = formData

            }else{
                configRequest.body = JSON.stringify(config.body)
            }
        }

        const request = await fetch(baseApiPath, configRequest)

        return await request.json()
    },
    /** 
    * Fazer requisição via get
    * @param {String} url - endpoint de requisição
    * @param {Object} urlParams - parâmetros que vão no GET
    * @return {Promise}
    */
    get: async (url, urlParams = {}) => {

        if(Object.keys(urlParams).length > 0){
            const queryString = Object.entries(urlParams)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

            url = `${url}?${queryString}`
        }

        return await requests.build(url)
    },

    /**
    * @typedef {true | false} FormdataApply
    */

    /** 
    * Fazer requisição via get
    * @param {String} url - endpoint de requisição
    * @param {Object} body - parâmetros que vão no POST
    * @param {FormdataApply} formData - true -> formdata | false -> json
    * @return {Promise}
    */
    post: async (url, body = {}, formData = false) => {

        return await requests.build(url, {
            method: 'POST',
            body: body,
            formData: formData
        })
    }
}