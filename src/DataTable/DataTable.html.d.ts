interface DataTableOptions      { selectedPage?: number;
currentPage?: number;
currentPerPage?: number;
pageCount?: number;
rowCount?: number;
sortIndex?: number;
sortColumn?: number;
sortType?: string;
searching?: boolean;
searchInput?: string;
process?: string;
title?: string;
columns?: any[];
rows?: any[];
processedRows?: any[];
paged?: {};
paginate?: {};
paginated?: any[];
clickable?: boolean;
customButtons?: any[];
perPage?: number[];
perPageOptions?: any[];
defaultPerPage?: any;
sortable?: boolean;
searchable?: boolean;
exactSearch?: boolean;
exportable?: boolean;
printable?: boolean;
getList?: (p?: any) => any;
}
declare class DataTable extends Svelte<DataTableOptions>
{
    search: (e: any) => void;
   click: (row: any) => void;
   exportExcel: () => void;
   print: () => void;
   sort: (index: any) => void;
}
export default DataTable