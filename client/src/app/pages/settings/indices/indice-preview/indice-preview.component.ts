import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-indice-preview',
    templateUrl: 'indice-preview.component.html',
    styleUrls: ['indice-preview.component.scss']
})
export class IndicePreviewComponent implements OnInit {


    @Input()
    indices;

    @Output()
    remove = new EventEmitter();



    constructor() {

    }

    ngOnInit() {

    }

    mergeMappings(mappings) {

        return _.reduce(_.values(mappings), function (acc, mapping) {

            return _.assign({}, _.cloneDeep(acc), _.cloneDeep(mapping));

        }, {});

    }

    keysArray(mappings) {

        let keys = [];

        for(let key in mappings) {

            keys.push({
                key: key,
                value: mappings[key]
            })
        }

        return keys;

    }

    deleteIndice(indice) {

        this.remove.emit(indice);

    }


}
