import {format} from 'date-fns';
import queryString from 'query-string';
import truncate from "lodash/truncate";

function camelToSnake(value: string) {
    return value.replace(/[\w]([A-Z])/g, m => `${m[0]}_${m[1]}`).toLowerCase();
}

const stringifyParams = (data: any) => {
    const {params, option} = data;
    return queryString.stringify(params, {
        arrayFormat: 'bracket',
        encode: false,
        skipNull: true,
        skipEmptyString: true,
        ...option,
    });
};

const isBrowser = () => {
    return typeof window !== 'undefined';
};

function getCurrentDomain() {
    const parts = isBrowser() ? window.location.hostname.split('.') : [];
    parts.shift();
    return parts.join('.');
}

function getUrlRoot(pathname?: string) {
    return pathname ? pathname.split('/')[1] : '';
}

function formatDate(date: string | number) {
    if (!date) return ''
    return format(new Date(date), 'dd/MM/yyyy')
}

function removeTags(str: string) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    return str.replace(/(<([^>]+)>|&nbsp;)/ig, '');
}

function cleanHtml(html: string, length: number = 20) {
    return truncate(removeTags(html || '') || '', {length, separator: '...'})
}

export {stringifyParams, camelToSnake, getCurrentDomain, getUrlRoot, isBrowser, formatDate, removeTags, cleanHtml};
