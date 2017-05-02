import * as _  from 'lodash';


export function updateVis(oldState, newState) {

    return _.assign({}, _.cloneDeep(oldState), _.cloneDeep(newState));
}