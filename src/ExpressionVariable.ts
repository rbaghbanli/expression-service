import { ExpressionType, ExpressionValue, typeVar } from './ExpressionType.js';

export class ExpressionVariable {

	constructor(
		protected _value: ExpressionValue | undefined = undefined,
		protected _type: ExpressionType = typeVar,
	) {}

	get value(): ExpressionValue | undefined {
		return this._value!;
	}

	set value( value: ExpressionValue | undefined ) {
		this._value = value;
	}

	get type(): ExpressionType {
		return this._type;
	}

	set type( type: ExpressionType ) {
		this._type = type;
	}

}
