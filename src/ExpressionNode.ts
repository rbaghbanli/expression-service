import { ExpressionFunction } from './ExpressionFunction';
import { ExpressionVariable } from './ExpressionVariable';

export class ExpressionNode {

	constructor(
		protected _pos: number,
		protected _obj: boolean | number | string | ExpressionVariable | ExpressionFunction,
		protected _subnodes: ExpressionNode[] | undefined = undefined,
	) {}

	evaluate( vars: Record<string, boolean | number | string> ): boolean | number | string {
		if ( this._obj instanceof ExpressionFunction ) {
			return this._obj.func( ...this._subnodes!.map( node => node.evaluate( vars ) ) );
		}
		if ( this._obj instanceof ExpressionVariable ) {
			const value = vars[ this._obj.name ];
			if ( value === undefined ) {
				throw new ReferenceError( `undefined variable ${ this._obj.name }` );
			}
			else {
				const type = ( typeof value ) as 'boolean' | 'number' | 'string';
				if ( this._obj.type && this._obj.type !== type ) {
					throw new TypeError( `type mismatch for variable ${ this._obj.name }: expected ${ this._obj.type } not ${ type } ` );
				}
			}
			return value;
		}
		return this._obj;
	}

	compile(): number | undefined {
		if ( this._obj instanceof ExpressionFunction ) {
			const func = this._obj;
			const subs = this._subnodes!;
			let value = true;
			for ( let i = 0; i < subs.length && value; ++i ) {
				const sub = subs[ i ];
				const pos = sub.compile();
				if ( pos !== undefined ) {
					return pos;
				}
				const type = func.getArgType( i );
				if ( sub._obj instanceof ExpressionFunction ) {
					if ( type && type !== sub._obj.type ) {
						return pos;
					}
					value = false;
				}
				else if ( sub._obj instanceof ExpressionVariable ) {
					if ( type && sub._obj.type && sub._obj.type !== type ) {
						return pos;
					}
					else if ( !sub._obj.type ) {
						sub._obj.type = type;
					}
					value = false;
				}
				else if ( type && type !== typeof sub._obj ) {
					return pos;
				}
			}
			if ( value ) {
				this._obj = func.func( ...subs.map( node => node._obj ) );
			}
		}
		return undefined;
	}

}