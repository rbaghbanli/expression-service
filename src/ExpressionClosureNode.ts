import { Node } from './Node.js';
import { ExpressionVariable } from './ExpressionVariable.js';
import { Type, Value, typeFunction } from './Type.js';

export class ExpressionClosureNode extends Node {

	constructor(
		_pos: number,
		protected _type: Type,
		protected _variables: ExpressionVariable[],
		protected _subnodes: Node[],
	) {
		super(_pos);
	}

	get type(): Type {
		return typeFunction;
	}

	compile(type: Type): Node {
		if (!typeFunction.infer(type)) {
			this.throwTypeError(type);
		}
		this._subnodes = Node.compileList(this._subnodes, this._type);
		return this;
	}

	evaluate(): Value {
		return (...values: Value[])=> {
			this._variables.forEach((arg, ix)=> arg.value = values[ ix ]);
			return this._subnodes.map((s)=> s.evaluate())[ this._subnodes.length - 1 ];
		};
	}

}
