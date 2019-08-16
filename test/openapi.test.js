// 'use strict';

const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');

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

describe('/hands/', () => {
    describe('post', () => {
        describe('200', () => {
            it('should Success', async () => {
                const res = await request(app)
                    .post('/api/v1/hands/')
                    .set('Content-Type', 'application/vnd.api+json')
                    .send({
                        data: {
                            type: 'hands',
                            attributes: {
                                cards: ['1-s', '3-s', '3-h', '10-s', '9-d', '6-s', '4-c']
                            }
                        }
                    });

                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    additionalProperties: false,
                    required: ['data'],
                    properties: {
                        data: {
                            type: 'array',
                            additionalProperties: false,
                            items: {
                                required: ['type', 'id', 'attributes'],
                                additionalProperties: false,
                                properties: {
                                    type: { const: 'hands' },
                                    id: {
                                        type: 'string',
                                        enum: [
                                            'high-card',
                                            'pair',
                                            'two-pairs',
                                            'three-of-a-kind',
                                            'straight',
                                            'flush',
                                            'full-house',
                                            'four-of-a-kind',
                                            'straight-flush',
                                            'royal-flush'
                                        ]
                                    },
                                    attributes: {
                                        $schema: 'http://json-schema.org/draft-07/schema#',
                                        type: 'object',
                                        required: ['cards', 'description', 'precedence', 'name'],
                                        additionalProperties: false,
                                        properties: {
                                            cards: {
                                                type: 'object',
                                                additionalProperties: false,
                                                required: ['best', 'all'],
                                                properties: {
                                                    best: {
                                                        anyOf: [
                                                            {
                                                                type: 'object',
                                                                required: [
                                                                    'cardCode',
                                                                    'cardValue',
                                                                    'cardSuit',
                                                                    'cardName',
                                                                    'card'
                                                                ],
                                                                additionalProperties: false,
                                                                properties: {
                                                                    cardCode: { type: 'string' },
                                                                    cardValue: { type: 'integer' },
                                                                    cardSuit: { type: 'string' },
                                                                    cardName: { type: 'string' },
                                                                    card: { type: 'string' }
                                                                }
                                                            },
                                                            {
                                                                type: 'array',
                                                                items: {
                                                                    type: 'object',
                                                                    required: [
                                                                        'cardCode',
                                                                        'cardValue',
                                                                        'cardSuit',
                                                                        'cardName',
                                                                        'card'
                                                                    ],
                                                                    additionalProperties: false,
                                                                    properties: {
                                                                        cardCode: {
                                                                            type: 'string'
                                                                        },
                                                                        cardValue: {
                                                                            type: 'integer'
                                                                        },
                                                                        cardSuit: {
                                                                            type: 'string'
                                                                        },
                                                                        cardName: {
                                                                            type: 'string'
                                                                        },
                                                                        card: { type: 'string' }
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    all: {
                                                        type: 'array',
                                                        items: {
                                                            anyOf: [
                                                                {
                                                                    type: 'object',
                                                                    required: [
                                                                        'cardCode',
                                                                        'cardValue',
                                                                        'cardSuit',
                                                                        'cardName',
                                                                        'card'
                                                                    ],
                                                                    additionalProperties: false,
                                                                    properties: {
                                                                        cardCode: {
                                                                            type: 'string'
                                                                        },
                                                                        cardValue: {
                                                                            type: 'integer'
                                                                        },
                                                                        cardSuit: {
                                                                            type: 'string'
                                                                        },
                                                                        cardName: {
                                                                            type: 'string'
                                                                        },
                                                                        card: { type: 'string' }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'array',
                                                                    items: {
                                                                        type: 'object',
                                                                        required: [
                                                                            'cardCode',
                                                                            'cardValue',
                                                                            'cardSuit',
                                                                            'cardName',
                                                                            'card'
                                                                        ],
                                                                        additionalProperties: false,
                                                                        properties: {
                                                                            cardCode: {
                                                                                type: 'string'
                                                                            },
                                                                            cardValue: {
                                                                                type: 'integer'
                                                                            },
                                                                            cardSuit: {
                                                                                type: 'string'
                                                                            },
                                                                            cardName: {
                                                                                type: 'string'
                                                                            },
                                                                            card: { type: 'string' }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                }
                                            },
                                            description: { type: 'string', maxLength: 200 },
                                            precedence: { type: 'number', minimum: 0, maximum: 9 },
                                            name: { type: 'string', maxLength: 20 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            });
        });
        describe('400', () => {
            it('should There is an issue with the request', async () => {
                const res = await request(app)
                    .post('/api/v1/hands/')
                    .set('Content-Type', 'application/vnd.api+json')
                    .send({
                        data: {
                            type: 'hands',
                            attributes: {
                                cards: ['20-s', '3-x', '3-h', '10-s', '9-p', '6-s', '4-c']
                            }
                        }
                    });

                expect(res.statusCode).toBe(400);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    required: ['errors'],
                    properties: {
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['status', 'title', 'detail'],
                                properties: {
                                    status: { const: 400 },
                                    title: { const: '400 Bad Request' },
                                    detail: { type: 'string' }
                                }
                            }
                        }
                    }
                });
            });
        });
    });
});
describe('/hands/{handName}', () => {
    describe('post', () => {
        describe('200', () => {
            it('should Success', async () => {
                const res = await request(app)
                    .post('/api/v1/hands/full-house')
                    .set('Content-Type', 'application/vnd.api+json')
                    .send({
                        data: {
                            type: 'hands',
                            attributes: {
                                cards: ['1-s', '3-s', '3-h', '10-s', '9-d', '9-s', '9-c']
                            }
                        }
                    });

                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    additionalProperties: false,
                    required: ['data'],
                    properties: {
                        data: {
                            type: 'array',
                            additionalProperties: false,
                            items: {
                                required: ['type', 'id', 'attributes'],
                                additionalProperties: false,
                                properties: {
                                    type: { const: 'hands' },
                                    id: {
                                        type: 'string',
                                        enum: [
                                            'high-card',
                                            'pair',
                                            'two-pairs',
                                            'three-of-a-kind',
                                            'straight',
                                            'flush',
                                            'full-house',
                                            'four-of-a-kind',
                                            'straight-flush',
                                            'royal-flush'
                                        ]
                                    },
                                    attributes: {
                                        $schema: 'http://json-schema.org/draft-07/schema#',
                                        type: 'object',
                                        required: ['cards', 'description', 'precedence', 'name'],
                                        additionalProperties: false,
                                        properties: {
                                            cards: {
                                                type: 'object',
                                                additionalProperties: false,
                                                required: ['best', 'all'],
                                                properties: {
                                                    best: {
                                                        anyOf: [
                                                            {
                                                                type: 'object',
                                                                required: [
                                                                    'cardCode',
                                                                    'cardValue',
                                                                    'cardSuit',
                                                                    'cardName',
                                                                    'card'
                                                                ],
                                                                additionalProperties: false,
                                                                properties: {
                                                                    cardCode: { type: 'string' },
                                                                    cardValue: { type: 'integer' },
                                                                    cardSuit: { type: 'string' },
                                                                    cardName: { type: 'string' },
                                                                    card: { type: 'string' }
                                                                }
                                                            },
                                                            {
                                                                type: 'array',
                                                                items: {
                                                                    type: 'object',
                                                                    required: [
                                                                        'cardCode',
                                                                        'cardValue',
                                                                        'cardSuit',
                                                                        'cardName',
                                                                        'card'
                                                                    ],
                                                                    additionalProperties: false,
                                                                    properties: {
                                                                        cardCode: {
                                                                            type: 'string'
                                                                        },
                                                                        cardValue: {
                                                                            type: 'integer'
                                                                        },
                                                                        cardSuit: {
                                                                            type: 'string'
                                                                        },
                                                                        cardName: {
                                                                            type: 'string'
                                                                        },
                                                                        card: { type: 'string' }
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    all: {
                                                        type: 'array',
                                                        items: {
                                                            anyOf: [
                                                                {
                                                                    type: 'object',
                                                                    required: [
                                                                        'cardCode',
                                                                        'cardValue',
                                                                        'cardSuit',
                                                                        'cardName',
                                                                        'card'
                                                                    ],
                                                                    additionalProperties: false,
                                                                    properties: {
                                                                        cardCode: {
                                                                            type: 'string'
                                                                        },
                                                                        cardValue: {
                                                                            type: 'integer'
                                                                        },
                                                                        cardSuit: {
                                                                            type: 'string'
                                                                        },
                                                                        cardName: {
                                                                            type: 'string'
                                                                        },
                                                                        card: { type: 'string' }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'array',
                                                                    items: {
                                                                        type: 'object',
                                                                        required: [
                                                                            'cardCode',
                                                                            'cardValue',
                                                                            'cardSuit',
                                                                            'cardName',
                                                                            'card'
                                                                        ],
                                                                        additionalProperties: false,
                                                                        properties: {
                                                                            cardCode: {
                                                                                type: 'string'
                                                                            },
                                                                            cardValue: {
                                                                                type: 'integer'
                                                                            },
                                                                            cardSuit: {
                                                                                type: 'string'
                                                                            },
                                                                            cardName: {
                                                                                type: 'string'
                                                                            },
                                                                            card: { type: 'string' }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                }
                                            },
                                            description: { type: 'string', maxLength: 200 },
                                            precedence: { type: 'number', minimum: 0, maximum: 9 },
                                            name: { type: 'string', maxLength: 20 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            });
        });
        describe('400', () => {
            it('should There is an issue with the request', async () => {
                const res = await request(app)
                    .post('/api/v1/hands/full-house')
                    .set('Content-Type', 'application/vnd.api+json')
                    .send({
                        data: {
                            type: 'hands',
                            attributes: {
                                cards: ['20-s', '3-x', '3-h', '10-s', '9-p', '6-s', '4-c']
                            }
                        }
                    });

                expect(res.statusCode).toBe(400);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    required: ['errors'],
                    properties: {
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['status', 'title', 'detail'],
                                properties: {
                                    status: { const: 400 },
                                    title: { const: '400 Bad Request' },
                                    detail: { type: 'string' }
                                }
                            }
                        }
                    }
                });
            });
        });
        describe('404', () => {
            it('should The specified resource was not found', async () => {
                const res = await request(app)
                    .post('/api/v1/hands/blah-blah-not-real-hand-name')
                    .set('Content-Type', 'application/vnd.api+json')
                    .send({
                        data: {
                            type: 'hands',
                            attributes: {
                                cards: ['1-s', '3-s', '3-h', '10-s', '9-d', '9-s', '9-c']
                            }
                        }
                    });

                expect(res.statusCode).toBe(404);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    required: ['errors'],
                    properties: {
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['status', 'title', 'detail'],
                                properties: {
                                    status: { const: 404 },
                                    title: { const: '404 Not Found' },
                                    detail: { type: 'string' }
                                }
                            }
                        }
                    }
                });
            });
        });
    });
});
describe('/hands/{handName}/precedence', () => {
    describe('get', () => {
        describe('200', () => {
            it('should Success', async () => {
                const res = await request(app).get('/api/v1/hands/full-house/precedence');

                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    required: ['data'],
                    properties: {
                        data: {
                            type: 'object',
                            required: ['type', 'id', 'attributes'],
                            additionalProperties: false,
                            properties: {
                                type: { const: 'precedences' },
                                id: {
                                    type: 'string',
                                    enum: [
                                        'high-card',
                                        'pair',
                                        'two-pairs',
                                        'three-of-a-kind',
                                        'straight',
                                        'flush',
                                        'full-house',
                                        'four-of-a-kind',
                                        'straight-flush',
                                        'royal-flush'
                                    ]
                                },
                                attributes: {
                                    type: 'object',
                                    properties: { precedence: { type: 'number' } }
                                }
                            }
                        }
                    }
                });
            });
        });
        describe('404', () => {
            it('should The specified resource was not found', async () => {
                const res = await request(app).get('/api/v1/hands/not-a-hand-name/precedence');

                expect(res.statusCode).toBe(404);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    required: ['errors'],
                    properties: {
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['status', 'title', 'detail'],
                                properties: {
                                    status: { const: 404 },
                                    title: { const: '404 Not Found' },
                                    detail: { type: 'string' }
                                }
                            }
                        }
                    }
                });
            });
        });
    });
});
describe('/hands/{handName}/description', () => {
    describe('get', () => {
        describe('200', () => {
            it('should Success', async () => {
                const res = await request(app).get('/api/v1/hands/full-house/description');

                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    required: ['data'],
                    properties: {
                        data: {
                            type: 'object',
                            required: ['type', 'id', 'attributes'],
                            additionalProperties: false,
                            properties: {
                                type: { const: 'descriptions' },
                                id: {
                                    type: 'string',
                                    enum: [
                                        'high-card',
                                        'pair',
                                        'two-pairs',
                                        'three-of-a-kind',
                                        'straight',
                                        'flush',
                                        'full-house',
                                        'four-of-a-kind',
                                        'straight-flush',
                                        'royal-flush'
                                    ]
                                },
                                attributes: {
                                    type: 'object',
                                    properties: { description: { type: 'string' } }
                                }
                            }
                        }
                    }
                });
            });
        });
        describe('404', () => {
            it('should The specified resource was not found', async () => {
                const res = await request(app).get('/api/v1/hands/not-a-hand-name/description');

                expect(res.statusCode).toBe(404);
                expect(res.type).toBe('application/vnd.api+json');
                expect(res.body).toMatchSchema({
                    $schema: 'http://json-schema.org/draft-07/schema#',
                    type: 'object',
                    required: ['errors'],
                    properties: {
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['status', 'title', 'detail'],
                                properties: {
                                    status: { const: 404 },
                                    title: { const: '404 Not Found' },
                                    detail: { type: 'string' }
                                }
                            }
                        }
                    }
                });
            });
        });
    });
});
