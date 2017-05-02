import * as _ from 'lodash';

interface FilteredInterFace {
    query: {};
    filter: {
        bool: {
            must: {}[];
            must_not: {}[];
        }
    }
}
interface QueryInterFace {
    size: number;
    aggs: {};
    query: {
        filtered: FilteredInterFace
    };
}

export class QueryBuilder {

    query: QueryInterFace = {
        size: 0,
        aggs: {},
        query: {
            filtered: {
                query: {
                    query_string: {
                        query: '*',
                        analyze_wildcard: true
                    }
                },
                filter: {
                    bool: {
                        must: [{
                            range: {
                                time_start: {
                                    gte: 1490098669084,
                                    lte: 1490185069084,
                                    format: "epoch_millis"
                                }
                            }
                        }],
                        must_not: []
                    }
                },
            }
        }
    };

    constructor() {

    }

    addFilters(filters) {

        return this;
    }

    addMetrics(metrics) {

        /*this.query.metrics = _.reduce(metrics, (acc, metric, index) => {


            let met = {};

            return _.assign({}, {[index + 1]: met})
        }, {});*/

        return this;
    }

    addBuckets(buckets) {

        if(buckets.length > 0) {

            this.query.aggs = _.assign({}, _.reduce(buckets, (acc, bucket: any, index) => {
                let agg = {};
                agg[bucket.agg.aggregration] = {};
                agg[bucket.agg.aggregration]["field"] = bucket.agg.field;
                agg[bucket.agg.aggregration]['interval'] = bucket.agg.interval;
                agg[bucket.agg.aggregration]["time_zone"] = "Europe/London";
                agg[bucket.agg.aggregration]["min_doc_count"] = 1
                agg[bucket.agg.aggregration]["extended_bounds"] = {
                    min: 1490179132546,
                    max: 1490180032546
                };

                return _.assign({}, {[index + 1]: agg})

            }, {}));
        }

        return this;
    }

    addFiltered() {

    }

    build() {

        return _.assign({}, this.query);
    }
}

