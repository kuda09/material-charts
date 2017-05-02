import * as _ from 'lodash';


export class ResultsFormatter {

    constructor() {

    }

    checkResults(results) {

        if (results !== undefined) {

            return true;
        }
        return false;
    }

    getValues(results) {

        if(_.isEqual(results.aggregations, {})) {

            return [results.hits.hits.total];
        }

        const aggregrations = _.values(results.aggregations);

        return _.reduce(aggregrations, (acc, aggregration) => [...acc, aggregration], []);

    }

    computeArray(results) {

        return this.getValues(results);
    }

}