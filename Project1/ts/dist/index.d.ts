declare let a: number;
declare let b: string;
declare let c: any;
declare let d: (number | string)[];
declare let d2: [string, number];
interface Props {
    readonly list: Array<{
        readonly id: number;
        money: number;
        count: number;
    }>;
    onChange: () => void;
    onReudce?: () => void;
}
declare let e: Props;
declare function fun(a1: number, a2?: string, a3?: number[], a4?: () => void): void;
declare function swap<T, U>(tuple: [T, U]): [U, T];
declare let f: {};
interface IItem {
    id: number;
    detail: string;
}
declare let g: Props & IItem;
interface IStateProps {
}
interface IDispatchProps {
}
interface IOwnProps {
}
declare let h: Props | IItem;
declare type yinleijie = number | string;
declare type dongjiangcheng = Props;
declare type lijie = 'lijie';
declare let i: yinleijie;
declare let j: lijie;
