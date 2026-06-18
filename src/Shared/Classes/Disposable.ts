import Signal from "@rbxts/signal";
import { Trove } from "@rbxts/trove";

export default abstract class Disposable {
	protected readonly Trove: Trove = new Trove();

	public readonly Destroying: Signal = this.Trove.add(new Signal());

	public Destroy(): void {
		this.Destroying.Fire();
		this.Trove.destroy();
		table.clear(this);
		setmetatable(this, undefined);
	}
}
