interface Headers {
    [id: string]: string | string[]
}

interface Request {
    headers: Headers,

    [id: string]: any,
}

interface InputOptions {
    tablet?: boolean,
    ua?: string | Request
}

export default function isMobile(opt?: InputOptions): boolean;
