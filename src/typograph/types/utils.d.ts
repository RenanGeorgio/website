export type Crop = {
    x: number | string;
    y: number | string; 
    width: number | string;
    height: number | string;
}

type FilterConditionally<Source, Condition> = Pick<
Source, {[K in keyof Source]: Source[K] extends Condition 
    ? K : never}
    [keyof Source]
>;

type ElementType<P = any> = {[K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never}[keyof JSX.IntrinsicElements] | ComponentType<P>;