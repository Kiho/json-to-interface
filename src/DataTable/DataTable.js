import Paginate from './paginate.html';
import { debounce } from './debounce';
import local from './local';
import server from './server';
import { collect, dataGrid } from './data-grid';

export default {
    data() {
        return {
            selectedPage: 0,
            currentPage: 1,
            currentPerPage: 10,
            pageCount: 0,
            rowCount: 0,
            sortIndex: -1,
            sortColumn: -1,
            sortType: 'asc',
            searching: false,
            searchInput: '',
            // props
            process: 'server',
            title: '',
            columns: [],
            rows: [],
            processedRows: [],
            paged: {},
            paginate: {},
            paginated: [],
            clickable:true,
            customButtons: [],
            perPage:  [10, 20, 30, 40, 50],
            perPageOptions: [],
            defaultPerPage: null,
            sortable: true,
            searchable: true,
            exactSearch: false,
            exportable: true,
            printable: true,
            getList: (p) => any,			
        };
    },

    components: {
        Paginate,
    },

    methods: {
        search(e) {
            const searching = !this.get('searching');
            this.set({searching});
            if (searching) {
                setTimeout(() => this.refs.searchInput.focus(), 100);
            }
        },
        click(row) {
            dataGrid.click(this, row)
        },
        exportExcel() {
            dataGrid.exportExcel(this);
        },
        print() {
            dataGrid.print(this);
        },
        sort(index) {
            if (index > -1) {
                dataGrid.setSortIcon(this, index);
                const { columns, sortType } = this.get();
                this.getPaged({colName: columns[index].field, direction: sortType});				
            }
        }
    },

    helpers: {
        collect
    },
    
    oncreate() {
        const { process } = this.get();
        let grid;
        if (process== 'server') {
            grid = server.oncreate.call(this, server);
        } else {
            grid = local.oncreate.call(this, local);
        }
        
        dataGrid.setPerPageOptions(grid);
        grid.observe('currentPerPage', currentPerPage => {
            this.getPaged({size: currentPerPage});
        }, { init: false });
        grid.observe('searchInput', debounce((searchInput) => {
            this.getPaged({searchText: searchInput});
        }, 250), { init: false });
        grid.observe('selectedPage', selected => {
            const newPage = selected + 1;
            this.getPaged({page: newPage}, x => x.page != newPage);
        }, { init: false });
    }
}