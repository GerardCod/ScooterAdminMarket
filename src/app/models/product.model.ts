import { Category } from './category.model';

export class Product {
    constructor(
        public name: string,
        public description: string,
        public description_long: string,
        public stock: number,
        public is_available: boolean,
        public price: number,
        public category_id: number,
        public category: Category,
        public picture?: string,
        public id?: number,
        public menu_categories?: Array<any>
    ) {}
}
