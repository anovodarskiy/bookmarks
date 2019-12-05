import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupByField' })
export class GroupByFieldPipe implements PipeTransform {
    transform(array: Array<any>, field) {
        if (array) {
            const groupedObj = array.reduce((prev, cur) => {
                if (!prev[cur[field]]) {
                    prev[cur[field]] = [cur];
                } else {
                    prev[cur[field]].push(cur);
                }
                return prev;
            }, {});
            return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
        }
        return [];
    }
}