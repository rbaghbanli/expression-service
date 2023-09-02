import { ExpressionValue, ExpressionType, typeBoolean, typeNumber, typeString, typeAny, typeArray, typeFunction } from './ExpressionType.js';
import { ExpressionNode } from './ExpressionNode.js';

export class ExpressionFunction {

	constructor(
		protected _function: ( ...values: any[] ) => ExpressionValue,
		protected _argTypes: ExpressionType[],
		protected _type: ExpressionType,
		protected _inference?: ( type: string, mask: string ) => boolean
	) {}

	clone(): ExpressionFunction {
		return new ExpressionFunction( this._function, this._argTypes, this._type, this._inference );
	}

	evaluate( ...values: any[] ): ExpressionValue {
		return this._function( ...values );
	}

	get arity(): number {
		return this._argTypes.length;
	}

	get argTypes(): ExpressionType[] {
		return this._argTypes;
	}

	get type(): ExpressionType {
		return this._type;
	}

	get inference(): ( ( type: string, mask: string ) => boolean ) | undefined {
		return this._inference;
	}

}

export const funcAnd = new ExpressionFunction(
	( ...args: ( boolean | boolean[] )[] ) => args.flat().every( v => v ),
	[ new ExpressionType( 'boolean', 'array' ) ],
	typeBoolean
);
export const funcOr = new ExpressionFunction(
	( ...args: ( boolean | boolean[] )[] ) => args.flat().some( v => v ),
	[ new ExpressionType( 'boolean', 'array' ) ],
	typeBoolean
);
export const funcNot = new ExpressionFunction(
	( arg: boolean ) => !arg,
	[ typeBoolean ],
	typeBoolean
);
export const funcGt = new ExpressionFunction(
	( arg1: number, arg2: number ) => arg1 > arg2,
	[ typeNumber, typeNumber ],
	typeBoolean
);
export const funcLt = new ExpressionFunction(
	( arg1: number, arg2: number ) => arg1 < arg2,
	[ typeNumber, typeNumber ],
	typeBoolean
);
export const funcGe = new ExpressionFunction(
	( arg1: number, arg2: number ) => arg1 >= arg2,
	[ typeNumber, typeNumber ],
	typeBoolean
);
export const funcLe = new ExpressionFunction(
	( arg1: number, arg2: number ) => arg1 <= arg2,
	[ typeNumber, typeNumber ],
	typeBoolean
);
export const funcEq = new ExpressionFunction(
	( arg1: boolean | number | string, arg2: boolean | number | string ) => ExpressionType.equate( arg1, arg2 ),
	[ typeAny, typeAny ],
	typeBoolean
);
export const funcNe = new ExpressionFunction(
	( arg1: boolean | number | string, arg2: boolean | number | string ) => !ExpressionType.equate( arg1, arg2 ),
	[ typeAny, typeAny ],
	typeBoolean
);
export const funcLike = new ExpressionFunction(
	( arg1: string, arg2: string ) => arg1.toLowerCase() === arg2.toLowerCase(),
	[ typeString, typeString ],
	typeBoolean
);
export const funcUnlike = new ExpressionFunction(
	( arg1: string, arg2: string ) => arg1.toLowerCase() !== arg2.toLowerCase(),
	[ typeString, typeString ],
	typeBoolean
);
export const funcBeginof = new ExpressionFunction(
	( arg1: string, arg2: string ) => arg2.startsWith( arg1 ),
	[ typeString, typeString ],
	typeBoolean
);
export const funcEndof = new ExpressionFunction(
	( arg1: string, arg2: string ) => arg2.endsWith( arg1 ),
	[ typeString, typeString ],
	typeBoolean
);
export const funcPartof = new ExpressionFunction(
	( arg1: string, arg2: string ) => arg2.includes( arg1 ),
	[ typeString, typeString ],
	typeBoolean
);
export const funcAdd = new ExpressionFunction(
	( ...args: ( number | number[] | string | string[] )[] ) => args.flat().reduce( ( acc: any, val: any ) => acc += val ),
	[ new ExpressionType( 'number', 'string', 'array' ) ],
	new ExpressionType( 'number', 'string' ),
	( vtype, vmask ) => vtype === 'array' || vtype === vmask
);
export const funcSub = new ExpressionFunction(
	( arg1: number, arg2: number ) => arg1 - arg2,
	[ typeNumber, typeNumber ],
	typeNumber
);
export const funcNeg = new ExpressionFunction(
	( arg: number ) => -arg,
	[ typeNumber ],
	typeNumber
);
export const funcMul = new ExpressionFunction(
	( ...args: ( number | number[] )[] ) => args.flat().reduce( ( acc, val ) => acc *= val ),
	[ new ExpressionType( 'number', 'array' ) ],
	typeNumber
);
export const funcDiv = new ExpressionFunction(
	( arg1: number, arg2: number ) => arg1 / arg2,
	[ typeNumber, typeNumber ],
	typeNumber
);
export const funcRem = new ExpressionFunction(
	( arg1: number, arg2: number ) => arg1 % arg2,
	[ typeNumber, typeNumber ],
	typeNumber
);
export const funcMod = new ExpressionFunction(
	( arg1: number, arg2: number ) => ( ( arg1 % arg2 ) + arg2 ) % arg2,
	[ typeNumber, typeNumber ],
	typeNumber
);
export const funcPct = new ExpressionFunction(
	( arg1: number, arg2: number ) => Math.round( arg1 * arg2 / 100 ),
	[ typeNumber, typeNumber ],
	typeNumber
);
export const funcExp = new ExpressionFunction(
	( arg: number ) => Math.exp( arg ),
	[ typeNumber ],
	typeNumber
);
export const funcLog = new ExpressionFunction(
	( arg: number ) => Math.log( arg ),
	[ typeNumber ],
	typeNumber
);
export const funcPow = new ExpressionFunction(
	( arg1: number, arg2: number ) => Math.pow( arg1, arg2 ),
	[ typeNumber, typeNumber ],
	typeNumber
);
export const funcRt = new ExpressionFunction(
	( arg1: number, arg2: number ) => Math.pow( arg1, 1 / arg2 ),
	[ typeNumber, typeNumber ],
	typeNumber
);
export const funcSq = new ExpressionFunction(
	( arg: number ) => arg * arg,
	[ typeNumber ],
	typeNumber
);
export const funcSqrt = new ExpressionFunction(
	( arg: number ) => Math.sqrt( arg ),
	[ typeNumber ],
	typeNumber
);
export const funcAbs = new ExpressionFunction(
	( arg: number ) => Math.abs( arg ),
	[ typeNumber ],
	typeNumber
);
export const funcCeil = new ExpressionFunction(
	( arg: number ) => Math.ceil( arg ),
	[ typeNumber ],
	typeNumber
);
export const funcFloor = new ExpressionFunction(
	( arg: number ) => Math.floor( arg ),
	[ typeNumber ],
	typeNumber
);
export const funcRound = new ExpressionFunction(
	( arg: number ) => Math.round( arg ),
	[ typeNumber ],
	typeNumber
);
export const funcMax = new ExpressionFunction(
	( ...args: ( number | number[] )[] ) => Math.max( ...args.flat() ),
	[ new ExpressionType( 'number', 'array' ) ],
	typeNumber
);
export const funcMin = new ExpressionFunction(
	( ...args: ( number | number[] )[] ) => Math.min( ...args.flat() ),
	[ new ExpressionType( 'number', 'array' ) ],
	typeNumber
);
export const funcLen = new ExpressionFunction(
	( arg: string | ExpressionValue[] ) => arg.length,
	[ new ExpressionType( 'string', 'array' ) ],
	typeNumber
);
export const funcTrim = new ExpressionFunction(
	( arg: string ) => arg.trim(),
	[ typeString ],
	typeString
);
export const funcLowercase = new ExpressionFunction(
	( arg: string ) => arg.toLowerCase(),
	[ typeString ],
	typeString
);
export const funcUppercase = new ExpressionFunction(
	( arg: string ) => arg.toUpperCase(),
	[ typeString ],
	typeString
);
export const funcSubstr = new ExpressionFunction(
	( arg: string, ...args: number[] ) => arg.substring( args[ 0 ], args[ 1 ] ),
	[ typeString, typeNumber ],
	typeString
);
export const funcJoin = new ExpressionFunction(
	( ...args: ExpressionValue[] ) => args,
	[ typeAny ],
	typeArray,
);
export const funcConcat = new ExpressionFunction(
	( ...args: ExpressionValue[][] ) => [ ...args ],
	[ typeArray ],
	typeArray,
);
export const funcFlatten = new ExpressionFunction(
	( args: ExpressionValue[], arg: number ) =>
		( args as [] ).flat( arg ) as ExpressionValue,
	[ typeArray, typeNumber ],
	typeArray,
);
export const funcReverse = new ExpressionFunction(
	( arg: ExpressionValue[] ) => arg.reverse(),
	[ typeArray ],
	typeArray
);
export const funcSlice = new ExpressionFunction(
	( args: ExpressionValue[], arg1: number, arg2: number ) =>
		args.slice( arg1, arg2 ) as ExpressionValue,
	[ typeArray, typeNumber, typeNumber ],
	typeArray,
);
export const funcAt = new ExpressionFunction(
	( arg1: string | object | ExpressionValue[], arg2: number | string ) =>
		typeof arg1 === 'string' ? arg1.charAt( arg2 as number ) : Array.isArray( arg1 ) ? arg1[ arg2 as number ] : ( arg1 as any )[ arg2 ],
	[ new ExpressionType( 'string', 'object', 'array' ), new ExpressionType( 'number', 'string' ) ],
	typeAny,
	( vtype, vmask ) => vtype === 'object' || vtype ==='array' || vtype === vmask
);
export const funcMap = new ExpressionFunction(
	( arg1: ExpressionValue[], arg2: ( v: ExpressionValue, i: number, a: ExpressionValue[] ) => ExpressionValue ) =>
		arg1.map( ( v, i, a ) => arg2( v, i, a ) ),
	[ typeArray, typeFunction ],
	typeArray
);
export const funcFilter = new ExpressionFunction(
	( arg1: ExpressionValue[], arg2: ( v: ExpressionValue, i: number, a: ExpressionValue[] ) => boolean ) =>
		arg1.filter( ( v, i, a ) => arg2( v, i, a ) ),
	[ typeArray, typeFunction ],
	typeArray
);
