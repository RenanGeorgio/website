export type Crop = {
    x: number | string;
    y: number | string; 
    width: number | string;
    height: number | string;
}

type FilterConditionally<Source, Condition> = Pick<
    Source, 
    {
        [K in keyof Source]: Source[K] extends Condition ? K : never
    }[keyof Source]
>

type ElementType<P = any> = {[K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never}[keyof JSX.IntrinsicElements] | ComponentType<P>;

export interface FieldArrayHelpers<T = any> {
    unshift(item: T): void;
    push(item: T): void;
    insert(item: T, index: number): void;
    move(item: T, toIndex: number): void;
    remove(item: T): void;
    update(item: T, oldItem: T): void;
};