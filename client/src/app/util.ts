import * as _ from 'lodash';
import {IIndice} from "./store/state/indices.state";
import * as moment from 'moment';
import * as uuid from 'uuid';
import {IApplicationState} from "./store/state/application.state";

const bodyBuilder = require('bodybuilder');

let typeCache: {[label: string]: boolean} = {}

export function type<T>(label: T | ''): T {

    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unique"`);
    }

    typeCache[<string>label] = true;

    return <T>label;

}
export function getSelectedIndiceIndexAndType(state: IApplicationState) {

    let indices = state.indices;

    let selectedIndice = _.filter(indices, (indice: IIndice) => indice.selected === true);

    return {
        index: selectedIndice[0].index,
        type: Object.keys(selectedIndice[0].mappings)[0]
    }
}
export function getCurrentDate() {

    return moment().format('d/MM/YYYY')
}
export function getPreviousDayDate() {

    return moment().subtract(1, 'days').format('d/MM/YYYY');
}
export function getSelectedIndex(indices) {
    return _.filter(indices, (indice: IIndice) => indice.selected === true)[0];
}
export function generateUniqueId() {
    return uuid.v1();
}
export function getListOfFieldNames(indice: any) {

    return _.reduce(_.values(indice.mappings), (acc, mapping: any) => {
        return mapping;
    }, [])
}
export function getNumberFields(fields: any) {

    return _.filter(fields, (field: any) => field.type === 'long');
}
export function getStringFields(fields) {

    return _.filter(fields, (field: any) => field.type === 'string');
}
export function getDateFields(fields: any) {

    return _.filter(fields, (field:any) => field.type === 'date');
}
export function getResultsCount (buckets) {

    return _.reduce(buckets, (acc, bucket: any) => [...acc,bucket.doc_count] ,[]);
}
export function getLabels (buckets: {}[]): string [] {

    return _.reduce(buckets, (acc, bucket: any) => {

        return [...acc,(formatDailyDate(bucket.key_as_string))];
    },[]);
}
export function formatDailyDate(date) {

    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}
export function convertBucketsToLabelsAndValues(buckets) {

    return _.reduce(buckets, (acc, bucket: any) => {

        const _bucket = _.assign({}, {
            label: formatDailyDate(bucket.key_as_string),
            value: bucket.doc_count
        });


        return [...acc, _bucket];
    },[]);
}
export function convertBucketsToXsAndYs(buckets) {

    return _.reduce(buckets, (acc, bucket: any, index) => {

        const _bucket = _.assign({}, {
            x: index,
            y: bucket.doc_count
        });


        return [...acc, _bucket];
    },[]);
}
export function chartType(type){


}
function isPieChart(type) {


    return null;
}

export function isFieldDefined(obj?, field?){

    if(obj['agg'][field] !== undefined) {

        return obj['agg'][field] ;
    }

    return '';
}

