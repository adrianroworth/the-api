const $RefParser = require('json-schema-ref-parser');
const merge = require('lodash.merge');
const fs = require('fs');
const prettier = require('prettier');
const prettierConfig = require('../../../.prettierrc');

async function getResolvedContract(filePath) {
    try {
        const resolvedContract = await $RefParser.dereference(filePath);

        return resolvedContract;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return err;
    }
}

(async () => {
    const contract = await getResolvedContract('src/openapi/src/openapi-src.json');

    function describeBlock(description, body) {
        return `describe('${description}', () => {${body}});`;
    }

    function itBlock(description, body) {
        // escape ' in description
        const escapedDescription = description.replace(/'/g, "\\'");

        return `it('${escapedDescription}', async () => {${body}});`;
    }

    function transformResponse(response, data) {
        // Defaults
        // let auth = true;
        let params = data.verb.value.parameters || [];
        let reqBody = data.verb.value.requestBody;
        let scopes = data.verb.value['x-scopes'];

        // Override defaults where required
        if (data.verb.value['x-requests'] && data.verb.value['x-requests'][data.response.key]) {
            // override params
            if (data.verb.value['x-requests'][data.response.key].parameters) {
                params = [];

                merge(
                    params,
                    data.verb.value.parameters,
                    data.verb.value['x-requests'][data.response.key].parameters
                );
            }

            // override requestBody
            if ('requestBody' in data.verb.value['x-requests'][data.response.key]) {
                reqBody = {};

                merge(
                    reqBody,
                    data.verb.value.requestBody,
                    data.verb.value['x-requests'][data.response.key].requestBody
                );
            }

            // // enable / disable sending of bearer token
            // if ('auth' in data.verb.value['x-requests'][data.response.key]) {
            //     auth = data.verb.value['x-requests'][data.response.key].auth;
            // }

            // override x-scopes
            // Allows a token without sufficient privileges to be sent, so that a 403 can be triggered
            if ('x-scopes' in data.verb.value['x-requests'][data.response.key]) {
                scopes = [];

                merge(
                    scopes,
                    data.verb.value['x-scopes'],
                    data.verb.value['x-requests'][data.response.key]['x-scopes']
                );
            }
        }

        // get the url with the params substituted with examples
        // deal with path params.
        let url = params.reduce(
            (acc, parameter) => acc.replace(`{${parameter.name}}`, parameter.example),
            data.path.key
        );

        url += '?';

        // deal with query params.
        url = params.reduce((acc, parameter) => {
            if (parameter.in === 'query') {
                // eslint-disable-next-line no-param-reassign
                acc += `${parameter.name}=${parameter.example}&`;
            }
            return acc;
        }, url);

        // remove trailing `&`, or `?`.
        url = url.replace(/(&|\?)$/, '');
        const req = [];

        // set req verb and url
        req.push(`${data.verb.key}('/api/v1${url}')`);

        // set auth
        // if (auth) {
        //     req.push(`set('Authorization', \`Bearer \${tokens['${scopes[0]}']}\`)`);
        // }

        // if this is a post set request body
        if (data.verb.key === 'post') {
            req.push(`set('Content-Type', 'application/vnd.api+json')`);
            req.push(
                `send(${JSON.stringify(reqBody.content['application/vnd.api+json'].example)})`
            );
        }

        const body = `
            const res = await request(app).${req.join('.')};

            expect(res.statusCode).toBe(${data.response.key});
            expect(res.type).toBe('application/vnd.api+json');
            expect(res.body).toMatchSchema(${JSON.stringify(
                response.content['application/vnd.api+json'].schema
            )});
        `;

        return itBlock(`should ${response.description}`, body);
    }

    function transformResponses(responses, data) {
        return Object.keys(responses)
            .reduce((acc, response) => {
                // eslint-disable-next-line no-param-reassign
                data.response = {
                    key: response,
                    value: responses[response]
                };

                acc.push(describeBlock(response, transformResponse(responses[response], data)));

                return acc;
            }, [])
            .join('\n');
    }

    function transformVerbs(verbs, data) {
        return Object.keys(verbs)
            .reduce((acc, verb) => {
                // eslint-disable-next-line no-param-reassign
                data.verb = {
                    key: verb,
                    value: verbs[verb]
                };

                acc.push(describeBlock(verb, transformResponses(verbs[verb].responses, data)));

                return acc;
            }, [])
            .join('\n');
    }

    function transformPaths(paths, data = {}) {
        return Object.keys(paths).reduce((acc, path) => {
            // eslint-disable-next-line no-param-reassign
            data.path = {
                key: path,
                value: paths[path]
            };

            acc.push(describeBlock(path, transformVerbs(paths[path], data)));
            return acc;
        }, []);
    }

    fs.writeFile(
        `${process.cwd()}/test/openapi.test.js`,
        prettier.format(
            `
            // 'use strict';

            const request = require('supertest');
            const {matchersWithOptions} = require('jest-json-schema');

            // app has an indirect dependency on questionnaire-dal.js, require it after
            // the mock so that it references the mocked version
            const app = require('../src/index.js');

            expect.extend(
                matchersWithOptions({
                    allErrors: true,
                    jsonPointers: true,
                    format: 'full',
                    coerceTypes: true
                })
            );

            ${transformPaths(contract.paths).join('\n')}
        `,
            merge({ parser: 'babel' }, prettierConfig) // https://prettier.io/docs/en/options.html.
        ),
        err => {
            // throws an error, you could also catch it here
            if (err) {
                throw err;
            }

            // success case, the file was saved
            // eslint-disable-next-line no-console
            console.log('Tests saved');
        }
    );
})();
