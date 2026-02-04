interface HttpRequestHeadersInterfaceMock {
    [id: string]: string | string[] | undefined
}

interface HttpRequestInterfaceMock {
    headers: HttpRequestHeadersInterfaceMock,

    [id: string]: any,
}

declare function isMobile(opts?: isMobile.IsMobileOptions): boolean;

declare namespace isMobile{
    export interface IsMobileOptions {
        ua?: string | HttpRequestInterfaceMock
        tablet?: boolean
        featureDetect?: boolean
    }

    export {
        isMobile,
        isMobile as default
    }
}

export = isMobile
