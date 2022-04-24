import { DataSource } from 'apollo-datasource';
import { AuthenticationError } from 'apollo-server';
import json5 from 'json5';


import { createVals, formatResults, noUndefined, pretty_json } from '../utils';

export class GraphAPI extends DataSource {

    graph: any;
    context: any;

    constructor({ graph }: any) {
        super();
        this.graph = graph;
    }

    override initialize(config: { context: any; }) {
        this.context = config.context;
    }

    //
    //  Queries
    //

    async queryUser({ user }: any) {
        if (!user) {
            throw new AuthenticationError('Invalid Token');
        }
        const r = await this.getAllNodes('User');
        return formatResults(r.data);
    }

    async getUser({
        fid,
        email,
        id
    }: {
        fid?: string,
        email?: string,
        id?: string
    }) {
        let r: any;
        if (id) {
            r = await this.getNodeById(id);
        } else if (fid) {
            r = await this.getNodeByKey({ fid }, 'User');
        } else if (email) {
            r = await this.getNodeByKey({ email }, 'User');
        }
        return formatResults(r.data);
    }

    //
    // Mutations
    //

    async addUser({
        displayName,
        email,
        fid,
        username
    }: {
        displayName?: string,
        email: string,
        fid: string,
        username?: string
    }) {
        // filter undefined values
        const params = noUndefined({ fid, email, displayName, username });
        const keys = noUndefined({ fid, email, username });

        // add node
        const r = await this.addNode({ label: 'User', keys, params });
        return formatResults(r.data);
    }

    //
    // Cypher
    //

    private async query(q: string) {
        return await this.graph.query(q);
    }

    async getNodeById(id: string) {
        return await this.query(`MATCH (n) WHERE ID(n) = ` + id + ` RETURN toJSON(n)`);
    }

    async getNodeByKey(keys: any, label: string) {
        return await this.query(`MATCH (n:${label} ${json5.stringify(keys)}) RETURN toJSON(n)`);
    }

    async getAllNodes(label: string) {
        return await this.query(`MATCH (n:${label}) RETURN toJSON(n)`);
    }

    async addNode({ label, keys, params }: { label: string, keys: { [x: string]: any }, params: { [x: string]: any } }) {
        let r = '';
        // create only if key(s) DNE
        if (Object.keys(keys).length > 0) {
            r += `OPTIONAL MATCH (a:${label}) WHERE `;
            r += createVals(keys, 'a', ' OR ');
            r += ' WITH a IS NULL AS dne WHERE dne = true '
        }
        r += `CREATE (a2:${label}` + (params ? ' ' + pretty_json(params) : '') + ') RETURN toJSON(a2)';
        console.log(r);
        return await this.query(r);
    }
}
