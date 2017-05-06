import {Component, OnInit, OnDestroy} from '@angular/core';
import {IApplication} from "../../../store/state/application.state";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {IVisualisations} from "../../../store/state/vis.state";
import * as _ from 'lodash';
import {ISearches} from "../../../store/state/search.state";
import {NewSearchAction} from "../../../store/actions/search.action";
import {IVisTypes} from "../../../store/state/visTypes.state";
import {EditVisAction} from "../../../store/actions/vis.action";
import {QueryBuilder} from "../../../query_builder";
import {ResultsFormatter} from "../../../resultsFormatter";
import {IVisualisation} from "../../../store/state/interfaces/vis.interface";
import {Observable} from "rxjs";


@Component({
    selector: 'app-visualisation',
    templateUrl: 'visualisation.component.html',
    styleUrls: ['visualisation.component.scss']
})
export class VisualisationComponent implements OnInit, OnDestroy {

    id: number;
    isSearching: boolean = false;
    vis: IVisualisation;
    visTypes: IVisTypes;
    buckets = [];

    combinedStream$;

    queryBuilder = new QueryBuilder();
    resultsFormatter = new ResultsFormatter();

    constructor(private store: Store<IApplication>, private route: ActivatedRoute) {

        route.params
            .subscribe(params => this.id = params['id']);

        this.combinedStream$ = Observable.combineLatest(
            this.store.select('visualisations'),
            this.store.select('visTypes'),
            this.store.select('search'),
            (visualisations, visTypes, search) => ({visualisations, visTypes, search})
        );
    }

    ngOnInit(): void {

        this.combinedStream$
            .subscribe((state) => {

                const {visualisations, visTypes, search} = state;

                this.vis = _.find(visualisations, (vis: IVisualisation) => vis.id === this.id);
                this.search(this.vis);
                this.visTypes = visTypes;


                this.buckets = [];

                if (search[0].results !== undefined) {

                    this.isSearching = false;

                    let results = search[0].results;

                    if (this.resultsFormatter.checkResults(results)) {

                        this.buckets = this.resultsFormatter.computeArray(results)[0].buckets;

                    }
                }
            })

    }

    ngOnDestroy(): void {

        this.combinedStream$.unsubscribe();
        this.vis = null;
        this.id = null;
        this.buckets = [];
        this.visTypes = [];
    }

    visualize(vis): void {
        this.store.dispatch(new EditVisAction(vis));
    }

    statify(visType): void {
        const newVis = _.assign({}, this.vis, {type: visType});
        this.store.dispatch(new EditVisAction(newVis));
    }

    search(vis) {

        this.isSearching = true;
        const query = _.assign({}, {
            body: this.queryBuilder
                .addBuckets(vis.buckets)
                .build()
        });

        this.store.dispatch(new NewSearchAction(query));

    }

}
