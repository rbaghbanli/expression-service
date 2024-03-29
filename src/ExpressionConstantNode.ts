import { ExpressionNode } from './ExpressionNode.js';
import { ExpressionConstant } from './ExpressionConstant.js';
import { ExpressionType, ExpressionValue } from './ExpressionType.js';

export class ExpressionConstantNode extends ExpressionNode {

	constructor(
		_pos: number,
		protected _constant: ExpressionConstant,
	) {
		super( _pos );
	}

	get type(): ExpressionType {
		return this._constant.type;
	}

	compile( type: ExpressionType ): ExpressionNode {
		if ( !type.infer( this.type ) ) {
			this.throwTypeError( type );
		}
		return this;
	}

	evaluate(): ExpressionValue {
		return this._constant.value;
	}

}
