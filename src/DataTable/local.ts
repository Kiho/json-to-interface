import { collect } from './data-grid';
import DataTable from './DataTable.html';
import Fuse from 'fuse.js';

interface ISearchConfig {
    keys: any;
    getFn?: any;
    threshold?: number;
    distance?: number;
}

interface IDataTable extends DataTable {
    getPaged(props, pred): void;
    paginateRows(rows: any[]): void;
    processRows(rows: any[], searchText?: string): void;
}

export default {
    getPaged(this: IDataTable, props, pred) {
        const { page } = props;            
        if (!pred || pred({page: this.get('selectedPage')})) {
            if (page) {
                props.currentPage = page;
            }
            // console.log('getPaged - props', props);	
            this.set(props);
            this.processRows(this.get('rows'));	
        }
    },
    
    paginateRows(this: IDataTable, rows: any[]) {
        const { currentPerPage, currentPage, paginate } = this.get();
        let paginatedRows = rows;
        if (paginate)
            paginatedRows = paginatedRows.slice((currentPage - 1) * currentPerPage, currentPerPage === -1 ? paginatedRows.length + 1 : currentPage * currentPerPage);
        this.set({paginated: paginatedRows});
        // console.log('paginatedRows', paginatedRows);
    },

    processRows(this: IDataTable, rows: any[], searchText?: string) {
        let computedRows = rows;				
        const { currentPage, currentPerPage, columns,
            sortable, sortColumn, sortType, 
            searchInput, exactSearch } = this.get();
        if (!searchText) {
            searchText = searchInput;
        }	
        if (sortable !== false && sortColumn > -1 && columns)
            computedRows = computedRows.sort((x,y) => {
                if (!columns[sortColumn])
                    return 0;

                const cook = (x) => {
                    x = collect(x, columns[sortColumn].field);
                    if (typeof(x) === 'string') {
                        x = x.toLowerCase();
                         if (columns[sortColumn].numeric)
                            x = x.indexOf('.') >= 0 ? parseFloat(x) : parseInt(x);
                    }
                    return x;
                }

                x = cook(x);
                y = cook(y);

                return (x < y ? -1 : (x > y ? 1 : 0)) * (sortType === 'desc' ? -1 : 1);
            })

        if (searchText) {
            const searchConfig: ISearchConfig = { keys: columns.map(c => c.field) }
                // Enable searching of numbers (non-string)
                // Temporary fix of https://github.com/krisk/Fuse/issues/144
                searchConfig.getFn = function (obj, path) {
                if(Number.isInteger(obj[path]))
                return JSON.stringify(obj[path]);
                    return obj[path];
            }

            if (exactSearch) {
                //return only exact matches
                searchConfig.threshold = 0,
                searchConfig.distance = 0
            }

            computedRows = (new Fuse(computedRows, searchConfig)).search(searchText);
        }

        const pageCount = Math.ceil(computedRows.length / currentPerPage);
        this.set({processedRows: computedRows, rowCount: computedRows.length, pageCount});
        this.paginateRows(computedRows);
    },

    oncreate: function(p: DataTable) {
        const grid = Object.assign(this, p);

        grid.observe('rows', rows => {
            grid.processRows(rows);		
        }, { init: false });
        return grid;
    }
}