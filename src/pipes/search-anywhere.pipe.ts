import { Pipe, PipeTransform } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/Rx';



/*
 * Filter
 * -------
 * 1. Filter term anywhere: items | <this_pipe_name>:'filter':searchTerm
 * 2. Filter term in specific field of the object: items | <this_pipe_name>:'filter':searchTerm:fieldName
 *
 * OrderBy
 * -------
 * 1. OrderBy field name of the object: items | <this_pipe_name>:'orderBy':fieldName:<boolean, true=asc/false=desc>
 * 
 */
@Pipe({
    name: 'searchAnywhere',
    pure: false
})
export class SearchAnywherePipe implements PipeTransform {
    transform(items: any[], ...args: any[]) {

        if (items == null || items.length == 0) {
            return [];
        } else if (args[0] === undefined || args[0] == '') {
            return items;
        } else if (args.length == 2) {
            switch (args[0]) {
                case 'filter':

                    //console.log("filter1:::::::::::::::::" + args[1].toLowerCase());
                    return items.filter(item => JSON.stringify(item).toString().toLowerCase().indexOf(args[1].toString().toLowerCase()) > -1);

                case 'orderBy':
                    //return items.sort((item => JSON.stringify(item).toLowerCase().indexOf(args[1].toLowerCase())));
                    return items.sort((a, b) => a[args[1]] > b[args[1]] ? 1:a[args[1]] < b[args[1]] ? -1 : 0);
            }
        } else {
            switch (args[0]) {
                case 'filter':
                    // console.log("filter2:::::::::::::::::" + args[1].toLowerCase());
                    if (args[2] == '') {
                        return items.filter(item => JSON.stringify(item).toString().toLowerCase().indexOf(args[1].toString().toLowerCase()) > -1);
                    } else {
                        return items.filter(item =>JSON.stringify(item[args[2]]).toString().toLowerCase().indexOf(args[1].toString().toLowerCase()) > -1);
                    }
                case 'orderBy':
                    //not currenty used
                    // console.log("orderBy2:::::::::::::::::" + args[1].toLowerCase());
                    if(args[2]){
                    return items.sort((a, b) => a[args[1]] < b[args[1]] ? 1:a[args[1]] > b[args[1]] ? -1 : 0);
                } else {
                    return items.sort((a, b) => a[args[1]] > b[args[1]] ? 1:a[args[1]] < b[args[1]] ? -1 : 0);
                }

            }
        }
    }

}