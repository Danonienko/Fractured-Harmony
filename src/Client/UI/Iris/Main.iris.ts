import Iris from "@rbxts/iris";
import { type IrisController } from "Client/Controllers/IrisController";
import TestIris from "./Components/Test.iris";

type Props = {
	irisController: IrisController;
	isOpened?: Iris.State<boolean>;
};

export default function MainIris({ isOpened = Iris.State(true), irisController }: Props): void {
	const currentComponent = Iris.State<(() => void) | undefined>(undefined);

	Iris.Window(["Fractured Harmony – Debug Panel v1.0"], {
		isOpened
	});
	{
		Iris.MenuBar();
		{
			Iris.Menu(["Home"]);
			{
				const menuItemMain = Iris.MenuItem(["Main"]);
				if (menuItemMain.clicked()) currentComponent.set(undefined);
			}
			Iris.End();

			Iris.Menu(["Components"]);
			{
				const menuItemTest = Iris.MenuItem(["Test"]);
				if (menuItemTest.clicked()) currentComponent.set(TestIris);
			}
			Iris.End();
		}
		Iris.End();

		if (currentComponent.value) currentComponent.value();
		else {
			Iris.Text(["Hello world!"]);

			const buttonDisconnect = Iris.Button(["Disconnect"]);
			if (buttonDisconnect.hovered()) Iris.Tooltip(["Disconnect the debug console"]);
			if (buttonDisconnect.clicked()) irisController.Disconnect();
		}
	}
	Iris.End();

	if (!isOpened.get()) {
		const buttonOpen = Iris.Button(["Open"]);
		if (buttonOpen.clicked()) isOpened.set(true);
	}
}
