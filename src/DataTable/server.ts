import { dataGrid } from './data-grid';
import DataTable from './DataTable.html';

export default {
    getPaged(this: DataTable, props, pred) {
        const { paginate, getList } = this.get(); // this.refs.grid.get();
        if (getList && (!pred || pred(paginate))) {
            const p = Object.assign({}, paginate, props);
            getList(p).then(data => {
                this.set({ paged: data });
            });		
        }
    },

    oncreate(p: DataTable) {
        const grid = Object.assign(this, p);

        grid.observe('paged', paged => {
            if (paged) {
                const { paginate, rows, getList } = paged;
                const d = {
                    paginate,
                    rowCount: paginate.total,
                    pageCount: paginate.pages,
                    paginated: rows,
                    selectedPage: paginate ? (paginate.page - 1) : 0
                }
                if (getList) {
                    (d as any).getList = getList;
                }
                grid.set(d);
            }
        }, { init: false });
        return grid;
    }
}