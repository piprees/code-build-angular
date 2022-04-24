import json5 from "json5";

export const createVals = (j: any, v: string, _join = ', ') =>
    Object.keys(j).map((k: string) => `${v}.${k} = '${j[k]}'`).join(_join);

/*
: return cypher values as JSON
*/
export const jsonify = (x: any) => {
    const arrayToJSON = (x: any, type: string, id: string) =>
        x.reduce((p: any, c: any) => ({ ...p, [c[0]]: c[1] }), { __typename: type, id });
    const getProps = (x: any) => arrayToJSON(x[2][1], x[1][1][0], x[0][1]);
    return x.map((s: any) => getProps(s[0]));
};

export const pretty_json = (j: any) =>
    json5.stringify(j).replace(/{/g, '{ ').replace(/}/g, ' }').replace(/:/g, ': ').replace(/,/g, ', ');

/*
: JSON stringify without key quotes
*/
export const json_stringify = (j: any) =>
    JSON.stringify(j).replace(/\\/g, "").replace(/"(\w+)":"/g, "$1: \"").replace(/,/g, ", ");

/*
: filter out fields
*/
export const filter_fields = (obj: any, fields: string[]) => obj.map((_r: any) => {
    Object.keys(_r).map((f: string) => {
        if (!(f in fields) && f !== '__typename') {
            delete _r[f];
        }
    });
    return _r;
});

export const createOrders = (j: any, v: string) =>
    Object.keys(j).map((k: string) => {
        const _dir = (j[k] as string).toLowerCase() === 'desc' ? ' DESC' : '';
        return k === 'id' ? `id(n)` : `${v}.${k}` + _dir;
    }).join(', ');

export const createFields = (j: any, v: string) =>
    Object.keys(j).map((k: string) => `${k}: ` + (k === 'id' ? 'ID(a)' : `${v}.${k}`)).join(', ');


export const formatResults = (x: any[]) => {
    if (x.length > 1) {
        return x.map((y: any) => JSON.parse(y))
            .map((z: any) => ({ id: z.id, ...z.properties }));
    } else if (x.length === 0) {
        return [];
    }
    const r = JSON.parse(x[0]);
    return { id: r.id, ...r.properties };
};

export const noUndefined = (x: any) => {
    Object.keys(x).forEach(key => x[key] === undefined ? delete x[key] : {});
    return x;
};
